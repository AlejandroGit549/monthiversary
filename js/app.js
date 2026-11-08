const contentStorageKey = 'monthiversary-v1'
const mediaBucket = 'anniversary-media'
const defaultContent = {
  profile: {
    partner1: 'Jess',
    partner2: 'Ale',
    startDate: '2026-07-27',
    subtitle: 'Celebrando nuestro camino juntos',
    quote:
      'Lo mejor de esta historia es seguir escribiéndola juntos, un día a la vez.'
  },
  timeline: [
    {
      id: 'memory-start',
      title: 'El comienzo',
      date: '27 de julio de 2026',
      description:
        'Un día para marcar en el calendario y volver a celebrar cada mes.'
    },
    {
      id: 'memory-first-month',
      title: 'Nuestro primer mes',
      date: '27 de agosto de 2026',
      description:
        'Un mes de muchos por venir. Lo mejor de esta historia es seguir escribiéndola juntos.'
    },
    {
      id: 'memory-second-month',
      title: 'Dos meses a tu lado',
      date: '27 de septiembre de 2026',
      description:
        'Las cosas más simples se vuelven inolvidables cuando las compartimos.'
    }
  ],
  photos: [
    {
      id: 'photo-2966',
      url: 'https://i.ibb.co/93cvJmKW/IMG-2966.jpg',
      alt: 'Momento juntos',
      caption: 'Uno de esos momentos que se quedan guardados para siempre.'
    },
    {
      id: 'photo-2972',
      url: 'https://i.ibb.co/PZtP2fhQ/IMG-2972.jpg',
      alt: 'Sonrisas compartidas',
      caption: 'Sonrisas compartidas, la mejor parte de cualquier día.'
    },
    {
      id: 'photo-3695',
      url: 'https://i.ibb.co/nq8M8K2Z/IMG-3695.jpg',
      alt: 'Noche juntos',
      caption: 'Una noche más que se volvió recuerdo.'
    },
    {
      id: 'photo-3702',
      url: 'https://i.ibb.co/PZtfjryZ/IMG-3702.jpg',
      alt: 'Nosotros',
      caption: 'Tú y yo, sin necesidad de más.'
    },
    {
      id: 'photo-3725',
      url: 'https://i.ibb.co/KHmj0yC/IMG-3725.jpg',
      alt: 'Instante especial',
      caption: 'Un instante especial a tu lado.'
    },
    {
      id: 'photo-3735',
      url: 'https://i.ibb.co/gb6XVNWm/IMG-3735.jpg',
      alt: 'Juntos otra vez',
      caption: 'Contigo hasta lo sencillo se siente increíble.'
    },
    {
      id: 'photo-3760',
      url: 'https://i.ibb.co/NdfKsFQx/IMG-3760.jpg',
      alt: 'Tarde juntos',
      caption: 'Una tarde para recordar.'
    },
    {
      id: 'photo-3763',
      url: 'https://i.ibb.co/gMd3R31Y/IMG-3763.jpg',
      alt: 'Recuerdo bonito',
      caption: 'Otro recuerdo bonito que nos llevamos.'
    }
  ],
  reasons: [
    {
      id: 'reason-smile',
      title: 'Tu sonrisa',
      text: 'Tiene el poder de hacer especial hasta el día más sencillo.'
    },
    {
      id: 'reason-company',
      title: 'Tu compañía',
      text: 'Contigo, cualquier lugar se siente un poquito más como hogar.'
    },
    {
      id: 'reason-laughter',
      title: 'Nuestras risas',
      text: 'Los momentos cotidianos se vuelven recuerdos cuando los compartimos.'
    }
  ],
  poems: [
    {
      id: 'poem-1',
      title: 'Desde aquel 27',
      text: 'Desde aquel 27 de julio,\nel tiempo aprendió otro idioma:\nuno que se dice en miradas\ny se escribe con nuestros días.',
      signature: 'Para Jess y Ale'
    },
    {
      id: 'poem-2',
      title: 'Dos meses de luz',
      text: 'Dos meses han pasado ya,\ny en cada instante compartido,\nconfirmas que el mejor lugar\nes coincidir en el camino.',
      signature: 'Con todo mi amor'
    },
    {
      id: 'poem-3',
      title: 'Mapa sin norte',
      text: 'Yo andaba sin brújula ni rumbo,\nhasta que tu risa fue mi norte;\ny ahora cualquier camino\nme lleva a donde estás tú.',
      signature: 'Para Jess y Ale'
    },
    {
      id: 'poem-4',
      title: 'Casualidad con destino',
      text: 'Dicen que fue casualidad,\npero yo sé que el universo\nmovió sus piezas con cuidado\npara sentarnos en el mismo tiempo.',
      signature: 'Con todo mi amor'
    },
    {
      id: 'poem-5',
      title: 'Lenguaje de silencios',
      text: 'Contigo aprendí que el silencio\nno es vacío ni distancia:\nes una forma tranquila\nde decir que aquí me quedo.',
      signature: 'Con cariño'
    },
    {
      id: 'poem-6',
      title: 'Cada mañana',
      text: 'Amanece distinto desde que existes,\nel sol llega con tu nombre\ny cada día que comienza\nme parece una promesa.',
      signature: 'Con todo mi amor'
    },
    {
      id: 'poem-7',
      title: 'Brújula de dos',
      text: 'Si algún día me pierdo,\nbúscame en tu mirada;\nahí siempre estuvo el camino\nque mi corazón buscaba.',
      signature: 'Para Jess y Ale'
    },
    {
      id: 'poem-8',
      title: 'Fecha favorita',
      text: 'Hay fechas que se olvidan\ny fechas que se quedan;\nel veintisiete de julio\nse volvió mi favorita.',
      signature: 'Siempre contigo'
    },
    {
      id: 'poem-9',
      title: 'Paciencia y flores',
      text: 'El amor es un jardín\nque se riega sin apuro:\ncon paciencia, con ternura\ny con ganas de quedarse.',
      signature: 'Con cariño'
    },
    {
      id: 'poem-10',
      title: 'Cielo compartido',
      text: 'Aunque a veces estemos lejos,\nmiramos la misma luna;\ny en ese cielo tan nuestro\nnos encontramos sin prisa.',
      signature: 'Para Jess y Ale'
    },
    {
      id: 'poem-11',
      title: 'Lo que eres',
      text: 'Eres calma en mis tormentas,\neres risa en mis cansancios,\neres el mejor motivo\npara sonreír sin razón.',
      signature: 'Con todo mi amor'
    },
    {
      id: 'poem-12',
      title: 'Latidos',
      text: 'Mi corazón tenía un ritmo\nque no sabía bailar;\nhasta que llegaste tú\ny le enseñaste a latir.',
      signature: 'Siempre tuyo'
    },
    {
      id: 'poem-13',
      title: 'Tinta y tiempo',
      text: 'Si el tiempo fuera un cuaderno,\nte escribiría en cada hoja;\ny aun así faltarían páginas\npara contar lo que me das.',
      signature: 'Para Jess y Ale'
    },
    {
      id: 'poem-14',
      title: 'Contigo es fácil',
      text: 'Contigo todo se vuelve ligero:\nlas prisas, las dudas, el miedo;\nse quedan afuera del cuarto\ny entra solo lo bonito.',
      signature: 'Con cariño'
    },
    {
      id: 'poem-15',
      title: 'Promesa pequeña',
      text: 'No te prometo el mundo entero,\nsolo cuidarte cada día,\nescucharte cuando hables\ny elegirte todavía.',
      signature: 'Con todo mi amor'
    },
    {
      id: 'poem-16',
      title: 'Estaciones',
      text: 'Que lleguen todas las estaciones,\nel frío, la lluvia y el verano;\nmientras sea a tu lado\ntodas me saben a hogar.',
      signature: 'Para Jess y Ale'
    },
    {
      id: 'poem-17',
      title: 'Gracias',
      text: 'Gracias por quedarte, por reír,\npor sostenerme en lo difícil;\ncontigo hasta lo cotidiano\nse viste de milagro.',
      signature: 'Siempre contigo'
    },
    {
      id: 'poem-18',
      title: 'Pequeña eternidad',
      text: 'Un abrazo, un beso, un te quiero,\ny el reloj se detiene un rato;\nasí se ve la eternidad\ncuando se vive de a dos.',
      signature: 'Con todo mi amor'
    },
    {
      id: 'poem-19',
      title: 'Lo que viene',
      text: 'No sé qué nos traerá el mañana,\npero sé que quiero vivirlo\ncon tu mano entre mis dedos\ny tu risa como brújula.',
      signature: 'Para Jess y Ale'
    },
    {
      id: 'poem-20',
      title: 'Aquí y ahora',
      text: 'No pido más de lo que tengo:\nun hoy contigo a mi lado,\nun mañana por escribir\ny un corazón agradecido.',
      signature: 'Te elijo a ti.'
    }
  ],
  notes: [
    {
      id: 'note-1',
      date: '2026-07-27',
      title: 'El comienzo',
      content: 'Un día para marcar en el calendario y volver a celebrar cada mes.'
    },
    {
      id: 'note-2',
      date: '2026-08-27',
      title: 'Nuestro primer mes',
      content:
        'Un mes de muchos por venir. Lo mejor de esta historia es seguir escribiéndola juntos.'
    },
    {
      id: 'note-3',
      date: '2026-09-27',
      title: 'Dos meses a tu lado',
      content:
        '60 días descubriendo que las cosas más simples son inolvidables si las comparto contigo. ¡Felices dos meses!'
    }
  ],
  songs: [],
  letters: [
    {
      id: 'letter-1',
      title: 'Para nosotros',
      date: 'Cada día',
      body: 'Gracias por estar aquí y por hacer que cada capítulo de esta historia valga la pena. Me emociona todo lo que todavía nos queda por escribir, compartir y recordar.',
      signature: 'Con todo mi amor'
    }
  ]
}

const collectionDefinitions = {
  timeline: {
    label: 'Historia',
    fields: [
      { name: 'title', label: 'Título', required: true },
      { name: 'date', label: 'Fecha', required: true },
      { name: 'description', label: 'Descripción', type: 'textarea', required: true, full: true },
      { name: 'image', label: 'Foto (URL opcional)', type: 'url', full: true }
    ]
  },
  photos: {
    label: 'Galería',
    fields: [
      { name: 'caption', label: 'Pie de foto', required: true },
      { name: 'alt', label: 'Descripción accesible' },
      { name: 'url', label: 'URL de foto (opcional si cargas archivo)', type: 'url', full: true },
      { name: 'file', label: 'O carga una foto (máximo 8 MB)', type: 'file', full: true }
    ]
  },
  reasons: {
    label: 'Razones',
    fields: [
      { name: 'title', label: 'Razón', required: true },
      { name: 'text', label: 'Dedicatoria', type: 'textarea', required: true, full: true }
    ]
  },
  poems: {
    label: 'Poemas',
    fields: [
      { name: 'title', label: 'Título', required: true },
      { name: 'signature', label: 'Firma' },
      { name: 'text', label: 'Versos', type: 'textarea', required: true, full: true }
    ]
  },
  notes: {
    label: 'Notas',
    fields: [
      { name: 'title', label: 'Título', required: true },
      { name: 'date', label: 'Fecha', type: 'date' },
      { name: 'content', label: 'Pensamiento', type: 'textarea', required: true, full: true }
    ]
  },
  songs: {
    label: 'Playlist',
    fields: [
      { name: 'title', label: 'Canción', required: true },
      { name: 'artist', label: 'Artista' },
      { name: 'note', label: '¿Qué les recuerda?', type: 'textarea', full: true },
      { name: 'url', label: 'Enlace HTTPS de YouTube o Spotify', type: 'url', required: true, full: true },
      { name: 'cover', label: 'URL de portada (opcional)', type: 'url', full: true }
    ]
  },
  letters: {
    label: 'Cartas',
    fields: [
      { name: 'title', label: 'Título', required: true },
      { name: 'date', label: 'Fecha o dedicatoria' },
      { name: 'body', label: 'Carta', type: 'textarea', required: true, full: true },
      { name: 'signature', label: 'Firma', full: true }
    ]
  }
}

function cloneDefaults () {
  return JSON.parse(JSON.stringify(defaultContent))
}

function normalizeContent (value) {
  const defaults = cloneDefaults()
  if (!value || typeof value !== 'object') return defaults
  const profile = value.profile && typeof value.profile === 'object'
    ? value.profile
    : {}
  const normalized = {
    ...defaults,
    ...value,
    profile: { ...defaults.profile, ...profile }
  }
  for (const key of Object.keys(collectionDefinitions)) {
    normalized[key] = Array.isArray(value[key]) ? value[key] : defaults[key]
  }
  return normalized
}

function anniversaryFor (start, months) {
  const month = start.getMonth() + months
  const year = start.getFullYear() + Math.floor(month / 12)
  const normalizedMonth = ((month % 12) + 12) % 12
  const lastDay = new Date(year, normalizedMonth + 1, 0).getDate()
  return new Date(year, normalizedMonth, Math.min(start.getDate(), lastDay))
}

function getAnniversary (dateString, now = new Date()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString || '')) return null
  const [year, month, day] = dateString.split('-').map(Number)
  const start = new Date(year, month - 1, day)
  if (
    Number.isNaN(start.getTime()) ||
    start.getFullYear() !== year ||
    start.getMonth() !== month - 1 ||
    start.getDate() !== day
  ) return null
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (start > today) return null
  let months =
    (today.getFullYear() - year) * 12 + today.getMonth() - (month - 1)
  if (anniversaryFor(start, months) > today) months -= 1
  const lastAnniversary = anniversaryFor(start, months)
  const elapsed = Math.max(0, Math.floor((now.getTime() - lastAnniversary.getTime()) / 1000))
  const next = anniversaryFor(start, months + 1)
  const daysUntil = Math.max(0, Math.ceil(
    (Date.UTC(next.getFullYear(), next.getMonth(), next.getDate()) -
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000
  ))
  return { days: Math.floor(elapsed / 86400), hours: Math.floor(elapsed / 3600) % 24, minutes: Math.floor(elapsed / 60) % 60, seconds: elapsed % 60, months, next, daysUntil }
}

if (typeof document !== 'undefined') {
  let appData = cloneDefaults()
  let supabaseClient = null
  let cloudUser = null
  let isAdmin = false
  let selectedLetter = 0
  let activeAdminTab = 'profile'
  let authCooldown = null
  const authDialog = document.querySelector('#auth-dialog')
  const adminDialog = document.querySelector('#admin-dialog')
  const authForm = document.querySelector('#auth-form')
  const adminEditor = document.querySelector('#admin-editor')
  const adminFeedback = document.querySelector('#admin-feedback')
  const config = window.MONTHIVERSARY_CONFIG || {}

  if (window.supabase?.createClient && config.supabaseUrl && config.supabaseAnonKey) {
    supabaseClient = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey)
  }

  function setStatus (message, mode = 'local') {
    const status = document.querySelector('#sync-status')
    status.textContent = message
    status.dataset.mode = mode
  }

  function setFeedback (element, message, mode = '') {
    element.textContent = message
    if (mode) element.dataset.mode = mode
    else delete element.dataset.mode
  }

  function makeElement (tag, className, text) {
    const element = document.createElement(tag)
    if (className) element.className = className
    if (text !== undefined) element.textContent = text
    return element
  }

  function formatDate (dateString) {
    if (!dateString) return 'Sin fecha'
    const date = new Date(`${dateString}T12:00:00`)
    if (Number.isNaN(date.getTime())) return dateString
    return new Intl.DateTimeFormat('es', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  function updateCounter () {
    const result = getAnniversary(appData.profile.startDate)
    const values = result || { days: 0, hours: 0, minutes: 0, seconds: 0 }
    document.querySelector('#counter-days').textContent = String(values.days).padStart(2, '0')
    document.querySelector('#counter-hours').textContent = String(values.hours).padStart(2, '0')
    document.querySelector('#counter-minutes').textContent = String(values.minutes).padStart(2, '0')
    document.querySelector('#counter-seconds').textContent = String(values.seconds).padStart(2, '0')
    document.querySelector('#start-date-label').textContent = result
      ? `Juntos desde el ${formatDate(appData.profile.startDate)} · próxima celebración en ${result.daysUntil} días`
      : 'Cada historia empieza en algún lugar.'
  }

  function initBackground () {
    const canvas = document.querySelector('#bgCanvas')
    const context = canvas.getContext('2d')
    if (!context) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    const hearts = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 5 + Math.random() * 12,
      speed: .00008 + Math.random() * .00012,
      sway: Math.random() * Math.PI * 2,
      opacity: .16 + Math.random() * .3
    }))

    function resize () {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    function draw (time = 0) {
      context.clearRect(0, 0, width, height)
      for (const heart of hearts) {
        const x = heart.x * width + Math.sin(time * heart.speed + heart.sway) * 13
        const y = ((heart.y * height - time * heart.speed * 170) % (height + 30) + height + 30) % (height + 30) - 15
        context.save()
        context.translate(x, y)
        context.rotate(Math.sin(time * heart.speed + heart.sway) * .2)
        context.scale(heart.size / 20, heart.size / 20)
        context.beginPath()
        context.moveTo(0, 7)
        context.bezierCurveTo(-20, -7, -10, -20, 0, -9)
        context.bezierCurveTo(10, -20, 20, -7, 0, 7)
        context.fillStyle = `rgba(155, 114, 170, ${heart.opacity})`
        context.fill()
        context.restore()
      }
      if (!prefersReducedMotion) window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', () => {
      resize()
      if (prefersReducedMotion) draw()
    })
    draw()
  }

  function renderEmpty (container, text) {
    container.replaceChildren(makeElement('p', 'empty-state', text))
  }

  function renderTimeline () {
    const container = document.querySelector('#timeline-list')
    container.replaceChildren()
    if (!appData.timeline.length) return renderEmpty(container, 'Pronto añadiremos capítulos a nuestra historia.')
    for (const item of appData.timeline) {
      const card = makeElement('article', 'timeline-card')
      card.append(makeElement('time', '', item.date), makeElement('h3', '', item.title), makeElement('p', '', item.description))
      if (item.image) {
        const image = makeElement('img')
        image.src = item.image
        image.alt = item.title || 'Recuerdo de nuestra historia'
        image.loading = 'lazy'
        card.append(image)
      }
      container.append(card)
    }
  }

  function renderPhotos () {
    const container = document.querySelector('#photo-list')
    container.replaceChildren()
    if (!appData.photos.length) return renderEmpty(container, 'Pronto habrá fotos de nuestros momentos favoritos.')
    for (const photo of appData.photos) {
      const figure = makeElement('figure', 'photo-card')
      const open = makeElement('button', 'photo-open')
      open.type = 'button'
      open.setAttribute('aria-label', `Ver foto: ${photo.caption || photo.alt || ''}`)
      const image = makeElement('img')
      image.src = photo.url
      image.alt = photo.alt || photo.caption || 'Recuerdo de Jess y Ale'
      image.loading = 'lazy'
      const caption = makeElement('figcaption', '', photo.caption)
      open.append(image)
      figure.append(open, caption)
      open.addEventListener('click', () => {
        document.querySelector('#lightbox-image').src = photo.url
        document.querySelector('#lightbox-image').alt = image.alt
        document.querySelector('#lightbox-caption').textContent = photo.caption || ''
        document.querySelector('#lightbox').showModal()
      })
      container.append(figure)
    }
  }

  function renderReasons () {
    const container = document.querySelector('#reason-list')
    container.replaceChildren()
    if (!appData.reasons.length) return renderEmpty(container, 'Aquí guardaremos las razones que nos hacen elegirnos.')
    appData.reasons.forEach((reason, index) => {
      const card = makeElement('div', 'flip-card')
      card.tabIndex = 0
      card.setAttribute('role', 'button')
      card.setAttribute('aria-label', `Descubrir razón ${index + 1}: ${reason.title}`)
      card.setAttribute('aria-pressed', 'false')
      const inner = makeElement('div', 'flip-card-inner')
      const front = makeElement('div', 'flip-card-front')
      front.append(
        makeElement('span', 'reason-number', `#${index + 1}`),
        makeElement('h3', '', reason.title)
      )
      const hint = makeElement('span', 'reason-hint', 'Toca para descubrir')
      const hintIcon = makeElement('i')
      hintIcon.setAttribute('data-lucide', 'rotate-cw')
      hint.append(hintIcon)
      front.append(hint)
      const back = makeElement('div', 'flip-card-back')
      back.append(makeElement('p', '', reason.text))
      const heart = makeElement('i')
      heart.setAttribute('data-lucide', 'heart')
      back.append(heart)
      inner.append(front, back)
      card.append(inner)
      const flip = () => {
        card.classList.toggle('flipped')
        card.setAttribute('aria-pressed', String(card.classList.contains('flipped')))
      }
      card.addEventListener('click', flip)
      card.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        flip()
      })
      container.append(card)
    })
  }

  function renderPoems () {
    const container = document.querySelector('#poem-list')
    container.replaceChildren()
    if (!appData.poems.length) return renderEmpty(container, 'Pronto habrá palabras para este lugar.')
    for (const poem of appData.poems) {
      const card = makeElement('article', 'poem-card')
      card.append(makeElement('h3', '', poem.title), makeElement('p', '', poem.text))
      if (poem.signature) card.append(makeElement('footer', '', poem.signature))
      container.append(card)
    }
  }

  function renderNotes () {
    const container = document.querySelector('#note-list')
    container.replaceChildren()
    if (!appData.notes.length) return renderEmpty(container, 'Todavía no hay notas guardadas.')
    for (const note of [...appData.notes].reverse()) {
      const card = makeElement('article', 'note-card')
      card.append(makeElement('time', '', formatDate(note.date)), makeElement('h3', '', note.title), makeElement('p', '', note.content))
      container.append(card)
    }
  }

  function embedUrl (rawUrl) {
    try {
      const url = new URL(rawUrl)
      if (url.protocol !== 'https:') return null
      const host = url.hostname.replace(/^www\./, '')
      if (['youtu.be', 'youtube.com', 'music.youtube.com'].includes(host)) {
        const videoId = host === 'youtu.be'
          ? url.pathname.slice(1).split('/')[0]
          : url.searchParams.get('v') || url.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1]
        return videoId ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` : null
      }
      if (host === 'open.spotify.com') {
        const match = url.pathname.match(/^\/(track|album|playlist|episode)\/([^/?]+)/)
        return match ? `https://open.spotify.com/embed/${match[1]}/${encodeURIComponent(match[2])}` : null
      }
    } catch {}
    return null
  }

  function isHttpsUrl (rawUrl) {
    try {
      return new URL(rawUrl).protocol === 'https:'
    } catch {
      return false
    }
  }

  function renderSongs () {
    const container = document.querySelector('#song-list')
    container.replaceChildren()
    if (!appData.songs.length) return renderEmpty(container, 'La primera canción todavía espera su momento.')
    for (const song of appData.songs) {
      const card = makeElement('article', 'song-card')
      const embed = embedUrl(song.url)
      if (embed) {
        const frame = makeElement('iframe')
        frame.src = embed
        frame.title = `Reproductor: ${song.title}`
        frame.loading = 'lazy'
        frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        card.append(frame)
      } else if (song.cover) {
        const cover = makeElement('img', 'song-cover')
        cover.src = song.cover
        cover.alt = `Portada de ${song.title}`
        cover.loading = 'lazy'
        card.append(cover)
      }
      const info = makeElement('div', 'song-info')
      info.append(makeElement('h3', '', song.title))
      if (song.artist) info.append(makeElement('p', '', song.artist))
      if (song.note) info.append(makeElement('p', '', song.note))
      const link = makeElement('a', '', 'Abrir canción')
      link.href = song.url
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      const icon = makeElement('i')
      icon.setAttribute('data-lucide', 'external-link')
      link.prepend(icon)
      info.append(link)
      card.append(info)
      container.append(card)
    }
  }

  function renderLetters () {
    const tabs = document.querySelector('#letter-tabs')
    const card = document.querySelector('#letter-card')
    tabs.replaceChildren()
    card.replaceChildren()
    if (!appData.letters.length) {
      card.hidden = true
      return renderEmpty(tabs, 'Aquí guardaremos nuestras cartas especiales.')
    }
    card.hidden = false
    selectedLetter = Math.min(selectedLetter, appData.letters.length - 1)
    appData.letters.forEach((letter, index) => {
      const tab = makeElement('button', 'letter-tab', letter.title)
      tab.type = 'button'
      tab.setAttribute('role', 'tab')
      tab.setAttribute('aria-selected', String(index === selectedLetter))
      tab.addEventListener('click', () => {
        selectedLetter = index
        renderLetters()
      })
      tabs.append(tab)
    })
    const letter = appData.letters[selectedLetter]
    card.append(
      makeElement('span', 'letter-date', letter.date || ''),
      makeElement('h3', '', letter.title),
      makeElement('div', 'letter-content', letter.body),
      makeElement('span', 'letter-signature', letter.signature || '')
    )
  }

  function render () {
    const profile = appData.profile
    const names = `${profile.partner1 || 'Jess'} & ${profile.partner2 || 'Ale'}`
    document.querySelector('#nav-names').textContent = names
    document.querySelector('#partner-one').textContent = profile.partner1 || 'Jess'
    document.querySelector('#partner-two').textContent = profile.partner2 || 'Ale'
    document.querySelector('#footer-names').textContent = names
    document.querySelector('#hero-subtitle').textContent = profile.subtitle || ''
    document.querySelector('#hero-quote').textContent = `“${profile.quote || ''}”`
    updateCounter()
    renderTimeline()
    renderPhotos()
    renderReasons()
    renderPoems()
    renderNotes()
    renderSongs()
    renderLetters()
    window.lucide?.createIcons()
  }

  function updateAuthButton () {
    const button = document.querySelector('#open-admin')
    button.querySelector('span').textContent = isAdmin
      ? 'Editar'
      : cloudUser
        ? 'Salir'
        : 'Gestión'
  }

  async function checkAdmin () {
    if (!supabaseClient || !cloudUser) return false
    const { data, error } = await supabaseClient
      .from('anniversary_admins')
      .select('user_id')
      .eq('user_id', cloudUser.id)
      .maybeSingle()
    if (error) throw error
    return Boolean(data)
  }

  function readLegacyLocal () {
    try {
      const saved = JSON.parse(localStorage.getItem(contentStorageKey))
      if (!saved || typeof saved !== 'object') return { memories: [], songs: [] }
      return {
        memories: Array.isArray(saved.memories) ? saved.memories : [],
        songs: Array.isArray(saved.songs) ? saved.songs : []
      }
    } catch {
      return { memories: [], songs: [] }
    }
  }

  async function mergeLegacyEntries () {
    if (!isAdmin || !cloudUser) return false
    const { data, error } = await supabaseClient
      .from('shared_entries')
      .select('id, kind, title, body, entry_date, url')
      .eq('user_id', cloudUser.id)
      .order('created_at', { ascending: true })
    if (error) throw error
    let changed = false
    for (const entry of data || []) {
      const collection = entry.kind === 'song' ? 'songs' : 'notes'
      if (appData[collection].some(item => item.sourceId === entry.id)) continue
      appData[collection].push(entry.kind === 'song'
        ? { id: `legacy-${entry.id}`, sourceId: entry.id, title: entry.title, artist: '', note: entry.body, url: entry.url }
        : { id: `legacy-${entry.id}`, sourceId: entry.id, title: entry.title, date: entry.entry_date, content: entry.body })
      changed = true
    }
    const localEntries = readLegacyLocal()
    for (const entry of localEntries.memories) {
      const id = `local-${entry.id || createId()}`
      if (appData.notes.some(item => item.id === id)) continue
      appData.notes.push({ id, title: entry.title || 'Recuerdo', date: entry.date || '', content: entry.note || '' })
      changed = true
    }
    for (const entry of localEntries.songs) {
      const id = `local-${entry.id || createId()}`
      if (appData.songs.some(item => item.id === id)) continue
      appData.songs.push({ id, title: entry.title || 'Canción', artist: '', note: entry.note || '', url: entry.url || '' })
      changed = true
    }
    return changed
  }

  function createId () {
    return window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }

  async function persistContent (feedback = adminFeedback) {
    if (!supabaseClient || !cloudUser || !isAdmin) {
      setFeedback(feedback, 'Inicia sesión con una cuenta autorizada para guardar cambios.', 'error')
      return false
    }
    setFeedback(feedback, 'Guardando en Supabase…')
    const { error } = await supabaseClient
      .from('anniversary_content')
      .upsert({
        id: 'main',
        owner_id: cloudUser.id,
        content: appData,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' })
    if (error) {
      setFeedback(feedback, `No se guardaron los cambios: ${error.message}`, 'error')
      setStatus('No se pudieron guardar los cambios en Supabase.', 'error')
      return false
    }
    localStorage.removeItem(contentStorageKey)
    render()
    setFeedback(feedback, 'Cambios guardados y sincronizados.', 'success')
    setStatus('Sincronizado con Supabase', 'cloud')
    return true
  }

  async function loadContent () {
    const { data, error } = await supabaseClient
      .from('anniversary_content')
      .select('content')
      .eq('id', 'main')
      .maybeSingle()
    if (error) throw error
    appData = data ? normalizeContent(data.content) : cloneDefaults()
    if (isAdmin) {
      const legacyChanged = await mergeLegacyEntries()
      if ((!data || legacyChanged) && !(await persistContent())) {
        throw new Error('No se pudo inicializar el contenido en Supabase.')
      }
      else render()
    } else {
      render()
    }
  }

  async function connectSession (session) {
    cloudUser = session?.user || null
    isAdmin = false
    updateAuthButton()
    if (!cloudUser) {
      try {
        await loadContent()
        setStatus('Sesión cerrada · contenido público', 'local')
      } catch (error) {
        appData = cloneDefaults()
        render()
        setStatus(`No se pudo cargar el contenido público: ${error.message}`, 'error')
      }
      return
    }
    let loadFailed = false
    try {
      isAdmin = await checkAdmin()
      await loadContent()
    } catch (error) {
      loadFailed = true
      setStatus(`No se pudo cargar el contenido: ${error.message}`, 'error')
    }
    updateAuthButton()
    if (isAdmin && !loadFailed) {
      setStatus('Sesión de gestión activa · sincronizado con Supabase', 'cloud')
    } else if (!loadFailed) {
      setStatus('Sesión activa sin permisos de gestión', 'local')
    }
  }

  async function initializeSupabase () {
    if (!supabaseClient) {
      setStatus('Falta configurar Supabase en js/config.js', 'error')
      return
    }
    try {
      const { data, error } = await supabaseClient.auth.getSession()
      if (error) throw error
      await connectSession(data.session)
      supabaseClient.auth.onAuthStateChange((_event, session) => {
        window.setTimeout(() => connectSession(session), 0)
      })
      if (!data.session && document.querySelector('#sync-status').dataset.mode !== 'error') {
        setStatus('Contenido público · inicia sesión para administrar', 'local')
      }
    } catch (error) {
      setStatus(`No se pudo conectar con Supabase: ${error.message}`, 'error')
    }
  }

  function setAuthCooldown (seconds) {
    const button = authForm.querySelector('button[type="submit"]')
    button.disabled = true
    const endsAt = Date.now() + seconds * 1000
    window.clearInterval(authCooldown)
    authCooldown = window.setInterval(() => {
      const remaining = Math.ceil((endsAt - Date.now()) / 1000)
      if (remaining <= 0) {
        window.clearInterval(authCooldown)
        button.disabled = false
        button.innerHTML = 'Enviar enlace de acceso <i data-lucide="send"></i>'
        window.lucide?.createIcons()
      } else {
        button.textContent = `Espera ${remaining} segundos para volver a solicitar`
      }
    }, 1000)
  }

  function getAdminTabs () {
    return [
      { id: 'profile', label: 'General' },
      ...Object.entries(collectionDefinitions).map(([id, value]) => ({ id, label: value.label }))
    ]
  }

  function openAdmin () {
    if (!supabaseClient) {
      setStatus('Configura Supabase para habilitar la gestión y la sincronización.', 'error')
      return
    }
    if (!cloudUser) {
      authDialog.showModal()
      return
    }
    if (!isAdmin) {
      setStatus('Esta cuenta no está autorizada para editar el contenido.', 'error')
      return
    }
    activeAdminTab = 'profile'
    renderAdminEditor()
    adminDialog.showModal()
  }

  function renderAdminEditor () {
    const tabs = document.querySelector('#admin-tabs')
    tabs.replaceChildren()
    for (const tab of getAdminTabs()) {
      const button = makeElement('button', 'admin-tab', tab.label)
      button.type = 'button'
      button.setAttribute('role', 'tab')
      button.setAttribute('aria-selected', String(activeAdminTab === tab.id))
      button.addEventListener('click', () => {
        activeAdminTab = tab.id
        renderAdminEditor()
      })
      tabs.append(button)
    }
    adminEditor.replaceChildren()
    if (activeAdminTab === 'profile') renderProfileForm()
    else renderCollectionForm(activeAdminTab)
    window.lucide?.createIcons()
  }

  function makeField (field, value = '') {
    const wrapper = makeElement('div', `field${field.full ? ' field-full' : ''}`)
    const label = makeElement('label', '', field.label)
    const input = makeElement(field.type === 'textarea' ? 'textarea' : 'input')
    input.name = field.name
    input.required = Boolean(field.required)
    if (field.type === 'textarea') input.rows = 4
    else {
      input.type = field.type === 'file' ? 'file' : field.type || 'text'
      if (field.type === 'file') input.accept = 'image/*'
      if (field.type !== 'file') input.value = value || ''
    }
    wrapper.append(label, input)
    return wrapper
  }

  function renderProfileForm () {
    const form = makeElement('form', 'admin-form')
    form.append(
      makeField({ name: 'partner1', label: 'Nombre 1', required: true }, appData.profile.partner1),
      makeField({ name: 'partner2', label: 'Nombre 2', required: true }, appData.profile.partner2),
      makeField({ name: 'startDate', label: 'Fecha de inicio', type: 'date', required: true }, appData.profile.startDate),
      makeField({ name: 'subtitle', label: 'Frase breve', required: true }, appData.profile.subtitle),
      makeField({ name: 'quote', label: 'Dedicatoria principal', type: 'textarea', required: true, full: true }, appData.profile.quote)
    )
    const today = new Date()
    form.elements.namedItem('startDate').max = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0')
    ].join('-')
    const submit = makeElement('button', 'primary-button form-submit', 'Guardar información')
    submit.type = 'submit'
    form.append(submit)
    form.addEventListener('submit', async event => {
      event.preventDefault()
      const values = Object.fromEntries(new FormData(form))
      const previousProfile = appData.profile
      appData.profile = {
        partner1: String(values.partner1).trim(),
        partner2: String(values.partner2).trim(),
        startDate: String(values.startDate),
        subtitle: String(values.subtitle).trim(),
        quote: String(values.quote).trim()
      }
      if (!(await persistContent())) {
        appData.profile = previousProfile
        render()
      }
    })
    adminEditor.append(form)
  }

  function renderCollectionForm (collection) {
    const definition = collectionDefinitions[collection]
    const form = makeElement('form', 'admin-form')
    let editingId = null
    for (const field of definition.fields) form.append(makeField(field))
    const submit = makeElement('button', 'primary-button form-submit', `Agregar a ${definition.label.toLowerCase()}`)
    submit.type = 'submit'
    form.append(submit)
    const list = makeElement('div', 'admin-items')
    const items = appData[collection]
    if (items.length) {
      for (const item of items) {
        const row = makeElement('div', 'admin-item')
        const itemTitle = item.title || item.caption || item.date || 'Elemento'
        row.append(makeElement('span', '', itemTitle))
        const edit = makeElement('button', '', 'Editar')
        edit.type = 'button'
        edit.addEventListener('click', () => {
          editingId = item.id
          for (const field of definition.fields) {
            const input = form.elements.namedItem(field.name)
            if (!input || field.type === 'file') continue
            input.value = item[field.name] || ''
          }
          submit.textContent = `Guardar cambios en ${definition.label.toLowerCase()}`
          setFeedback(adminFeedback, `Editando: ${itemTitle}`)
        })
        row.append(edit)
        const remove = makeElement('button', '', 'Eliminar')
        remove.type = 'button'
        remove.addEventListener('click', async () => {
          const index = appData[collection].findIndex(candidate => candidate.id === item.id)
          if (index < 0) return
          const [removed] = appData[collection].splice(index, 1)
          if (collection === 'letters' && index < selectedLetter) selectedLetter -= 1
          selectedLetter = Math.min(selectedLetter, Math.max(appData.letters.length - 1, 0))
          if (await persistContent()) {
            if (collection === 'photos') await removeStoredImage(removed.url)
            renderAdminEditor()
          } else {
            appData[collection].splice(index, 0, removed)
          }
        })
        row.append(remove)
        list.append(row)
      }
    } else {
      list.append(makeElement('p', 'empty-state', 'Todavía no hay elementos en esta sección.'))
    }
    form.append(list)
    form.addEventListener('submit', async event => {
      event.preventDefault()
      const values = Object.fromEntries(new FormData(form))
      const file = form.querySelector('input[type="file"]')?.files?.[0]
      const item = { id: createId() }
      for (const field of definition.fields) {
        if (field.name === 'file') continue
        item[field.name] = String(values[field.name] || '').trim()
      }
      const existingIndex = editingId
        ? appData[collection].findIndex(candidate => candidate.id === editingId)
        : -1
      const existingItem = existingIndex >= 0 ? appData[collection][existingIndex] : null
      if (existingItem) item.id = existingItem.id
      if (collection === 'photos') {
        if (file) {
          try {
            item.url = await uploadImage(file)
          } catch (error) {
            setFeedback(adminFeedback, `No se pudo cargar la foto: ${error.message}`, 'error')
            return
          }
        }
        if (!item.url && existingItem) item.url = existingItem.url
        if (!item.url) {
          setFeedback(adminFeedback, 'Selecciona una foto o pega una URL de imagen.', 'error')
          return
        }
        if (!isHttpsUrl(item.url)) {
          setFeedback(adminFeedback, 'Usa una URL HTTPS para la foto.', 'error')
          return
        }
        item.alt = item.alt || item.caption
      }
      if (collection === 'timeline' && item.image && !isHttpsUrl(item.image)) {
        setFeedback(adminFeedback, 'Usa una URL HTTPS para la foto del hito.', 'error')
        return
      }
      if (collection === 'songs' && item.cover && !isHttpsUrl(item.cover)) {
        setFeedback(adminFeedback, 'Usa una URL HTTPS para la portada.', 'error')
        return
      }
      if (collection === 'songs' && !embedUrl(item.url)) {
        setFeedback(adminFeedback, 'Usa un enlace HTTPS válido de YouTube o Spotify.', 'error')
        return
      }
      if (existingIndex >= 0) appData[collection][existingIndex] = item
      else appData[collection].push(item)
      if (await persistContent()) {
        if (collection === 'photos' && file && existingItem?.url !== item.url) {
          await removeStoredImage(existingItem?.url)
        }
        renderAdminEditor()
      } else {
        if (existingIndex >= 0) appData[collection][existingIndex] = existingItem
        else appData[collection].pop()
        if (collection === 'photos' && file) await removeStoredImage(item.url)
      }
    })
    adminEditor.append(form)
  }

  async function removeStoredImage (rawUrl) {
    if (!rawUrl || !cloudUser || !config.supabaseUrl) return
    try {
      const base = new URL(config.supabaseUrl)
      const image = new URL(rawUrl)
      const prefix = `/storage/v1/object/public/${mediaBucket}/`
      if (image.origin !== base.origin || !image.pathname.startsWith(prefix)) return
      const path = decodeURIComponent(image.pathname.slice(prefix.length))
      if (!path.startsWith(`${cloudUser.id}/`)) return
      const { error } = await supabaseClient.storage.from(mediaBucket).remove([path])
      if (error) {
        setStatus(`El contenido se eliminó, pero no se pudo limpiar la foto: ${error.message}`, 'error')
      }
    } catch (error) {
      setStatus(`El contenido se eliminó, pero no se pudo limpiar la foto: ${error.message}`, 'error')
    }
  }

  async function uploadImage (file) {
    const supportedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
    if (!supportedTypes.includes(file.type)) {
      throw new Error('Usa una imagen JPG, PNG, WebP, GIF o AVIF.')
    }
    if (file.size > 8 * 1024 * 1024) throw new Error('El tamaño máximo permitido es 8 MB.')
    const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
    const path = `${cloudUser.id}/${createId()}.${extension}`
    const { error } = await supabaseClient.storage.from(mediaBucket).upload(path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false
    })
    if (error) throw error
    const { data } = supabaseClient.storage.from(mediaBucket).getPublicUrl(path)
    return data.publicUrl
  }

  document.querySelector('#open-admin').addEventListener('click', async () => {
    if (cloudUser && !isAdmin && supabaseClient) {
      const { error } = await supabaseClient.auth.signOut()
      if (error) setStatus(`No se pudo cerrar sesión: ${error.message}`, 'error')
      return
    }
    openAdmin()
  })
  document.querySelector('#open-admin-footer').addEventListener('click', openAdmin)
  document.querySelectorAll('[data-close]').forEach(button => {
    button.addEventListener('click', () => button.closest('dialog').close())
  })
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close()
    })
  })
  document.querySelector('#sign-out').addEventListener('click', async () => {
    if (!supabaseClient) return
    const { error } = await supabaseClient.auth.signOut()
    if (error) setFeedback(adminFeedback, `No se pudo cerrar sesión: ${error.message}`, 'error')
    else adminDialog.close()
  })

  authForm.addEventListener('submit', async event => {
    event.preventDefault()
    if (!supabaseClient) return
    const email = String(new FormData(authForm).get('email') || '').trim()
    const button = authForm.querySelector('button[type="submit"]')
    button.disabled = true
    setFeedback(document.querySelector('#auth-feedback'), 'Solicitando enlace de acceso…')
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: new URL('callback.html', window.location.href).href }
    })
    if (error) {
      button.disabled = false
      setFeedback(document.querySelector('#auth-feedback'), `No se pudo enviar el enlace: ${error.message}`, 'error')
      return
    }
    setFeedback(document.querySelector('#auth-feedback'), 'Enlace enviado. Revisa tu correo para continuar.', 'success')
    setAuthCooldown(60)
  })

  render()
  initBackground()
  updateAuthButton()
  window.setInterval(updateCounter, 1000)
  initializeSupabase()
}
