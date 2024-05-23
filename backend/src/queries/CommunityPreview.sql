With ranks as (
    Select
        u. "name",
        u. "points",
        Cast(
            rank() over(
                order by
                    "points" desc,
                    "registration_date" asc
            ) as Int
        ),
        Cast(row_number() over() as Int) row_num,
        Case
            when exists (
                Select
                    1
                from
                    "Pin" p
                where
                    p. "userName" = $1
                    and p. "pinnedUserName" = u. "name"
                    and p. "communityName" = $2
            ) then true
            else false
        End as pinned
    from
        "User" u
        join "belongsToCommunity" b on u. "name" = b. "userName"
    where
        b. "communityName" = $2
),
user_rank as (
    Select
        r. "row_num"
    from
        ranks r
    where
        r. "name" = $1
),
preview as (
    Select
        *
    from
        ranks r
    where
        r. "row_num" between (
            Select
                *
            from
                user_rank
        ) - 1
        and (
            Select
                *
            from
                user_rank
        ) + 1
        or r. "row_num" = (
            Select
                count(*)
            from
                ranks
        )
) (
    Select
        *
    from
        preview
)
Union
(
    Select
        *
    from
        ranks
    limit
        7 - (
            Select
                count(*)
            from
                preview
        )
)
order by
    "row_num"