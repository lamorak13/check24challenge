Select
    u.name,
    u.points,
    Cast(
        rank() over(
            order by
                points desc
        ) as INT
    ) "rank",
    CASE
        When exists (
            Select
                *
            from
                "Pin" p
            where
                p. "userName" = $1
                and p. "pinnedUserName" = u.name
                and p. "communityName" = $2
        ) Then true
        else false
    End as pinned
from
    "User" u
    left join "belongsToCommunity" b on u. "name" = b. "userName"
where
    b. "communityName" = $2