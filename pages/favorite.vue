<template>
	<div class="fill-height">
		<h3 class="mb-4 text--subtitle">Favori İlanlarım</h3>
		<v-row class="d-none d-sm-flex">
			<v-col
				v-for="(ad, index) in ads"
				:key="index"
				cols="3"
				class="col-md-4 col-lg-3 col-sm-6 col-12 d-flex justify-center justify-md-start"
			>
				<item-card :favorite="true" :ads="ad" />
			</v-col>
		</v-row>
		<v-row
			v-for="(ad, index) in ads"
			:key="index"
			class="d-block d-sm-none px-3 pb-3"
		>
			<item-list :favorite="true" :ads="ad" />
		</v-row>
	</div>
</template>
<script>
import ItemCard from '@/components/ItemCard.vue'
import ItemList from '@/components/ItemList.vue'
export default {
	name: 'Favorite',
	components: {
		ItemCard,
		ItemList,
	},
	middleware: 'auth',

	data() {
		return {
			ads: [
				{
					title: 'Apple Orjinal Şarj Başlığı',
					price: '120TL',
					category: 'Teknoloji',
					campus: 'Farabi',
					image: 'https://img.letgo.com/images/2a/00/6f/f1/2a006ff155483ebdf0a951ad50a993fe.jpg?impolicy=img_384',
				},
				{
					title: 'HP Yazıcı Ve Fotokopi',
					price: '290 TL',
					category: 'Teknoloji',
					campus: 'Farabi',
					image: 'https://img.letgo.com/images/6a/45/ec/72/6a45ec724d7a590e94f80dc942b35a29.jpg?impolicy=img_384',
				},
				{
					title: 'KONSOL',
					price: '1.750 TL',
					category: 'Dolap',
					campus: 'İbn-i Sina',
					image: 'https://img.letgo.com/images/bd/a1/90/9f/bda1909f28150ffaeaa5004ecd389348.jpeg?impolicy=img_384',
				},
				{
					title: 'SALON TAKIMI İMALATTAN ŞOOK KAMPANYA',
					price: '4.999 TL',
					category: 'Koltuk',
					campus: 'Çaycuma',
					image: 'https://img.letgo.com/images/b5/74/f0/8a/b574f08acf886c4159739b4d781767b1.jpeg?impolicy=img_384',
				},
				{
					title: '4 Kapaklı Dolap',
					price: '800 TL',
					category: 'Dolap',
					campus: 'Farabi',
					image: 'https://img.letgo.com/images/83/bc/87/d8/83bc87d817df9284b5633a22b6a18ebe.jpeg?impolicy=img_384',
				},
				{
					title: 'BEKO 8 KG A+ DİGİTAL 9 PROGRAM LI ÇOK TEMİZ ÇAMAŞIR MAKİNASI',
					price: '3.500 TL',
					category: 'Çamaşır Makinası',
					campus: 'Farabi',
					image: 'https://img.letgo.com/images/9d/a1/d0/e1/9da1d0e1295ca0a06c6aec72925babd5.jpeg?impolicy=img_384',
				},
				{
					title: 'ÇİFT KİŞİLİK DERİ BAZA BAŞLIĞI 1.50',
					price: '140 TL',
					category: 'Yatak & Baza',
					campus: 'İbn-i Sina',
					image: 'https://img.letgo.com/images/07/6b/8d/23/076b8d23a551a1c6983ccada325249dc.jpeg?impolicy=img_384',
				},
				{
					title: '4 Metre Kare',
					price: '300 TL',
					category: 'Diğer',
					campus: 'Çaycuma',
					image: 'https://img.letgo.com/images/f0/6f/91/2f/f06f912f191b76221e7e1eec230de6bd.jpeg?impolicy=img_384',
				},
				{
					title: 'Hp Pavilion G6 Ssd Diskli Ekran Kartlı İş Laptopu',
					price: '2.750 TL',
					category: 'Teknoloji',
					campus: 'Farabi',
					image: 'https://img.letgo.com/images/8f/29/ab/a7/8f29aba7f36736100e47db849c0585e1.jpeg?impolicy=img_384',
				},
			],
		}
	},
	mounted() {
		this.$vuetify.goTo(0)
	},
}
</script>
