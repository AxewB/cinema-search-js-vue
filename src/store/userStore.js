import { defineStore } from "pinia";
// user store for favourites and maybe other lists
//
export const useUserStore = defineStore("user", {
  state: () => ({
    favourites: [],
    // There will be stored all id's and everything that user decides to do with it (his rating on film, commentary etc.)

    //example:
    //films: {
    //  id1: {
    //    favourites: true,
    //    rating: 5,
    //    commentary: "cool film",
    //    film: object of film itself,
    //    status: 'watching' // can be 'watching', 'plans', 'completed', 'abandoned'
    //  }
    //}
    films: {
      328: {
        favourite: false,
        commentary: "",
        film: {
          externalId: {
            kpHD: "4b1c140be7efc668a518bb8718ba159f",
            imdb: "tt0120737",
            tmdb: 120,
            _id: "6376b9987ad98299ff93e87a",
          },
          logo: {
            _id: "62f147690f5be412469c023d",
            url: "https://avatars.mds.yandex.net/get-ott/1531675/2a000001714e8c3b6a57d19aebf13bcafe4f/orig",
          },
          poster: {
            _id: "63397dc6c22d011bb58782fe",
            url: "https://st.kp.yandex.net/images/film_big/328.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_328.jpg",
          },
          rating: {
            kp: 8.602,
            imdb: 8.8,
            filmCritics: 8.2,
            russianFilmCritics: 71.4286,
            await: 0,
            _id: "63e8752368d824d6ca8a13e4",
          },
          votes: {
            kp: 603640,
            imdb: 1888313,
            filmCritics: 234,
            russianFilmCritics: 7,
            await: 0,
            _id: "63e8752368d824d6ca8a13e5",
          },
          watchability: { items: null, _id: "63ae82176b290d775ee2e267" },
          movieLength: 178,
          id: 328,
          type: "movie",
          name: "Властелин колец: Братство Кольца",
          description:
            "Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал неограниченную власть, но был обязан служить злу. \n\nТихая деревня, где живут хоббиты. Придя на 111-й день рождения к своему старому другу Бильбо Бэггинсу, волшебник Гэндальф начинает вести разговор о кольце, которое Бильбо нашел много лет назад. Это кольцо принадлежало когда-то темному властителю Средиземья Саурону, и оно дает большую власть своему обладателю. Теперь Саурон хочет вернуть себе власть над Средиземьем. Бильбо отдает Кольцо племяннику Фродо, чтобы тот отнёс его к Роковой Горе и уничтожил.",
          year: 2001,
          alternativeName: "The Lord of the Rings: The Fellowship of the Ring",
          enName: null,
          names: [
            {
              _id: "63397dc6c22d011bb58782fa",
              name: "Властелин колец: Братство Кольца",
            },
            {
              _id: "63397dc6c22d011bb58782fb",
              name: "The Lord of the Rings: The Fellowship of the Ring",
            },
          ],
          shortDescription:
            "Фродо Бэггинс отправляется спасать Средиземье. Первая часть культовой фэнтези-трилогии Питера Джексона",
          releaseYears: [],
        },
        status: "Смотрю",
      },
      370: {
        favourite: true,
        commentary: "",
        film: {
          externalId: {
            kpHD: "4726854ee2be6d928a2d852281fa18f9",
            imdb: "tt0245429",
            tmdb: 129,
            _id: "6376b9b87ad98299ff9651a3",
          },
          logo: {
            _id: "62f051b90f5be412460547a1",
            url: "https://avatars.mds.yandex.net/get-ott/1531675/2a00000173947e70f5a7e9d4ab80cf554ade/orig",
          },
          poster: {
            _id: "6339eb5d89ae969da213dafa",
            url: "https://st.kp.yandex.net/images/film_big/370.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_370.jpg",
          },
          rating: {
            kp: 8.476,
            imdb: 8.6,
            filmCritics: 8.6,
            russianFilmCritics: 100,
            await: 0,
            _id: "63e8739d68d824d6ca68ec04",
          },
          votes: {
            kp: 498101,
            imdb: 771960,
            filmCritics: 195,
            russianFilmCritics: 5,
            await: 0,
            _id: "63e8739d68d824d6ca68ec05",
          },
          watchability: {
            items: [
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                  _id: "63e8739d68d824d6ca68ec08",
                },
                name: "Okko",
                url: "https://okko.tv/movie/sen-to-chihiro-no-kamikakushi?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                _id: "63e8739d68d824d6ca68ec07",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                  _id: "63e8739d68d824d6ca68ec0a",
                },
                name: "Иви",
                url: "https://www.ivi.ru/watch/100076?utm_source=yandex&utm_medium=wizard",
                _id: "63e8739d68d824d6ca68ec09",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                  _id: "63e8739d68d824d6ca68ec0c",
                },
                name: "KION",
                url: "https://kion.ru/video/movie/601879570?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                _id: "63e8739d68d824d6ca68ec0b",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                  _id: "63e8739d68d824d6ca68ec0e",
                },
                name: "Wink",
                url: "https://wink.ru/media_items/146708518?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                _id: "63e8739d68d824d6ca68ec0d",
              },
            ],
            _id: "63e8739d68d824d6ca68ec06",
          },
          movieLength: 125,
          id: 370,
          type: "anime",
          name: "Унесённые призраками",
          description:
            "Тихиро с мамой и папой переезжает в новый дом. Заблудившись по дороге, они оказываются в странном пустынном городе, где их ждет великолепный пир. Родители с жадностью набрасываются на еду и к ужасу девочки превращаются в свиней, став пленниками злой колдуньи Юбабы. Теперь, оказавшись одна среди волшебных существ и загадочных видений, Тихиро должна придумать, как избавить своих родителей от чар коварной старухи.",
          year: 2001,
          alternativeName: "Sen to Chihiro no kamikakushi",
          enName: null,
          names: [
            { _id: "6339eb5d89ae969da213daf6", name: "Унесённые призраками" },
            {
              _id: "6339eb5d89ae969da213daf7",
              name: "Sen to Chihiro no kamikakushi",
            },
          ],
          shortDescription:
            "Девочка должна спасти своих родителей в мире духов. Шедевр Хаяо Миядзаки, фаворит анимационных рейтингов мира",
          releaseYears: [],
        },
        status: "Смотрю",
      },
      430: {
        favourite: false,
        commentary: "",
        film: {
          externalId: {
            kpHD: "4ad80bb0eadac154a255cbd395e093e9",
            imdb: "tt0126029",
            tmdb: 808,
            _id: "6376b99d7ad98299ff944c96",
          },
          logo: {
            _id: "62f463dd252c8469ef5e08b2",
            url: "https://avatars.mds.yandex.net/get-ott/1672343/2a000001706322b7aab311a80769a58e93d4/orig",
          },
          poster: {
            _id: "633977a0c22d011bb564906a",
            url: "https://st.kp.yandex.net/images/film_big/430.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_430.jpg",
          },
          rating: {
            kp: 8.104,
            imdb: 7.9,
            filmCritics: 7.8,
            russianFilmCritics: 0,
            await: 0,
            _id: "63e8751868d824d6ca88f0b4",
          },
          votes: {
            kp: 613204,
            imdb: 687084,
            filmCritics: 211,
            russianFilmCritics: 0,
            await: 0,
            _id: "63e8751868d824d6ca88f0b5",
          },
          watchability: {
            items: [
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                  _id: "63e8751868d824d6ca88f0be",
                },
                name: "Okko",
                url: "https://okko.tv/movie/shrek?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                _id: "63e8751868d824d6ca88f0bd",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                  _id: "63e8751868d824d6ca88f0c0",
                },
                name: "Иви",
                url: "https://www.ivi.ru/watch/99983?utm_source=yandex&utm_medium=wizard",
                _id: "63e8751868d824d6ca88f0bf",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                  _id: "63e8751868d824d6ca88f0c2",
                },
                name: "KION",
                url: "https://kion.ru/video/movie/160222045?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                _id: "63e8751868d824d6ca88f0c1",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                  _id: "63e8751868d824d6ca88f0c4",
                },
                name: "PREMIER",
                url: "https://premier.one/show/16507?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                _id: "63e8751868d824d6ca88f0c3",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                  _id: "63e8751868d824d6ca88f0c6",
                },
                name: "Wink",
                url: "https://wink.ru/media_items/74302696?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                _id: "63e8751868d824d6ca88f0c5",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                  _id: "63e8751868d824d6ca88f0c8",
                },
                name: "viju",
                url: "https://viju.ru/filmy/shrek?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                _id: "63e8751868d824d6ca88f0c7",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                  _id: "63e8751868d824d6ca88f0ca",
                },
                name: "Смотрёшка",
                url: "https://smotreshka.tv/vod/vipplay/618e0564bb003f90038b39c1?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                _id: "63e8751868d824d6ca88f0c9",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                  _id: "63e8751868d824d6ca88f0cc",
                },
                name: "НТВ-ПЛЮС Онлайн ТВ",
                url: "https://ntvplus.tv/watch/17575-shrek?utm_source=kinopoisk",
                _id: "63e8751868d824d6ca88f0cb",
              },
            ],
            _id: "63e8751868d824d6ca88f0bc",
          },
          movieLength: 90,
          id: 430,
          type: "cartoon",
          name: "Шрэк",
          description:
            "Жил да был в сказочном государстве большой зеленый великан по имени Шрэк. Жил он в гордом одиночестве в лесу, на болоте, которое считал своим. Но однажды злобный коротышка — лорд Фаркуад, правитель волшебного королевства, безжалостно согнал на Шрэково болото всех сказочных обитателей.\n\nИ беспечной жизни зеленого великана пришел конец. Но лорд Фаркуад пообещал вернуть Шрэку болото, если великан добудет ему прекрасную принцессу Фиону, которая томится в неприступной башне, охраняемой огнедышащим драконом.",
          year: 2001,
          alternativeName: "Shrek",
          enName: null,
          names: [
            { _id: "633977a0c22d011bb5649066", name: "Шрэк" },
            { _id: "633977a0c22d011bb5649067", name: "Shrek" },
          ],
          shortDescription:
            "Огр-мизантроп спасает принцессу, чтобы вернуть свое болото. Революционная анимация о том, что красота — внутри",
          releaseYears: [],
        },
        status: "Смотрю",
      },
      41520: {
        favourite: false,
        commentary: "",
        film: {
          externalId: {
            kpHD: "4e2111b36611a21e87e293af0b7e7ee1",
            imdb: "tt0238883",
            tmdb: 20993,
            _id: "6376b98c7ad98299ff930aef",
          },
          logo: {
            _id: "62ed6749b252103987db22c5",
            url: "https://avatars.mds.yandex.net/get-ott/1652588/2a0000016f12f895b05320538df47aca46c8/orig",
          },
          poster: {
            _id: "63397c16c22d011bb57ed6c1",
            url: "https://st.kp.yandex.net/images/film_big/41520.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_41520.jpg",
          },
          rating: {
            kp: 8.172,
            imdb: 7.7,
            filmCritics: 0,
            russianFilmCritics: 0,
            await: 0,
            _id: "63e87bfa68d824d6ca02b769",
          },
          votes: {
            kp: 794197,
            imdb: 15794,
            filmCritics: 0,
            russianFilmCritics: 1,
            await: 0,
            _id: "63e87bfa68d824d6ca02b76a",
          },
          watchability: {
            items: [
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                  _id: "63e87bfa68d824d6ca02b76e",
                },
                name: "Иви",
                url: "https://www.ivi.ru/watch/33560?utm_source=yandex&utm_medium=wizard",
                _id: "63e87bfa68d824d6ca02b76d",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                  _id: "63e87bfa68d824d6ca02b770",
                },
                name: "KION",
                url: "https://kion.ru/video/movie/284327155?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                _id: "63e87bfa68d824d6ca02b76f",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                  _id: "63e87bfa68d824d6ca02b772",
                },
                name: "PREMIER",
                url: "https://premier.one/show/9759?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                _id: "63e87bfa68d824d6ca02b771",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                  _id: "63e87bfa68d824d6ca02b774",
                },
                name: "Триколор Кино и ТВ",
                url: "https://kino.tricolor.tv/watch/brat-2-2000/?utm_source=yandex&utm_medium=feed",
                _id: "63e87bfa68d824d6ca02b773",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                  _id: "63e87bfa68d824d6ca02b776",
                },
                name: "Wink",
                url: "https://wink.ru/media_items/72533208?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                _id: "63e87bfa68d824d6ca02b775",
              },
            ],
            _id: "63e87bfa68d824d6ca02b76c",
          },
          id: 41520,
          type: "movie",
          name: "Брат 2",
          description:
            "Участвуя в программе на телевидении, Данила Багров встречает своих друзей по службе Чечне. Одного из них внезапно убивают. Выясняется, что у того были неприятности из-за брата-хоккеиста в Америке. Данила должен разобраться. Он вылетает в Америку и за компанию берёт с собой старшего брата.",
          year: 2000,
          alternativeName: null,
          enName: null,
          movieLength: 127,
          names: [{ _id: "63397c16c22d011bb57ed6be", name: "Брат 2" }],
          shortDescription:
            "Американцы знакомятся с Данилой Багровым и узнают, в чем сила. Сиквел о герое времени с мощным рок-саундтреком\n",
          releaseYears: [],
        },
        status: "Просмотрено",
      },
      88173: {
        favourite: false,
        commentary: "",
        film: {
          externalId: {
            kpHD: "4a146071bec0e165a754f4963224587b",
            imdb: "tt0437086",
            tmdb: 399579,
            _id: "6376b9b27ad98299ff95e180",
          },
          logo: {
            _id: "62efe7710f5be41246c1be04",
            url: "https://avatars.mds.yandex.net/get-ott/2439731/2a0000016e043c44553e85b35e5bce8ecc76/orig",
          },
          poster: {
            _id: "6339786bc22d011bb56b6ae7",
            url: "https://st.kp.yandex.net/images/film_big/88173.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_88173.jpg",
          },
          rating: {
            kp: 7.235,
            imdb: 7.3,
            filmCritics: 6.1,
            russianFilmCritics: 66.6667,
            await: 89.98,
            _id: "63e669cb68d824d6ca2a1a4e",
          },
          votes: {
            kp: 523449,
            imdb: 273307,
            filmCritics: 331,
            russianFilmCritics: 12,
            await: 34955,
            _id: "63e669cb68d824d6ca2a1a4f",
          },
          watchability: {
            items: [
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                  _id: "63e669cb68d824d6ca2a1a52",
                },
                name: "Okko",
                url: "https://okko.tv/movie/alita-battle-angel?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                _id: "63e669cb68d824d6ca2a1a51",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                  _id: "63e669cb68d824d6ca2a1a54",
                },
                name: "Иви",
                url: "https://www.ivi.ru/watch/138672?utm_source=yandex&utm_medium=wizard",
                _id: "63e669cb68d824d6ca2a1a53",
              },
            ],
            _id: "63e669cb68d824d6ca2a1a50",
          },
          id: 88173,
          type: "movie",
          name: "Алита: Боевой ангел",
          description:
            "Действие фильма происходит через 300 лет после Великой войны в XXVI веке. Доктор Идо находит останки женщины-киборга. После починки киборг ничего не помнит, но обнаруживает, что в состоянии пользоваться боевыми приемами киборгов. Начинаются поиски утерянных воспоминаний.",
          year: 2019,
          alternativeName: "Alita: Battle Angel",
          enName: null,
          movieLength: 121,
          names: [
            { _id: "6339786bc22d011bb56b6ae3", name: "Алита: Боевой ангел" },
            { _id: "6339786bc22d011bb56b6ae4", name: "Alita: Battle Angel" },
          ],
          shortDescription:
            "Девушка-киборг пытается раскрыть тайну своего происхождения. Боевик от Джеймса Кэмерона и Роберта Родригеса",
          releaseYears: [],
        },
        status: "Заброшено",
      },
      251733: {
        favourite: true,
        commentary: "",
        film: {
          externalId: {
            kpHD: "4ae8f7b627a55093b7a4f634dd2f9cc5",
            imdb: "tt0499549",
            tmdb: 19995,
            _id: "6376b97d7ad98299ff91c687",
          },
          logo: {
            _id: "62f59d28252c8469ef9da6e3",
            url: "https://avatars.mds.yandex.net/get-ott/2385704/2a00000176f1bb64212c9df414a8909c8f44/orig",
          },
          poster: {
            _id: "6339779fc22d011bb5647337",
            url: "https://st.kp.yandex.net/images/film_big/251733.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_251733.jpg",
          },
          rating: {
            kp: 7.967,
            imdb: 7.9,
            filmCritics: 7.4,
            russianFilmCritics: 75,
            await: 85.93,
            _id: "63e7f02f68d824d6ca07f81f",
          },
          votes: {
            kp: 936016,
            imdb: 1320224,
            filmCritics: 335,
            russianFilmCritics: 12,
            await: 38690,
            _id: "63e7f02f68d824d6ca07f820",
          },
          watchability: {
            items: [
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                  _id: "63e7f02f68d824d6ca07f828",
                },
                name: "Okko",
                url: "https://okko.tv/movie/avatar?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                _id: "63e7f02f68d824d6ca07f827",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                  _id: "63e7f02f68d824d6ca07f82a",
                },
                name: "Иви",
                url: "https://www.ivi.ru/watch/99906?utm_source=yandex&utm_medium=wizard",
                _id: "63e7f02f68d824d6ca07f829",
              },
            ],
            _id: "63e7f02f68d824d6ca07f826",
          },
          movieLength: 162,
          id: 251733,
          type: "movie",
          name: "Аватар",
          description:
            "Бывший морпех Джейк Салли прикован к инвалидному креслу. Несмотря на немощное тело, Джейк в душе по-прежнему остается воином. Он получает задание совершить путешествие в несколько световых лет к базе землян на планете Пандора, где корпорации добывают редкий минерал, имеющий огромное значение для выхода Земли из энергетического кризиса.",
          year: 2009,
          alternativeName: "Avatar",
          enName: null,
          names: [
            { _id: "6339779fc22d011bb5647333", name: "Аватар" },
            { _id: "6339779fc22d011bb5647334", name: "Avatar" },
          ],
          shortDescription:
            "Парализованный морпех становится мессией для жителей Пандоры. Самый кассовый фильм в истории кино\n",
          releaseYears: [],
        },
        status: "Заброшено",
      },
      420923: {
        favourite: true,
        commentary: "",
        film: {
          externalId: {
            kpHD: "4db90bea36e15d319bd62aafb769f487",
            imdb: "tt0988045",
            tmdb: 10528,
            _id: "6376b99a7ad98299ff940c98",
          },
          logo: {
            _id: "62f2e56c252c8469eff8b91c",
            url: "https://avatars.mds.yandex.net/get-ott/1672343/2a00000170ed76563839fe9830642b60c50b/orig",
          },
          poster: {
            _id: "6339779fc22d011bb564857f",
            url: "https://st.kp.yandex.net/images/film_big/420923.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_420923.jpg",
          },
          rating: {
            kp: 8.063,
            imdb: 7.6,
            filmCritics: 6.2,
            russianFilmCritics: 100,
            await: 83.06,
            _id: "63d70ddaf38219e94f6ff041",
          },
          votes: {
            kp: 609649,
            imdb: 640727,
            filmCritics: 249,
            russianFilmCritics: 8,
            await: 29388,
            _id: "63e7efd668d824d6ca020135",
          },
          watchability: { items: null, _id: "63ae5b1b6b290d775e547640" },
          movieLength: 128,
          id: 420923,
          type: "movie",
          name: "Шерлок Холмс",
          description:
            "Величайший в истории сыщик Шерлок Холмс вместе со своим верным соратником Ватсоном вступают в схватку, требующую нешуточной физической и умственной подготовки, ведь их враг представляет угрозу для всего Лондона.",
          year: 2009,
          alternativeName: "Sherlock Holmes",
          enName: null,
          names: [
            { _id: "6339779fc22d011bb564857b", name: "Шерлок Холмс" },
            { _id: "6339779fc22d011bb564857c", name: "Sherlock Holmes" },
          ],
          shortDescription:
            "Великий сыщик преследует воскресшего из мертвых чернокнижника. Бодрый детектив Гая Ричи, первая часть франшизы",
          releaseYears: [],
        },
        status: "Заброшено",
      },
      535341: {
        favourite: true,
        commentary: "",
        film: {
          externalId: {
            kpHD: "4127663ed234fa8584aeb969ceb02cd8",
            imdb: "tt1675434",
            tmdb: 77338,
            _id: "6376b9837ad98299ff922212",
          },
          logo: {
            _id: "62f767e7252c8469effb6268",
            url: "https://avatars.mds.yandex.net/get-ott/1531675/2a0000017f0262661cde61dc260cb86f7830/orig",
          },
          poster: {
            _id: "6339779fc22d011bb5646e03",
            url: "https://st.kp.yandex.net/images/film_big/535341.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg",
          },
          rating: {
            _id: "6339779fc22d011bb5646e01",
            kp: 8.805,
            imdb: 8.5,
            filmCritics: 6.8,
            russianFilmCritics: 100,
            await: 0,
          },
          votes: {
            kp: 1529613,
            imdb: 866329,
            filmCritics: 130,
            russianFilmCritics: 12,
            await: 15,
            _id: "63e7c63f68d824d6caf18e3b",
          },
          watchability: {
            items: [
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                  _id: "63e7c63f68d824d6caf18e85",
                },
                name: "Okko",
                url: "https://okko.tv/movie/intouchables?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                _id: "63e7c63f68d824d6caf18e84",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                  _id: "63e7c63f68d824d6caf18e87",
                },
                name: "START",
                url: "https://start.ru/watch/1-1?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=1-1",
                _id: "63e7c63f68d824d6caf18e86",
              },
            ],
            _id: "63e7c63f68d824d6caf18e83",
          },
          movieLength: 112,
          id: 535341,
          type: "movie",
          name: "1+1",
          description:
            "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.",
          year: 2011,
          alternativeName: "Intouchables",
          enName: null,
          names: [
            { _id: "6339779fc22d011bb5646dff", name: "1+1" },
            { _id: "6339779fc22d011bb5646e00", name: "Intouchables" },
          ],
          shortDescription:
            "Аристократ на коляске нанимает в сиделки бывшего заключенного. Искрометная французская комедия с Омаром Си",
          releaseYears: [],
        },
        status: "В планах",
      },
      835086: {
        favourite: true,
        commentary: "",
        film: {
          externalId: {
            kpHD: "422c2eeee174f1cda1d00737488edc1a",
            imdb: "tt1950186",
            tmdb: 359724,
            _id: "6376b9a27ad98299ff94b00f",
          },
          logo: {
            _id: "62f69ada252c8469efd1471b",
            url: "https://avatars.mds.yandex.net/get-ott/223007/2a000001701068309f9ea919c912ea2c9f41/orig",
          },
          poster: {
            _id: "6339803bc22d011bb5928de0",
            url: "https://st.kp.yandex.net/images/film_big/835086.jpg",
            previewUrl:
              "https://st.kp.yandex.net/images/film_iphone/iphone360_835086.jpg",
          },
          rating: {
            kp: 8.243,
            imdb: 8.1,
            filmCritics: 7.8,
            russianFilmCritics: 81.8182,
            await: 96.61,
            _id: "63e638ed68d824d6ca157fb8",
          },
          votes: {
            kp: 606270,
            imdb: 402227,
            filmCritics: 361,
            russianFilmCritics: 11,
            await: 13502,
            _id: "63e638ed68d824d6ca157fb9",
          },
          watchability: {
            items: [
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                  _id: "63e638ed68d824d6ca157fbc",
                },
                name: "Okko",
                url: "https://okko.tv/movie/ford-v-ferrari?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                _id: "63e638ed68d824d6ca157fbb",
              },
              {
                logo: {
                  url: "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                  _id: "63e638ed68d824d6ca157fbe",
                },
                name: "Иви",
                url: "https://www.ivi.ru/watch/215176?utm_source=yandex&utm_medium=wizard",
                _id: "63e638ed68d824d6ca157fbd",
              },
            ],
            _id: "63e638ed68d824d6ca157fba",
          },
          movieLength: 152,
          id: 835086,
          type: "movie",
          name: "Ford против Ferrari",
          description:
            "В начале 1960-х Генри Форд II принимает решение улучшить имидж компании и сменить курс на производство более модных автомобилей. После неудавшейся попытки купить практически банкрота Ferrari американцы решают бросить вызов итальянским конкурентам на трассе и выиграть престижную гонку 24 часа Ле-Мана. Чтобы создать подходящую машину, компания нанимает автоконструктора Кэррола Шэлби, а тот отказывается работать без выдающегося, но, как считается, трудного в общении гонщика Кена Майлза. Вместе они принимаются за разработку впоследствии знаменитого спорткара Ford GT40.",
          year: 2019,
          alternativeName: "Ford v Ferrari",
          enName: null,
          names: [
            { _id: "6339803bc22d011bb5928ddc", name: "Ford против Ferrari" },
            { _id: "6339803bc22d011bb5928ddd", name: "Ford v Ferrari" },
          ],
          shortDescription:
            "Автоконструктор и строптивый гонщик против непобедимых конкурентов. Биографическая драма о любви к скорости",
          releaseYears: [],
        },
        status: "В планах",
      },
    },
    lists: ['Все', "Смотрю", "В планах", "Просмотрено", "Заброшено"],

    filterSettings: {
      listName: 'Все',
      sortBy: 'name',
      sortDirection: 'ascending',
      onlyFavourites: false
    }
  }),
  getters: {
    isExists: (state) => {
      return (id) => {
        return !!state.films[id];
      };
    },
    /**
     * Проверяет, находится ли фильм с заданным id в избранных.
     *
     * @param {Object} state - Состояние
     * @param {number} id - Идентификатор фильма
     * @returns {boolean} - true, если фильм находится в избранных, в противном случае - false
     */
    isInFavourites: (state) => {
      return (id) => {
        return state.films[id] ? state.films[id].favourite : false;
      };
    },

    /** 
     * Возвращает массив фильмов, если фильтр "Только избранные" включен, 
     * а также фильтрует по выбранному списку.
     * 
     * @param {Object} state - Состояние приложения.
     * @returns {Array} - Отфильтрованный массив фильмов.
     */
    filmsArray(state) {
      let result = [];
      if (state.filterSettings.onlyFavourites)
        for (const value of Object.values(state.films)){
          if (value.favourite){
            if (state.filterSettings.listName !== 'Все') {
              if (value.status === state.filterSettings.listName){
                result.push(value.film)            
              }
            }
            else {
              result.push(value.film)            
            }
          }
        }
      else {
        for (const value of Object.values(state.films)){
          if (state.filterSettings.listName !== 'Все') {
            if (value.status === state.filterSettings.listName){
              result.push(value.film)            
            }
          }
          else {
            result.push(value.film)            
          }
        }
      }
      return result
    },
    /**
     * Фильтрует фильмы в соответствии с настройками фильтрации в состоянии.
     * 
     * @param {Object} state - Состояние 
     * @returns {Array} - Отфильтрованный массив фильмов.
     */
    filteredFilms(state) {
      const {sortBy, sortDirection} = state.filterSettings;
      const result = this.filmsArray.sort((a,b) => 
        (a[sortBy] > b[sortBy]) ? 1 : 
        ((b[sortBy] > a[sortBy]) ? -1 : 0)
      );
      if (sortDirection === 'descending'){
        result.reverse();
      }
      return result
    },
  },
  actions: {
    /**
     * Добавляет фильм в профиль пользователя.
     * 
     * @param {string} id - Идентификатор фильма.
     * @param {string} film - Объект с информацией о фильме.
     * @param {boolean} favourite - Флаг, является ли фильм избранным (по умолчанию false).
     * @param {string} commentary - Комментарий к фильму (по умолчанию "").
     */
    addFilmToProfile(id, film, favourite = false, commentary = "") {
      this.films[id] = {
        favourite,
        commentary,
        film,
        status: "В планах",
      };
    },
    /**
     * Удаляет фильм из профиля по его идентификатору.
     * @param {string} id - Идентификатор фильма.
     */
    removeFilmFromProfile(id) {
      delete this.films[id];
    },
    /**
     * Переключает избранное для фильма с указанным идентификатором.
     * 
     * Если фильм с указанным идентификатором уже существует, то меняет его статус "избранного".
     * 
     * Если фильм с указанным идентификатором не существует, 
     * то добавляет его в профиль и устанавливает статус "избранного".
     * 
     * @param {string} id - Идентификатор фильма
     * @param {Object} film - Объект фильма
     */
    toggleFilmFavourite(id, film = null) {
      if (this.films[id]) {
        this.films[id].favourite = !this.films[id].favourite;
      } else {
        this.addFilmToProfile(id, film, true);
      }
    },
  },
});
