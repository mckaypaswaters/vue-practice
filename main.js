Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if='errors.length'>
        <b> Please correct the following error(s):</b>
        <ul>
            <li v-for='error in errors'> {{error}}</li>
        </ul>
    </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review" ></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <label for='recommend'>Would you recommend this product?(y/n)</label>
        <select id='recommend' v-model='recommend'>
            <option></option>
            <option>Yes</option>
            <option>No</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data() {
        return {
            name: null,
            rating: null,
            review: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            }
            else {
                if (!this.name) this.errors.push('Name required')
                if (!this.review) this.errors.push('Review required')
                if (!this.rating) this.errors.push('Rating required')
                if (!this.recommend) this.errors.push('Recommendation required')
            }
        }
    }
})



Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for='detail in details'>{{detail}}</li>
        </ul>
    `
})



Vue.component('product', {
    props: {
        premium: {
        type: Boolean,
        required: true
        }
    },
    template: `
    <div class="product">
            <div class="product-image">
                <img v-bind:src='image' alt="">
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if='inStock'>In Stock</p>
                <p v-else :class='{outOfStock: !inStock}'>Out of Stock</p>
                <p>{{sale}}</p>
                <p>Shipping: {{shipping}}</p>

                <product-details :details='details'></product-details>

                <!-- <ul>
                    <li v-for='size in sizes'>{{size}}</li>
                </ul> -->
                
                <div v-for='(variant, index) in variants' 
                    :key='variant.variantId'
                    class='color-box'
                    :style='{ backgroundColor: variant.variantColor }'
                    @mouseover='updateProduct(index)'>
                </div>

                <button v-on:click='addToCart' 
                :disabled='!inStock'
                :class='{disabledButton: !inStock}'>Add to Cart</button>
                <button @click='removeFromCart'>Remove from Cart</button>

                
                
                <!-- <a :href="link" target="_blank">More products like this</a> -->
            </div>

            <div>
                <h2>Reviews</h2>
                <p v-if='!reviews.length'>There are no reviews yet</p>
                <ul>
                    <li v-for='review in reviews'>
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    <p>Recommended?: {{review.recommend}}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted='addReview'></product-review>

    </div>
    `,
    data() {
        return {
                brand: 'Vue Mastery',
                product: 'Socks',
                selectedVariant: 0,
                details: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
                variants: [
                    {
                        variantId: 2234,
                        variantColor: 'green',
                        variantImage: './assets/vmSocks-green-onWhite.jpg',
                        vairantQuantity: 10
                    },
                    {
                        variantId: 2235,
                        variantColor: 'blue',
                        variantImage: './assets/vmSocks-blue-onWhite.jpg',
                        vairantQuantity: 10
                    }
                ],
                // sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
                onSale: true,
                reviews: []
                // link: 'https://www.amazon.com/s?k=green+socks&ref=nb_sb_noss'
            }
    },
            methods: {
                addToCart() {
                    this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
                },
                updateProduct(variantImage) {
                    this.image = variantImage
                },
                removeFromCart() {
                    this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
                },
                updateProduct(index) {
                    this.selectedVariant = index
                },
                addReview(productReview) {
                    this.reviews.push(productReview)
                }
            },
            computed: {
                title() {
                    return this.brand + ' ' + this.product
                },
                image() {
                    return this.variants[this.selectedVariant].variantImage
                },
                inStock() {
                    return this.variants[this.selectedVariant].vairantQuantity
                },
                sale() {
                    if (this.onSale){
                        return `${this.brand} ${this.product} are on sale!`
                    }
                        return `${this.brand} ${this.product} are not on sale`
                },
                shipping() {
                    if (this.premium){
                        return 'Free'
                    }
                    else return '2.99'
                }
            }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for (var i = this.cart.length - 1; i >= 0; i--){
                if (this.cart[i] === id){
                    this.cart.splice(i, 1)
                }
            }
        }
    }
})