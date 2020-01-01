var sudo = new Array(

    Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0),
    Array(0, 0, 0, 0, 0, 0, 0, 0, 0)
    
    );
    
    function uniq()
    {  
        var s = 45*2;
        var x = 362880*2;
    
        for(let i=0; i<9; i++)
        {
            for(let k=0; k<9; k++)
            {
                s -= sudo[i][k];
                x = x/(sudo[i][k]);
            }
        }
    
        console.log(s, x);
    
        if(x == 1)
        {
            if(s == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }
    
    function start(d)
    {  
        $('section').html('<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>');
    
        for(let i=0; i<9; i++)
        {
            for(let k=0; k<9; k++)
            {
                if(i%3 == 0 && i != 0)
                {
                    $('section > div:nth-child('+((k+1)+(i*9))+')').css('border-top', '3px solid #111');
                }
                if(k%3 == 0 && k != 0)
                {
                    $('section > div:nth-child('+((k+1)+(i*9))+')').css('border-left', '3px solid #111');
                }
    
                sudo[i][k] = 0;
            }
        }
    
        for(var i=d; i>0; i--)
        {
            var r = Math.floor(Math.random()*9);
            var c = Math.floor(Math.random()*9);
    
            if(sudo[r][c] != 0)
            {
                i++;
                continue;
            }
            
            sudo[r][c] = Math.floor(Math.random()*9+1);
            $('section > div:nth-child('+((c+1)+(r*9))+')').html('<p>'+sudo[r][c]+'</p>');
        }
    
        if(uniq() == false)
        {
            start(d);
        }
    }
    
    window.onload = start(27);