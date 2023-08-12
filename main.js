const setup = () => {
    document.getElementById('canvas').width = window.innerHeight;
    document.getElementById('canvas').height = window.innerHeight;
};


class DartBoardRenderer {
    constructor(canvas, on_click) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.on_click = on_click;
        this.u = x => parseInt(x*canvas.width);
        this.retr_u = x => x/canvas.width;
        this.mark_hits = true;
        this.order = [6,10,15,2,17,3,19,7,16,8,11,14,9,12,5,20,1,18,4,13];
        canvas.addEventListener('click', this.handle_click.bind(this));
    }

    _mark_hit(x, y) {
        this.ctx.fillStyle = "#ff0000";
        this.ctx.strokeStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2*Math.PI);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    clear_marks() {
        this.render();
    };

    handle_click(event) {

        const { u,  retr_u, on_click, order } = this;
        const { x, y } = event;
        let score = "";

        

        // Calculate distance from middle
        const dx = x - u(0.5);
        const dy = y - u(0.5);
        const dist = retr_u(Math.sqrt(dx*dx + dy*dy));

        if(dist < 0.5 && this.mark_hits) {
            this._mark_hit(x, y);
        }
        
        if(dist > 0.377) {
            on_click("0");
            return;
        }

        if(dist < 0.014) {
            on_click("D25");
            return;
        } else if(dist < 0.035) {
            on_click("25");
            return;
        }

        // check for double
        if((dist < 0.377) && (dist > 0.359)) {
            score = "D";
        } else if((dist < 0.237) && (dist > 0.219)) {
            score = "T";
        }
        
        // Calculate angle
        const angle = Math.atan2(dy, dx);
        const field_width = Math.PI / 10;
        const start_angle = field_width/2;
        const index = Math.floor((angle - start_angle) / field_width) + 1;
        score += order[(index >= 0) ? index : index+20];
        on_click(score);
        return;
    };
    
    render() {
        const { ctx, canvas, u, order } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const field_width = Math.PI / 10;
        const start_angle = field_width/2;
        
        
        // Draw border circle
        ctx.beginPath();
        ctx.strokeStyle = "#ffffff";
        ctx.fillStyle = "#000000";
        ctx.arc(u(0.5), u(0.5), u(0.5), 0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        
        // Descriptions
        for(let i=0; i<20;i++) {
            const angle = i*field_width;
            ctx.save();
            // idk what clusterfuck this is
            // todo: rotate numbers so they are read from the bulls'eye's view
            ctx.translate(u(0.5), u(0.5));
            ctx.rotate(angle);
            ctx.fillStyle = "#ffffff";
            ctx.font = u(0.025)+"px Consolas";
            ctx.textAlign = "center";
            ctx.fillText(order[i], u(0.48), 0);
            ctx.restore();
        }

        // Outer circle (doubles)
        for(let i=0; i<20;i++) {
            const angle = start_angle + i*field_width;
            ctx.beginPath();
            ctx.fillStyle = (i%2===0)?"#940d0d":"#1b7d35";
            ctx.arc(u(0.5), u(0.5), u(0.377), angle, angle + field_width, false);
            ctx.lineTo(u(0.5), u(0.5));
            ctx.fill();
            ctx.closePath();
        }
        // are inside of doubles
        for(let i=0; i<20;i++) {
            const angle = start_angle + i*field_width;
            ctx.beginPath();
            ctx.fillStyle = (i%2===0)?"#141414":"#a18e6a";
            ctx.arc(u(0.5), u(0.5), u(0.359), angle, angle + field_width, false);
            ctx.lineTo(u(0.5), u(0.5));
            ctx.fill();
            ctx.closePath();
        }

        // inner circle (triples)
        for(let i=0; i<20;i++) {
            const angle = start_angle + i*field_width;
            ctx.beginPath();
            ctx.fillStyle = (i%2===0)?"#940d0d":"#1b7d35";
            ctx.arc(u(0.5), u(0.5), u(0.237), angle, angle + field_width, false);
            ctx.lineTo(u(0.5), u(0.5));
            ctx.fill();
            ctx.closePath();
        }
        // are inside of triples
        for(let i=0; i<20;i++) {
            const angle = start_angle + i*field_width;
            ctx.beginPath();
            ctx.fillStyle = (i%2===0)?"#141414":"#a18e6a";
            ctx.arc(u(0.5), u(0.5), u(0.219), angle, angle + field_width, false);
            ctx.lineTo(u(0.5), u(0.5));
            ctx.fill();
            ctx.closePath();
        }


        // bull circle
        ctx.beginPath();
        ctx.fillStyle = "#940d0d";
        ctx.arc(u(0.5), u(0.5), u(0.035), 0, 2*Math.PI);
        ctx.lineTo(u(0.5), u(0.5));
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "#1b7d35";
        ctx.arc(u(0.5), u(0.5), u(0.014), 0, 2*Math.PI);
        ctx.lineTo(u(0.5), u(0.5));
        ctx.fill();
        ctx.closePath();

        // Draw lines
        // for(let i = 0; i < 20; i++) {
        //     ctx.beginPath();
        //     ctx.strokeStyle = "#ffffff";
        //     ctx.lineTo(u(0.5 + 0.07*Math.cos(start_angle + i*field_width)), u(0.5 + 0.07*Math.sin(start_angle + i*field_width)));
        //     ctx.lineTo(u(0.5 + 0.377*Math.cos(start_angle + i*field_width)), u(0.5 + 0.377*Math.sin(start_angle + i*field_width)));
        //     ctx.stroke();
        //     ctx.closePath();
        // }
    }

};

const dbr = new DartBoardRenderer(document.getElementById('canvas'));

setup();
dbr.on_click = score => alert("Hit: " + score);
dbr.render();