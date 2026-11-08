-- Monthiversary: public read-only site content with authenticated admin writes.
-- Run this file once in the Supabase SQL Editor before publishing the site.

create table if not exists public.anniversary_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.anniversary_admins enable row level security;

drop policy if exists "Admins can read their own access" on public.anniversary_admins;
create policy "Admins can read their own access"
  on public.anniversary_admins for select
  to authenticated
  using (user_id = (select auth.uid()));

grant select on public.anniversary_admins to authenticated;

-- Only these two existing Supabase Auth users can manage the shared site.
do $$
begin
  if exists (
    select allowed.user_id
    from (
      values
        ('6e4ee8a5-dccb-42bc-83b4-f7870b85f007'::uuid),
        ('e108228f-2db6-4567-bc3b-dc84d6b0acb6'::uuid)
    ) as allowed(user_id)
    where not exists (
      select 1
      from auth.users
      where auth.users.id = allowed.user_id
    )
  ) then
    raise exception 'Both configured administrator UUIDs must exist in Authentication > Users before running this schema.';
  end if;
end;
$$;

delete from public.anniversary_admins
where user_id not in (
  '6e4ee8a5-dccb-42bc-83b4-f7870b85f007'::uuid,
  'e108228f-2db6-4567-bc3b-dc84d6b0acb6'::uuid
);

insert into public.anniversary_admins (user_id)
select id
from auth.users
where id in (
  '6e4ee8a5-dccb-42bc-83b4-f7870b85f007'::uuid,
  'e108228f-2db6-4567-bc3b-dc84d6b0acb6'::uuid
)
on conflict (user_id) do nothing;

create or replace function public.is_anniversary_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.anniversary_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_anniversary_admin() from public;
grant execute on function public.is_anniversary_admin() to authenticated;

create table if not exists public.anniversary_content (
  id text primary key check (id = 'main'),
  owner_id uuid not null references auth.users (id) on delete restrict,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.anniversary_content enable row level security;

drop policy if exists "Anyone can read anniversary content" on public.anniversary_content;
create policy "Anyone can read anniversary content"
  on public.anniversary_content for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can create anniversary content" on public.anniversary_content;
create policy "Admins can create anniversary content"
  on public.anniversary_content for insert
  to authenticated
  with check (
    owner_id = (select auth.uid())
    and (select public.is_anniversary_admin())
  );

drop policy if exists "Admins can update anniversary content" on public.anniversary_content;
create policy "Admins can update anniversary content"
  on public.anniversary_content for update
  to authenticated
  using (
    (select public.is_anniversary_admin())
  )
  with check (
    (select public.is_anniversary_admin())
  );

grant select on public.anniversary_content to anon, authenticated;
grant insert, update on public.anniversary_content to authenticated;

-- Keep the previous notes/songs table and its user-scoped policies so existing
-- accounts can migrate their saved entries into anniversary_content.
create table if not exists public.shared_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('note', 'song')),
  title text not null,
  body text not null default '',
  entry_date date,
  url text,
  created_at timestamptz not null default now()
);

alter table public.shared_entries enable row level security;

drop policy if exists "Users can read their own entries" on public.shared_entries;
create policy "Users can read their own entries"
  on public.shared_entries for select
  to authenticated
  using (
    (select auth.uid()) = user_id
    and (select public.is_anniversary_admin())
  );

drop policy if exists "Users can create their own entries" on public.shared_entries;
create policy "Users can create their own entries"
  on public.shared_entries for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and (select public.is_anniversary_admin())
  );

drop policy if exists "Users can delete their own entries" on public.shared_entries;
create policy "Users can delete their own entries"
  on public.shared_entries for delete
  to authenticated
  using (
    (select auth.uid()) = user_id
    and (select public.is_anniversary_admin())
  );

grant select, insert, delete on public.shared_entries to authenticated;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'anniversary-media',
  'anniversary-media',
  true,
  8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anniversary images are public" on storage.objects;
create policy "Anniversary images are public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'anniversary-media');

drop policy if exists "Admins can upload anniversary images" on storage.objects;
create policy "Admins can upload anniversary images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'anniversary-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_anniversary_admin())
  );

drop policy if exists "Admins can update anniversary images" on storage.objects;
create policy "Admins can update anniversary images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'anniversary-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_anniversary_admin())
  )
  with check (
    bucket_id = 'anniversary-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_anniversary_admin())
  );

drop policy if exists "Admins can delete anniversary images" on storage.objects;
create policy "Admins can delete anniversary images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'anniversary-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and (select public.is_anniversary_admin())
  );
