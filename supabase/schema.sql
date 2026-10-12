create table
    if not exists public.shared_entries (
        id uuid primary key default gen_random_uuid (),
        user_id uuid not null references auth.users (id) on delete cascade,
        kind text not null check (kind in ('note', 'song')),
        title text not null,
        body text not null default '',
        entry_date date,
        url text,
        created_at timestamptz not null default now ()
    );

alter table public.shared_entries enable row level security;

create policy "Users can read their own entries" on public.shared_entries for
select
    to authenticated using (
        (
            select
                auth.uid ()
        ) = user_id
    );

create policy "Users can create their own entries" on public.shared_entries for insert to authenticated
with
    check (
        (
            select
                auth.uid ()
        ) = user_id
    );

create policy "Users can delete their own entries" on public.shared_entries for delete to authenticated using (
    (
        select
            auth.uid ()
    ) = user_id
);