const storageKey = 'monthiversary-v1'
const publishedContent = {
  names: 'Jess y Ale',
  startDate: '2026-07-27',
  notes: [
    {
      date: '2026-07-27',
      title: 'El comienzo',
      note: 'Un día para marcar en el calendario y volver a celebrar cada mes.'
    },
    {
      date: '2026-08-27',
      title: 'Nuestro primer mes',
      note: 'Un mes de muchos por venir. Lo mejor de esta historia es seguir escribiéndola juntos.'
    },
    {
      date: '2026-09-27',
      title: 'Dos meses a tu lado',
      note: '60 días descubriendo que las cosas más simples son inolvidables si las comparto contigo. ¡Felices dos meses!'
    }
  ],
  poems: [
    {
      title: 'Desde aquel 27',
      text: 'Desde aquel 27 de julio,\nel tiempo aprendió otro idioma:\nuno que se dice en miradas\ny se escribe con nuestros días.',
      signature: 'Para Jess y Ale'
    },
    {
      title: 'Dos meses de luz',
      text: 'Dos meses han pasado ya,\ny en cada instante compartido,\nconfirmas que el mejor lugar\nes coincidir en el camino.',
      signature: 'Con todo mi amor'
    }
  ],
  songs: [],
  collage: [
    {
      src: 'https://i.ibb.co/60XL87TD/IMG-3703.jpg',
      alt: 'Enamorados',
      note: 'Una noche especial juntos.'
    },
    {
      src: 'https://i.ibb.co/6JN6J6zd/IMG-3753.jpg',
      alt: 'Celebración juntos',
      note: 'Celebrando juntos.'
    },
    {
      src: 'https://i.ibb.co/9mFbmPB0/80227126-3ed4-4049-88e9-68d0ba04ea6a.jpg',
      alt: 'Detalle',
      note: 'Nuestro segundo mes juntos: una foto especial de este día.'
    }
  ]
}
const defaultState = {
  names: publishedContent.names,
  startDate: publishedContent.startDate,
  memories: [],
  songs: []
}

function loadState () {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    return saved && typeof saved === 'object'
      ? {
          ...defaultState,
          ...saved,
          names: saved.names || publishedContent.names,
          startDate: saved.startDate || publishedContent.startDate,
          memories: Array.isArray(saved.memories) ? saved.memories : [],
          songs: Array.isArray(saved.songs)
            ? saved.songs.filter(
                entry => typeof entry.url === 'string' && entry.url.length > 0
              )
            : []
        }
      : { ...defaultState }
  } catch {
    return { ...defaultState }
  }
}

function anniversaryFor (start, months) {
  const year = start.getFullYear()
  const month = start.getMonth() + months
  const lastDay = new Date(year, month + 1, 0).getDate()
  return new Date(year, month, Math.min(start.getDate(), lastDay))
}

function getMilestone (dateString, now = new Date()) {
  if (!dateString) return null
  const [year, month, day] = dateString.split('-').map(Number)
  const start = new Date(year, month - 1, day)
  if (
    !year ||
    !month ||
    !day ||
    Number.isNaN(start.getTime()) ||
    start.getMonth() !== month - 1 ||
    start.getDate() !== day
  )
    return null

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (start > today) return null

  let completed =
    (today.getFullYear() - year) * 12 + today.getMonth() - (month - 1)
  if (anniversaryFor(start, completed) > today) completed -= 1
  const next = anniversaryFor(start, completed + 1)
  const daysLeft = Math.round(
    (Date.UTC(next.getFullYear(), next.getMonth(), next.getDate()) -
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) /
      86400000
  )
  return { completed, next, daysLeft }
}

if (typeof document !== 'undefined') {
  const state = loadState()
  const settingsDialog = document.querySelector('#settings-dialog')
  const memoryDialog = document.querySelector('#memory-dialog')
  const authDialog = document.querySelector('#auth-dialog')
  const namesInput = document.querySelector('#names-input')
  const startInput = document.querySelector('#start-input')
  const memoryDateInput = document.querySelector('#memory-date')
  const entryKindInput = document.querySelector('#entry-kind')
  const songUrlInput = document.querySelector('#song-url')
  const config = window.MONTHIVERSARY_CONFIG || {}
  const supabaseClient =
    window.supabase && config.supabaseUrl && config.supabaseAnonKey
      ? window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey)
      : null
  const todayString = new Date().toLocaleDateString('en-CA')
  let noteIndex = Math.max(
    publishedContent.notes.length + state.memories.length - 1,
    0
  )
  let cloudEntries = []
  let cloudUser = null
  let poemSwiper = null
  let photoSwiper = null
  let songSwiper = null
  let authCooldownTimer = null

  startInput.max = todayString
  memoryDateInput.max = todayString

  function save () {
    localStorage.setItem(storageKey, JSON.stringify(state))
  }

  function setSyncStatus (message, mode = 'local') {
    const status = document.querySelector('#sync-status')
    status.className = `sync-status sync-${mode}`
    status.querySelector('span').textContent = message
  }

  function updateAuthAction () {
    const button = document.querySelector('#auth-action')
    button.hidden = !supabaseClient
    if (!supabaseClient) {
      setSyncStatus(
        'Solo en este dispositivo · configura Supabase para sincronizar'
      )
      return
    }
    button.innerHTML = cloudUser
      ? '<i data-lucide="log-out" aria-hidden="true"></i> Cerrar sesión'
      : '<i data-lucide="cloud" aria-hidden="true"></i> Sincronizar'
    setSyncStatus(
      cloudUser
        ? 'Sincronizado con Supabase'
        : 'Sin sesión · los datos nuevos quedan locales',
      cloudUser ? 'cloud' : 'local'
    )
    window.lucide?.createIcons()
  }

  async function loadCloudEntries () {
    if (!supabaseClient || !cloudUser) return
    const { data, error } = await supabaseClient
      .from('shared_entries')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) {
      setSyncStatus('No se pudo consultar Supabase', 'error')
      return
    }
    cloudEntries = data || []
    noteIndex = Math.max(
      publishedContent.notes.length +
        state.memories.length +
        cloudEntries.filter(entry => entry.kind === 'note').length -
        1,
      0
    )
    render()
    updateAuthAction()
  }

  async function migrateLocalEntries () {
    if (!supabaseClient || !cloudUser) return
    const entries = [
      ...state.memories.map(entry => ({
        user_id: cloudUser.id,
        kind: 'note',
        title: entry.title,
        body: entry.note,
        entry_date: entry.date || null,
        url: null
      })),
      ...state.songs.map(entry => ({
        user_id: cloudUser.id,
        kind: 'song',
        title: entry.title,
        body: entry.note || '',
        entry_date: null,
        url: entry.url
      }))
    ]
    if (entries.length) {
      const { error } = await supabaseClient
        .from('shared_entries')
        .insert(entries)
      if (error) {
        setSyncStatus('No se pudieron migrar las entradas locales', 'error')
        return
      }
      state.memories = []
      state.songs = []
      save()
    }
    await loadCloudEntries()
  }

  async function initializeCloud () {
    if (!supabaseClient) {
      updateAuthAction()
      return
    }
    const { data } = await supabaseClient.auth.getSession()
    cloudUser = data.session?.user || null
    updateAuthAction()
    if (cloudUser) await migrateLocalEntries()
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      cloudUser = session?.user || null
      updateAuthAction()
      if (cloudUser) window.setTimeout(migrateLocalEntries, 0)
      else {
        cloudEntries = []
        render()
      }
    })
  }

  function updateEntryFields () {
    const isSong = entryKindInput.value === 'song'
    document.querySelector('.entry-date-field').hidden = isSong
    document.querySelector('.entry-url-field').hidden = !isSong
    memoryDateInput.required = !isSong
    songUrlInput.required = isSong
    document.querySelector('#entry-body-label').textContent = isSong
      ? '¿Qué te recuerda esta canción?'
      : 'Lo que quieres recordar'
    document.querySelector('#memory-title').textContent = isSong
      ? 'Guarda una canción.'
      : 'Cuéntame ese día.'
    document.querySelector(
      '#memory-form .form-submit'
    ).childNodes[0].textContent = isSong ? 'Guardar canción ' : 'Guardar nota '
    document.querySelector('#memory-note').placeholder = isSong
      ? 'Cuéntanos por qué esta canción es especial...'
      : 'Escribe aquí lo que estás pensando...'
  }

  function startAuthCooldown (seconds) {
    const button = document.querySelector('#auth-form button[type="submit"]')
    const originalContent = button.dataset.originalContent || button.innerHTML
    button.dataset.originalContent = originalContent
    button.disabled = true
    button.textContent = 'Espera un momento antes de volver a solicitar'
    const until = Date.now() + seconds * 1000
    try {
      sessionStorage.setItem('monthiversary-auth-cooldown', String(until))
    } catch {}
    window.clearTimeout(authCooldownTimer)
    authCooldownTimer = window.setTimeout(() => {
      button.disabled = false
      button.innerHTML = originalContent
      window.lucide?.createIcons()
      try {
        sessionStorage.removeItem('monthiversary-auth-cooldown')
      } catch {}
    }, seconds * 1000)
  }

  function getEmbedUrl (rawUrl) {
    try {
      const url = new URL(rawUrl)
      if (url.protocol !== 'https:') return null
      const host = url.hostname.replace(/^www\./, '')
      if (
        host === 'youtu.be' ||
        host === 'youtube.com' ||
        host === 'music.youtube.com'
      ) {
        const videoId =
          host === 'youtu.be'
            ? url.pathname.slice(1).split('/')[0]
            : url.searchParams.get('v') ||
              url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1]
        return videoId
          ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
              videoId
            )}`
          : null
      }
      if (host === 'open.spotify.com') {
        const match = url.pathname.match(
          /^\/(track|album|playlist|episode)\/([^/?]+)/
        )
        return match
          ? `https://open.spotify.com/embed/${match[1]}/${encodeURIComponent(
              match[2]
            )}`
          : null
      }
    } catch {}
    return null
  }

  function isSupportedSongUrl (rawUrl) {
    try {
      const url = new URL(rawUrl)
      const host = url.hostname.replace(/^www\./, '')
      return (
        url.protocol === 'https:' &&
        (host === 'youtu.be' ||
          host === 'youtube.com' ||
          host === 'music.youtube.com' ||
          host === 'open.spotify.com')
      )
    } catch {
      return false
    }
  }

  function showPhotoFallback (image) {
    if (image.dataset.unavailable) return
    const figure = image.closest('figure')
    if (!figure) return
    image.dataset.unavailable = 'true'
    const fallback = document.createElement('div')
    fallback.className = 'photo-fallback'
    fallback.innerHTML =
      '<i data-lucide="image-off" aria-hidden="true"></i><span>Esta foto no está disponible</span>'
    figure.prepend(fallback)
    image.remove()
    window.lucide?.createIcons()
  }

  function watchPhotoImages () {
    document.querySelectorAll('#photo-swiper img').forEach(image => {
      const validate = () => {
        if (image.naturalWidth < 320) showPhotoFallback(image)
      }
      image.addEventListener('error', () => showPhotoFallback(image), {
        once: true
      })
      image.addEventListener('load', validate, { once: true })
      if (image.complete) validate()
    })
  }

  function render () {
    const milestone = getMilestone(state.startDate)
    document.querySelector('#couple-name').textContent =
      state.names.trim() || 'Tú + yo'
    document.querySelector('#months-count').textContent = milestone
      ? String(milestone.completed).padStart(2, '0')
      : '00'
    document.querySelector('#days-count').textContent = milestone
      ? String(milestone.daysLeft).padStart(2, '0')
      : '--'
    document.querySelector('#next-date').textContent = milestone
      ? new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long' }).format(
          milestone.next
        )
      : 'Elige su fecha de inicio'
    document.querySelector('#start-label').textContent = milestone
      ? `Desde el ${new Intl.DateTimeFormat('es', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(new Date(`${state.startDate}T12:00:00`))}`
      : 'Cada historia empieza en algún lugar.'

    const list = document.querySelector('#memory-list')
    list.replaceChildren()
    const notes = [
      ...publishedContent.notes,
      ...state.memories,
      ...cloudEntries
        .filter(entry => entry.kind === 'note')
        .map(entry => ({
          id: entry.id,
          date: entry.entry_date,
          title: entry.title,
          note: entry.body,
          source: 'cloud'
        }))
    ]
    noteIndex = Math.min(noteIndex, Math.max(notes.length - 1, 0))
    document.querySelector('#empty-memories').hidden = notes.length > 0
    document.querySelector('#notes-controls').hidden = notes.length < 2
    document.querySelector('#notes-count').textContent = `${noteIndex + 1} / ${
      notes.length
    }`
    const memory = notes[noteIndex]
    if (memory) {
      const card = document.createElement('article')
      card.className = 'memory-card'
      const date = document.createElement('time')
      date.dateTime = memory.date || ''
      date.textContent = memory.date
        ? new Intl.DateTimeFormat('es', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(new Date(`${memory.date}T12:00:00`))
        : 'Sin fecha'
      const title = document.createElement('h3')
      title.textContent = memory.title
      const note = document.createElement('p')
      note.textContent = memory.note
      card.append(date, title, note)
      if (memory.id) {
        const remove = document.createElement('button')
        remove.className = 'icon-button remove-memory'
        remove.type = 'button'
        remove.title = 'Eliminar recuerdo'
        remove.setAttribute('aria-label', `Eliminar ${memory.title}`)
        remove.innerHTML = '<i data-lucide="trash-2" aria-hidden="true"></i>'
        remove.addEventListener('click', async () => {
          if (memory.source === 'cloud') {
            const { error } = await supabaseClient
              .from('shared_entries')
              .delete()
              .eq('id', memory.id)
            if (error) {
              setSyncStatus('No se pudo eliminar la nota', 'error')
              return
            }
            cloudEntries = cloudEntries.filter(item => item.id !== memory.id)
          } else {
            state.memories = state.memories.filter(
              item => item.id !== memory.id
            )
            save()
          }
          render()
        })
        card.append(remove)
      }
      list.append(card)
    }

    const poemList = document.querySelector('#poem-list')
    poemSwiper?.destroy(true, true)
    poemList.replaceChildren()
    const poems = publishedContent.poems
    document.querySelector('#empty-poems').hidden = poems.length > 0
    document.querySelector('#poems-controls').hidden = poems.length < 2
    document.querySelector('#poems-count').textContent = poems.length
      ? `1 / ${poems.length}`
      : '0 / 0'
    for (const poem of poems) {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide'
      const card = document.createElement('article')
      card.className = 'poem-card'
      const title = document.createElement('h3')
      title.textContent = poem.title
      const text = document.createElement('p')
      text.textContent = poem.text
      const signature = document.createElement('span')
      signature.className = 'poem-signature'
      signature.textContent = poem.signature || ''
      const copy = document.createElement('button')
      copy.type = 'button'
      copy.className = 'poem-copy'
      copy.innerHTML =
        '<i data-lucide="copy" aria-hidden="true"></i><span>Copiar poema</span>'
      card.append(title, text, signature, copy)
      slide.append(card)
      poemList.append(slide)
    }
    poemList.onclick = async event => {
      const button = event.target.closest('.poem-copy')
      if (!button) return
      const card = button.closest('.poem-card')
      const poemText = `${card.querySelector('h3').textContent}\n\n${
        card.querySelector('p').textContent
      }\n\n${card.querySelector('.poem-signature').textContent}`
      try {
        await navigator.clipboard.writeText(poemText)
        document.querySelector('#poem-feedback').textContent =
          'Poema copiado para compartir.'
      } catch {
        document.querySelector('#poem-feedback').textContent =
          'No se pudo acceder al portapapeles en este navegador.'
      }
    }
    if (window.Swiper && poems.length) {
      poemSwiper = new window.Swiper('#poem-swiper', {
        loop: poems.length > 1,
        speed: 650,
        keyboard: { enabled: true },
        navigation: { prevEl: '#poems-prev', nextEl: '#poems-next' },
        pagination: {
          el: '#poems-pagination',
          clickable: true,
          dynamicBullets: true
        },
        on: {
          slideChange: swiper => {
            document.querySelector('#poems-count').textContent = `${
              swiper.realIndex + 1
            } / ${poems.length}`
          }
        }
      })
    }

    const collageList = document.querySelector('#collage-list')
    photoSwiper?.destroy(true, true)
    collageList.replaceChildren()
    const photos = publishedContent.collage
    document.querySelector('#empty-collage').hidden = photos.length > 0
    document.querySelector('#photos-controls').hidden = photos.length < 2
    document.querySelector('#photos-count').textContent = photos.length
      ? `1 / ${photos.length}`
      : '0 / 0'
    for (const photo of photos) {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide'
      const figure = document.createElement('figure')
      figure.className = 'collage-photo'
      const image = document.createElement('img')
      image.src = photo.src
      image.alt = photo.alt || photo.note || 'Recuerdo de Jess y Ale'
      image.loading = 'eager'
      const caption = document.createElement('figcaption')
      caption.textContent = photo.note
      figure.append(image, caption)
      slide.append(figure)
      collageList.append(slide)
    }

    if (window.Swiper && photos.length) {
      photoSwiper = new window.Swiper('#photo-swiper', {
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: photos.length > 1,
        grabCursor: true,
        keyboard: { enabled: true },
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 1.2,
          slideShadows: false
        },
        navigation: { prevEl: '#photos-prev', nextEl: '#photos-next' },
        pagination: { el: '#photos-pagination', clickable: true },
        on: {
          slideChange: swiper => {
            document.querySelector('#photos-count').textContent = `${
              swiper.realIndex + 1
            } / ${photos.length}`
          }
        }
      })
      watchPhotoImages()
    }

    const songList = document.querySelector('#song-list')
    songSwiper?.destroy(true, true)
    songList.replaceChildren()
    const songs = [
      ...publishedContent.songs,
      ...state.songs,
      ...cloudEntries
        .filter(entry => entry.kind === 'song')
        .map(entry => ({
          id: entry.id,
          title: entry.title,
          note: entry.body,
          url: entry.url,
          source: 'cloud'
        }))
    ]
    document.querySelector('#empty-songs').hidden = songs.length > 0
    document.querySelector('#songs-controls').hidden = songs.length < 2
    document.querySelector('#songs-count').textContent = songs.length
      ? `1 / ${songs.length}`
      : '0 / 0'
    for (const song of songs) {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide'
      const card = document.createElement('article')
      card.className = 'song-card'
      const embedUrl = getEmbedUrl(song.url)
      if (embedUrl) {
        const frame = document.createElement('iframe')
        frame.src = embedUrl
        frame.title = song.title
        frame.loading = 'lazy'
        frame.allow =
          'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        frame.referrerPolicy = 'strict-origin-when-cross-origin'
        frame.allowFullscreen = true
        card.append(frame)
      } else {
        if (isSupportedSongUrl(song.url)) {
          const link = document.createElement('a')
          link.className = 'song-link'
          link.href = song.url
          link.target = '_blank'
          link.rel = 'noopener noreferrer'
          link.innerHTML =
            '<i data-lucide="play" aria-hidden="true"></i><span>Abrir canción</span>'
          card.append(link)
        } else {
          const unavailable = document.createElement('div')
          unavailable.className = 'song-link song-unavailable'
          unavailable.textContent = 'Este enlace ya no está disponible.'
          card.append(unavailable)
        }
      }
      const caption = document.createElement('div')
      caption.className = 'song-caption'
      const songTitle = document.createElement('h3')
      songTitle.textContent = song.title
      const songNote = document.createElement('p')
      songNote.textContent = song.note || ''
      caption.append(songTitle, songNote)
      if (song.id) {
        const remove = document.createElement('button')
        remove.className = 'song-delete icon-button'
        remove.type = 'button'
        remove.setAttribute('aria-label', `Eliminar ${song.title}`)
        remove.title = 'Eliminar canción'
        remove.innerHTML = '<i data-lucide="trash-2" aria-hidden="true"></i>'
        remove.addEventListener('click', async () => {
          if (song.source === 'cloud') {
            const { error } = await supabaseClient
              .from('shared_entries')
              .delete()
              .eq('id', song.id)
            if (error) {
              setSyncStatus('No se pudo eliminar la canción', 'error')
              return
            }
            cloudEntries = cloudEntries.filter(item => item.id !== song.id)
          } else {
            state.songs = state.songs.filter(item => item.id !== song.id)
            save()
          }
          render()
        })
        caption.append(remove)
      }
      card.append(caption)
      slide.append(card)
      songList.append(slide)
    }
    if (window.Swiper && songs.length) {
      songSwiper = new window.Swiper('#song-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 18,
        loop: songs.length > 2,
        grabCursor: true,
        keyboard: { enabled: true },
        navigation: { prevEl: '#songs-prev', nextEl: '#songs-next' },
        pagination: { el: '#songs-pagination', clickable: true },
        on: {
          slideChange: swiper => {
            document.querySelector('#songs-count').textContent = `${
              swiper.realIndex + 1
            } / ${songs.length}`
          }
        }
      })
    }
    window.lucide?.createIcons()
  }

  function openSettings () {
    namesInput.value = state.names
    startInput.value = state.startDate
    settingsDialog.showModal()
  }
  function openMemory (kind = 'note') {
    const form = document.querySelector('#memory-form')
    form.reset()
    entryKindInput.value = kind
    memoryDateInput.value = todayString
    updateEntryFields()
    memoryDialog.showModal()
  }
  document
    .querySelector('#open-settings')
    .addEventListener('click', openSettings)
  document
    .querySelector('#open-settings-intro')
    .addEventListener('click', openSettings)
  document.querySelector('#open-memory').addEventListener('click', openMemory)
  document
    .querySelector('#open-memory-empty')
    .addEventListener('click', openMemory)
  document
    .querySelector('#open-song')
    .addEventListener('click', () => openMemory('song'))
  document
    .querySelector('#open-song-empty')
    .addEventListener('click', () => openMemory('song'))
  entryKindInput.addEventListener('change', updateEntryFields)
  document.querySelector('#auth-action').addEventListener('click', async () => {
    if (cloudUser) {
      await supabaseClient.auth.signOut()
      return
    }
    authDialog.showModal()
  })
  document.querySelector('#notes-prev').addEventListener('click', () => {
    noteIndex =
      (noteIndex - 1 + publishedContent.notes.length + state.memories.length) %
      (publishedContent.notes.length + state.memories.length)
    render()
  })
  document.querySelector('#notes-next').addEventListener('click', () => {
    const total =
      publishedContent.notes.length +
      state.memories.length +
      cloudEntries.filter(entry => entry.kind === 'note').length
    noteIndex = (noteIndex + 1) % total
    render()
  })
  document.querySelector('#poems-prev').addEventListener('click', () => {
    poemSwiper?.slidePrev()
  })
  document.querySelector('#poems-next').addEventListener('click', () => {
    poemSwiper?.slideNext()
  })
  document.querySelector('#photos-prev').addEventListener('click', () => {
    photoSwiper?.slidePrev()
  })
  document.querySelector('#photos-next').addEventListener('click', () => {
    photoSwiper?.slideNext()
  })
  document.querySelector('#songs-prev').addEventListener('click', () => {
    songSwiper?.slidePrev()
  })
  document.querySelector('#songs-next').addEventListener('click', () => {
    songSwiper?.slideNext()
  })
  document
    .querySelectorAll('[data-close]')
    .forEach(button =>
      button.addEventListener('click', () => button.closest('dialog').close())
    )

  document.querySelector('#settings-form').addEventListener('submit', event => {
    event.preventDefault()
    state.names = namesInput.value.trim()
    state.startDate = startInput.value
    save()
    render()
    settingsDialog.close()
  })

  document
    .querySelector('#auth-form')
    .addEventListener('submit', async event => {
      event.preventDefault()
      const feedback = document.querySelector('#auth-feedback')
      const email = String(
        new FormData(event.currentTarget).get('email') || ''
      ).trim()
      const submitButton = event.currentTarget.querySelector(
        'button[type="submit"]'
      )
      const cooldownUntil = Number(
        sessionStorage.getItem('monthiversary-auth-cooldown') || 0
      )
      if (cooldownUntil > Date.now()) {
        feedback.textContent =
          'Espera antes de volver a solicitar el enlace. Supabase aún puede mantener activo su límite de envío.'
        startAuthCooldown(Math.ceil((cooldownUntil - Date.now()) / 1000))
        return
      }

      submitButton.disabled = true
      feedback.textContent = 'Solicitando el enlace…'
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.href.split('#')[0] }
      })
      if (error?.code === 'over_email_send_rate_limit') {
        startAuthCooldown(60)
        feedback.textContent =
          'Supabase alcanzó su límite de correos. Espera antes de reintentar; para evitar este límite, configura SMTP propio en Supabase.'
      } else if (error) {
        submitButton.disabled = false
        feedback.textContent =
          error.code === 'email_address_invalid'
            ? 'Supabase rechazó el correo. Revisa que esté escrito correctamente y sin espacios.'
            : `No se pudo enviar el enlace: ${error.message}`
      } else {
        startAuthCooldown(60)
        feedback.textContent =
          'Enlace enviado. Revisa tu correo; puedes solicitar otro después de un minuto.'
      }
    })

  document
    .querySelector('#memory-form')
    .addEventListener('submit', async event => {
      event.preventDefault()
      const form = event.currentTarget
      const fields = new FormData(form)
      const kind = fields.get('kind')
      if (kind === 'song' && !isSupportedSongUrl(fields.get('url').trim())) {
        setSyncStatus('Usa un enlace HTTPS de YouTube o Spotify', 'error')
        songUrlInput.focus()
        return
      }
      const entry = {
        title: fields.get('title').trim(),
        body: fields.get('body').trim(),
        entry_date: kind === 'note' ? fields.get('date') : null,
        url: kind === 'song' ? fields.get('url').trim() : null
      }
      if (cloudUser && supabaseClient) {
        const { error } = await supabaseClient.from('shared_entries').insert({
          ...entry,
          kind,
          user_id: cloudUser.id
        })
        if (error) {
          setSyncStatus(
            'No se pudo guardar en Supabase; tus datos siguen en el formulario',
            'error'
          )
          return
        }
        if (kind === 'note')
          noteIndex =
            publishedContent.notes.length +
            state.memories.length +
            cloudEntries.filter(item => item.kind === 'note').length
        await loadCloudEntries()
      } else {
        const id = crypto.randomUUID()
        if (kind === 'note') {
          state.memories.push({
            id,
            date: entry.entry_date,
            title: entry.title,
            note: entry.body
          })
          noteIndex = publishedContent.notes.length + state.memories.length - 1
        } else {
          state.songs.push({
            id,
            title: entry.title,
            note: entry.body,
            url: entry.url
          })
        }
        save()
        render()
        setSyncStatus(
          'Guardado en este dispositivo · inicia sesión para sincronizar',
          'local'
        )
      }
      form.reset()
      updateEntryFields()
      memoryDialog.close()
    })

  render()
  updateEntryFields()
  initializeCloud()
}
