Select
    *
from
    (
        Select
            u. "name",
            u. "points",
            Cast(
                rank() over(
                    order by
                        "points" desc
                ) as Int
            ),
            Cast(
                row_number() over(
                    order by
                        "points" desc,
                        "registration_date" asc
                ) as Int
            ) row_num
        from
            "User" u
            join "belongsToCommunity" b on u. "name" = b. "userName"
        where
            b. "communityName" = $2
    ) x
where
    exists (
        Select
            1
        from
            "Pin" p
        where
            p. "userName" = $1
            and p. "pinnedUserName" = x. "name"
            and p. "communityName" = $2
    )