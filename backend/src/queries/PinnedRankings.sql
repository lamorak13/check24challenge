Select
    u. "name",
    u. "points",
    Cast(
        rank() over(
            order by
                "points" desc,
                "registration_date" asc
        ) as Int
    )
from
    "User" u
    join "belongsToCommunity" b on u. "name" = b. "userName"
where
    b. "communityName" = $2
    and exists (
        Select
            1
        from
            "Pin" p
        where
            p. "userName" = $1
            and p. "pinnedUserName" = u. "name"
            and p. "communityName" = $2
    )