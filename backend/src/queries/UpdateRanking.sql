with cp as (
    Select
        (
            (g. "awayscore" - g. "homescore") = (b. "awayscore" - b. "homescore")
            and not(g. "homescore" = g. "awayscore")
        ) as difference,
        Case
            when g. "awayscore" = b. "awayscore"
            and g. "homescore" = b. "homescore" then true
            else false
        End as correct,
        (
            sign(g. "awayscore" - g. "homescore") = sign(b. "awayscore" - b. "homescore")
        ) as tendency,
        b. "userName" as name
    from
        "Bet" b,
        "Game" g
    where
        g. "id" = uuid($1)
        and b. "gameId" = g. "id"
)
Update
    "User" u
set
    points = u.points + Case
        when cp.correct = true then 8
        when cp.difference = true then 6
        when cp.tendency = true then 4
        else 0
    End
From
    cp
where
    u. "name" = cp. "name"