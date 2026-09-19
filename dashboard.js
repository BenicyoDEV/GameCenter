const torneios = document.getElementById("torneio");
    const comunidade = document.getElementById("comunidade");
    let vel = 1;
    let pause = false;

        for(let i = 0; i < 30; i++) {
            torneios.innerHTML += 
            ` <div class="torneiocard">
                <img src="imagens/mkworld.jfif" alt="torneio" class="fototorneio">
                <p class="nome">Mario Kart World</p>
                </div>
            `;
            }

        for(let i = 0; i < 30; i++) {
            comunidade.innerHTML += 
            ` <div class="torneioccard" >
                    <img src="imagens/download.jfif" alt="torneio" class="icontorneio">
                </div>
            `;
        }
    

    let posicao = 0;
    function move() {
        posicao -= vel;
        const largcomunidade = comunidade.scrollWidth / 2;

        
        const poscomunidade = posicao % largcomunidade;

        torneios.style.transform = `translateX(${postorneios}px)`;
        comunidade.style.transform = `translateX(${poscomunidade}px)`;
        requestAnimationFrame(move)
    }

    move()