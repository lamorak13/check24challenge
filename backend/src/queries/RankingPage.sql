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
                        "points" desc,
                        "registration_date" asc
                ) as Int
            ),
            Cast(row_number() over() as Int) row_num
        from
            "User" u
            join "belongsToCommunity" b on u. "name" = b. "userName"
        where
            b. "communityName" = $2
    ) x
where
    x. "row_num" between $3
    and $4