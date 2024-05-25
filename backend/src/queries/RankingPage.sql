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
            b. "communityName" = $1
    ) x
where
    x. "row_num" between $2
    and $3