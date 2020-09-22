const url1 = "https://www.reddit.com/r/drawing/.json?limit=30"
const url2 = "https://www.reddit.com/r/wallpaper/.json?limit=30"
const recherche = new RegExp(/(http|https):\/\/.*\.(jpg|png|gif|jpeg|webp)/, "g")
let currentIndex = 0

let vue = new Vue({
    el: '#app',
    data() {
        return {
            active: [],
            isActive: 0,
            thumbnails1: [],
            thumbnails2: [],
            thumbnails: [],
            titre: [],
            auteur: [],
            liens: [],
            isLoading: true,
            gifLoad: "./images/loading.gif",
            style: {
                transform: "translate(0px)"
            },
        }
    },

    methods: {
        load() {
            this.isLoading = true
            setTimeout(() => {
              this.isLoading = false
            },2000)
        },

        shuffle() {
            return this.thumbnails.sort(function(){return 0.5 - Math.random()});
        },

        toggleClass(index) {
            this.isActive = index
        },

        precedent() {
            currentIndex += 162
            this.style = {transform: "translateX(" + currentIndex + "px)"}
        },

        suivant() {
            currentIndex += -162
            this.style = {transform: "translateX(" + currentIndex + "px)"}
        },
    }, //methods

    mounted() {
        fetch(url1).then(resp => {
            resp.json().then(resultat =>{
                for (let i = 0; i < resultat.data.children.length; i++) {
                this.thumbnails1.push([resultat.data.children[i].data.thumbnail, resultat.data.children[i].data.title, resultat.data.children[i].data.author, resultat.data.children[i].data.url])
            }
            })
        }).then(fetch(url2).then(resp => {
            resp.json().then(resultat => {
                for (let i = 0; i < resultat.data.children.length; i++) {
                    this.thumbnails2.push([resultat.data.children[i].data.thumbnail, resultat.data.children[i].data.title, resultat.data.children[i].data.author, resultat.data.children[i].data.url])
                    console.log(resultat.data.children[i].data.url.indexOf(recherche))
                }
                this.thumbnails = this.thumbnails1.concat(this.thumbnails2)

                this.shuffle(this.thumbnails)
                this.active = this.thumbnails[0][3]
                this.titre = this.thumbnails[0][1]
                this.auteur = this.thumbnails[0][2]
                this.liens = this.thumbnails[0][3]
                this.isLoading = false
            })
        }))
    } //mounted
})