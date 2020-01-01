var uni = false;
var fcs = '';

var sudo = new Array(

    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    new Array(0, 0, 0, 0, 0, 0, 0, 0, 0)
    
);

function check()
{
    if(sudo[0][0] != 0)
    {
        var good = true;

        for(let i=0; i<9; i++)
        {
            for(let k=0; k<9; k++)
            {
                if($('section:first-child > div:nth-child('+((k+1)+(i*9))+')').attr('class') == 'solvable' || $('section:first-child > div:nth-child('+((k+1)+(i*9))+')').attr('class') == 'focused')
                {
                    for(let u=i-(i%3); u<i+(3-(i%3)); u++)
                    {
                        for(let o=k-(k%3); o<k+(3-(k%3)); o++)
                        {
                            if($('section:first-child > div:nth-child('+((k+1)+(i*9))+') > p').html() == $('section:first-child > div:nth-child('+((o+1)+(u*9))+') > p').html())
                            {
                                if(u==i && o==k)
                                {
                                    continue;
                                }
                                else
                                {
                                    $('section:first-child > div:nth-child('+((k+1)+(i*9))+') > p').css('color', '#e74c3c');
                                    good = false;
                                }
                            }
                        }
                    }

                    for(let u=0; u<9; u++)
                    {
                        if($('section:first-child > div:nth-child('+((k+1)+(i*9))+') > p').html() == $('section:first-child > div:nth-child('+((k+1)+(u*9))+') > p').html())
                        {
                            if(u != i)
                            {
                                $('section:first-child > div:nth-child('+((k+1)+(i*9))+') > p').css('color', '#e74c3c');
                                good = false;
                            }
                        }
                    }

                    for(let o=0; o<9; o++)
                    {
                        if($('section:first-child > div:nth-child('+((k+1)+(i*9))+') > p').html() == $('section:first-child > div:nth-child('+((o+1)+(i*9))+') > p').html())
                        {
                            if(o != k)
                            {
                                $('section:first-child > div:nth-child('+((k+1)+(i*9))+') > p').css('color', '#e74c3c');
                                good = false;
                            }
                        }
                    }
                }
            }
        }

        if(good == false)
        {
            $('section:nth-child(2) > section').html(function(){
                let v = '';
                v += '<p style="color: #ff7675;">Niestety :\(</p>';
                v += '<p>Popraw błędy lub zacznij od nowa...</p>';
                return v;
            });
        }
        else
        {
            $('section:nth-child(2) > section').html(function(){
                let v = '';
                v += '<p style="color: #00b894;">Udało Ci się!</p>';
                v += '<p>Gdy już nacieszysz się wygraną, możesz rozpocząć nową grę...</p>';
                return v;
            });

            $('section:nth-child(1) > div > p').css('color', '#00b894');
        }

        $('section:nth-child(2) > section').css('display', 'flex');
    }
}

function show(dif)
{
    for(let i=dif; i>0; i--)
    {
        var row = Math.floor(Math.random()*9);
        var col = Math.floor(Math.random()*9);

        if($('section:first-child > div:nth-child('+((col+1)+(row*9))+') > p').css('visibility') == 'hidden')
        {
            $('section:first-child > div:nth-child('+((col+1)+(row*9))+')').attr('class', 'appeared');
        }
        else
        {
            i++;
            continue;
        }
    }

    for(let i=1; i<=81; i++)
    {
        if($('section:first-child div:nth-child('+i+') p').css('visibility') == 'hidden')
        {
            $('section:first-child div:nth-child('+i+')').attr('class', 'solvable');
        }
    }

    $('.solvable').html('');
}

function rand(r, c, dif)
{
    do
    {
        uni = true;

        var ix = Math.floor(Math.random()*9);

        if(sudo[r][c][ix] != 0)
        {
            sudo[r][c] = sudo[r][c][ix];
            var value = sudo[r][c];

            for(let i=r-(r%3); i<r+(3-(r%3)); i++)
            {
                for(let k=c-(c%3); k<c+(3-(c%3)); k++)
                {
                    sudo[i][k][value-1] = 0;
                }
            }

            for(let i=0; i<9; i++)
            {
                sudo[i][c][value-1] = 0;
            }

            for(let k=0; k<9; k++)
            {
                sudo[r][k][value-1] = 0;
            }
        }
        else
        {
            var sum = 0;

            for(let g=0; g<9; g++)
            {
                sum += sudo[r][c][g];
            }

            if(sum == 0)
            {
                make(dif);
            }
            else
            {
                uni = false;
            }
        }
    }
    while(!uni)

    return value;
}

function start(dif)
{
    for(let i=0; i<9; i++)
    {
        for(let k=0; k<9; k++)
        {
            $('section:first-child > div:nth-child('+((k+1)+(i*9))+')').html('<p>'+rand(i, k, dif)+'</p>');
        }
    }

    show(dif);
}

function make(dif)
{
    $('section:nth-child(2) > section').css('display', 'none');

    $('section:first-child').html(
        function()
        {
            var section = '';

            for(let i=1; i<=81; i++)
            {
                section += '<div></div>';
            }

            return section;
        }
    );

    for(let i=0; i<9; i++)
    {
        for(let k=0; k<9; k++)
        {
            sudo[i][k] = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

            if(i==2 || i==5)
            {
                $('section:first-child > div:nth-child('+((k+1)+(i*9))+')').css('border-bottom', '3px solid #151515');
            }
            else if(i==3 || i==6)
            {
                $('section:first-child > div:nth-child('+((k+1)+(i*9))+')').css('border-top', '3px solid #151515');
            }

            if(k==2 || k==5)
            {
                $('section:first-child > div:nth-child('+((k+1)+(i*9))+')').css('border-right', '3px solid #151515');
            }
            else if(k==3 || k==6)
            {
                $('section:first-child > div:nth-child('+((k+1)+(i*9))+')').css('border-left', '3px solid #151515');
            }
        }
    }

    start(dif);
}

// EVENTS

$('header > h1').on('click', function(){
    location.assign('index.html');
});

$('section:nth-child(1)').on({
    click :function()
    {

        $('section:first-child > div').css('box-shadow', 'none');
        $('section:first-child > .focused').attr('class', 'solvable');

        if($(this).attr('class') == 'solvable')
        {
            $(this).attr('class', 'focused');
            $('section:first-child > .focused').css('box-shadow', '0px 0px 5px 1px inset #00b894');
        }
    }
}, 'div');

$('section:nth-child(1)').on({
    dblclick :function()
    {
        if($(this).attr('class') == 'focused')
        {
            $(this).html('');
        }
    }
}, 'div');

$('section:nth-child(2) > div > i').on('click', function(){
    if($('section:nth-child(2) > div').css('clip-path') == 'circle(10% at 50% 5%)')
    {
        $('section:nth-child(2) > div').css('clip-path', 'circle(150% at 50% 5%)');
        $('section:nth-child(2) > div > i').css('color', '#00b894');
        $('section:nth-child(2) > div > i').css('box-shadow', '0px 0px 5px 1px #00b894');
    }
    else
    {
        $('section:nth-child(2) > div').css('clip-path', 'circle(10% at 50% 5%)');
        $('section:nth-child(2) > div > i').css('color', '#1a1a1a');
        $('section:nth-child(2) > div > i').css('box-shadow', '0px 0px 5px 1px #151515');
    }
});

$('section:nth-child(2) > article > div').on('click', function(){
    $('section:nth-child(2) > article > div').css('box-shadow', '0px 0px 5px 2px #151515');
    $('section:nth-child(2) > article > div').css('color', '#181818');
    $(this).css('box-shadow', '0px 0px 5px 1px #00b894');
    $(this).css('color', '#00b894');

    $('section:nth-child(1) > div > p').css('box-shadow', 'none');
    $('section:nth-child(1) > div > p:contains('+($(this).html())+')').css('box-shadow', '0px 0px 5px 1px inset #666');
});

$('section:nth-child(2) > article > div').on('dblclick', function(){
    $('section:nth-child(2) > article > div').css('box-shadow', '0px 0px 5px 2px #151515');
    $('section:nth-child(2) > article > div').css('color', '#181818');
    $('section:nth-child(1) > div > p').css('box-shadow', 'none');
});

$('section:nth-child(2) > section').on('click', function()
{  
    $(this).css('display', 'none');
});

document.onkeypress = function(e) {
    e = e || window.event;
    
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    charCode = String.fromCharCode(charCode);

    if(!isNaN(charCode) && charCode != 0)
    {
        $('.focused').html('<p>'+charCode+'</p>');
        $('.focused > p').attr('class', 'visible');
    }
};