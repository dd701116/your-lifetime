const range = {
    start: null,
    end: null,
    lock: false,
    clone: function () {
      return {start:this.start, end:this.end}  
    },
    set: function (item, prefix= "wt-") {
        if (this.start!==null && !this.lock) {
            this.end = parseInt(item.split(prefix)[1])
        }else if(!this.lock){
            this.start = parseInt(item.split(prefix)[1])
        }

        if (this.start!==null && this.end!==null && !this.lock) {
            let min = Math.min(this.start, this.end)
            let max = Math.max(this.start, this.end)
            this.start = min;
            this.end = max;
            this.select()
        }
    },
    select: function (prefix = "wt-", reverse = false) {
        for (let index = this.start; index <= this.end; index++) {
            const element = document.getElementById(`${prefix}${index}`)
            if (reverse) {
                element.classList.remove("selected")
            } else {
                element.classList.add("selected")
            }
        }
        if (reverse) {
            this.lock = false
        } else {
            this.lock = true
        }
    },
    unSelect: function (prefix = "wt-") {
        this.select(prefix, true);
    },
    apply: function (color, prefix = "wt-") {
        if (this.lock) {
            for (let index = this.start; index <= this.end; index++) {
                const element = document.getElementById(`${prefix}${index}`)
                element.classList.add("marked")
                element.style.backgroundColor = color
            }
            this.reset()
        }
    },
    reset: function (prefix = "wt-") {
        const elementStart = document.getElementById(`${prefix}${this.start}`)
        const elementEnd = document.getElementById(`${prefix}${this.end}`)
        elementStart.classList.remove("click")
        elementEnd.classList.remove("click")
        this.unSelect()
        this.start = null
        this.end = null
    }
}

const weektimeItems = document.getElementsByClassName("weektime");
[...weektimeItems].forEach(item => {
    item.onclick  = (event) => {
        if (!range.lock) {
            const element = document.getElementById(event.target.id)
            element.classList.add("click")
            range.set(event.target.id);
        }
        console.log("click => ", event.target, "range: ", range);
    }
});