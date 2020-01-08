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
                <!-- <button @click='removeFromCart'>Remove from Cart</button> -->

                <div class="cart">
                    <p>Cart({{cart}})</p>
                </div>
                
                <!-- <a :href="link" target="_blank">More products like this</a> -->
            </div>
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
                        vairantQuantity: 0
                    }
                ],
                cart: 0,
                // sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']
                onSale: true
                // link: 'https://www.amazon.com/s?k=green+socks&ref=nb_sb_noss'
            }
    },
            methods: {
                addToCart() {
                    this.cart += 1
                },
                updateProduct(variantImage) {
                    this.image = variantImage
                },
                removeFromCart() {
                    this.cart -= 1
                },
                updateProduct(index) {
                    this.selectedVariant = index
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
        premium: false
    }
})