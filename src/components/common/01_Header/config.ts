import {BASE_URL} from "../../../config";


export type NavLink = {
    id?: number,
    url?: string,
    name: string,
    sub?: NavLink[]
}

 export const autoClubLinks: NavLink[] = [
    {name: 'Правила клуба', url: BASE_URL + 'autoclub/angel/pravila-kluba.html'},
    {name: 'Вакансии', url: BASE_URL + 'autoclub/angel/club-vacancy.html'},
    {name: 'Вступление в клуб', url: BASE_URL + 'autoclub/club-cards/kak-vstupit.html'},
    {name: 'Продление клубной карты', url: BASE_URL + 'prolong.html'}
]

 export const autoServiceLinks: NavLink[] = [
    {name: 'Автосервис', url: BASE_URL + 'uslugi/drugie-uslugi/avtoservis.html'},
    {name: 'Автомойка', url: BASE_URL + 'uslugi/drugie-uslugi/avtomojka.html'},
    {name: 'Шиномонтаж', url: BASE_URL + 'uslugi/drugie-uslugi/zamena-koles.html'},
    {name: 'Диагностика двигателя', url: BASE_URL + 'uslugi/drugie-uslugi/zamena-svechey.html'},
    {
        name: 'Диагностика подвески',
        url: BASE_URL + 'uslugi/drugie-uslugi/diagnostika-podvesky.html'
    },
    {
        name: 'Диагностика электроники',
        url: BASE_URL + 'uslugi/drugie-uslugi/diagnostika-electroniki.html'
    },
    {name: 'Сезонное хранение шин', url: BASE_URL + 'uslugi/drugie-uslugi/xranenie-shin-new.html'}
]


 export const navLinks: NavLink[] = [
    {
      id: 1,  name: 'Автоклуб', sub: autoClubLinks
    },
    {
      id: 2,  name: 'Автосервис', sub: autoServiceLinks
    },
    {name:'Эвакуатор', url: BASE_URL + 'uslugi/evakuator.html'},
    {name:'Техпомощь', url: BASE_URL + 'uslugi/texpomoshh.html'},
    {name: 'Партнёры', url: BASE_URL + 'partneryi.html'},
    {name: 'Контакты', url: '#contacts'}

]
