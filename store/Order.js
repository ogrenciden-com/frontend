export const state = () => ({
	list: [
		{
			name: 'En yeni',
			slug: 'descending',
		},
		{
			name: 'En eski',
			slug: 'ascending',
		},
		{
			name: 'Fiyata göre artan (Önce düşük fiyat)',
			slug: 'asc',
		},
		{
			name: 'Fiyata göre azalan (Önce yüksek fiyat)',
			slug: 'desc',
		},
	],
})
