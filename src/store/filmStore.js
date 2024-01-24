import { defineStore } from 'pinia';
import { useUserStore } from './userStore';

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export const useFilmStore = defineStore('film', {
  state: () => ({
    data: {},
    films: {},
    filteringSettings: {
      rating: 0,
      name: '',
      year: null,
      length: 0
    },
    filterRange: [0, 25],
    sortBy: 'name', // name, rating, length, year
    sortDirection: 'ascending',
  }),
  getters: {
    filmsCount(state) {
      if (state.filteringSettings.name || state.filteringSettings.length || state.filteringSettings.rating || state.filteringSettings.year)
        return this.filteredFilms.length
      else
        return state.films.length
    },
    featuredFilm(state) {
      const index = getRandomInt(state.films.length)
      return state.films[index];
    },
    filteredFilms(state) {
      return state.films.filter((film) =>
          film.name.includes(state.filteringSettings.name) &&
          (state.filteringSettings.rating ? film.rating.kp >= state.filteringSettings.rating : true) &&
          (state.filteringSettings.length ? film.movieLength <= state.filteringSettings.length : true)  &&
          (state.filteringSettings.year ? film.year === state.filteringSettings.year : true)
        )
    },
    sortedNFilteredByField(state) {
      const result = this.filteredFilms.sort((a,b) => (a[state.sortBy] > b[state.sortBy]) ? 1 : ((b[state.sortBy] > a[state.sortBy]) ? -1 : 0));
      if (state.sortDirection === 'descending')
        result.reverse();
      return result
    },
    sortedNFilteredByFieldRange(state){
      const result = this.filteredFilms.sort((a,b) => (a[state.sortBy] > b[state.sortBy]) ? 1 : ((b[state.sortBy] > a[state.sortBy]) ? -1 : 0));
      if (state.sortDirection === 'descending')
        result.reverse();
      return result.slice(state.filterRange[0], state.filterRange[1])
    },
    filmsYearRange(state) {
      let begin = 2024;
      let end = 0;
      state.films.forEach((film) => {
        begin = begin > film.year ? film.year : begin;
        end = end < film.year ? film.year : end;
      })
      
      let rangeArray = []
      for (let i = begin; i <= end; i++)
        rangeArray.push(i)
      
      return rangeArray
    },

    favouriteFilms(state) {
      const user = useUserStore();
      const userFavourites = user.favourites;
      let result = this.films.filter((el) => {
        return userFavourites.some((fav) => {
          return el.id === fav
        })
      })

      result = result.filter((film) =>
          film.name.includes(state.filteringSettings.name) &&
          (state.filteringSettings.rating ? film.rating.kp >= state.filteringSettings.rating : true) &&
          (state.filteringSettings.length ? film.movieLength <= state.filteringSettings.length : true)  &&
          (state.filteringSettings.year ? film.year === state.filteringSettings.year : true)
        )
      result = result.sort((a,b) => (a[state.sortBy] > b[state.sortBy]) ? 1 : ((b[state.sortBy] > a[state.sortBy]) ? -1 : 0));

      if (state.sortDirection === 'descending')
        result.reverse();

      return result
    }
  },
  actions: {
    filmsLoad() {
      this.data = {
        "docs": [
          {
            "externalId": {
              "kpHD": "4127663ed234fa8584aeb969ceb02cd8",
              "imdb": "tt1675434",
              "tmdb": 77338,
              "_id": "6376b9837ad98299ff922212"
            },
            "logo": {
              "_id": "62f767e7252c8469effb6268",
              "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a0000017f0262661cde61dc260cb86f7830/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5646e03",
              "url": "https://st.kp.yandex.net/images/film_big/535341.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_535341.jpg"
            },
            "rating": {
              "_id": "6339779fc22d011bb5646e01",
              "kp": 8.805,
              "imdb": 8.5,
              "filmCritics": 6.8,
              "russianFilmCritics": 100,
              "await": 0
            },
            "votes": {
              "kp": 1529613,
              "imdb": 866329,
              "filmCritics": 130,
              "russianFilmCritics": 12,
              "await": 15,
              "_id": "63e7c63f68d824d6caf18e3b"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7c63f68d824d6caf18e85"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/intouchables?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7c63f68d824d6caf18e84"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                    "_id": "63e7c63f68d824d6caf18e87"
                  },
                  "name": "START",
                  "url": "https://start.ru/watch/1-1?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=1-1",
                  "_id": "63e7c63f68d824d6caf18e86"
                }
              ],
              "_id": "63e7c63f68d824d6caf18e83"
            },
            "movieLength": 112,
            "id": 535341,
            "type": "movie",
            "name": "1+1",
            "description": "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.",
            "year": 2011,
            "alternativeName": "Intouchables",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5646dff",
                "name": "1+1"
              },
              {
                "_id": "6339779fc22d011bb5646e00",
                "name": "Intouchables"
              }
            ],
            "shortDescription": "Аристократ на коляске нанимает в сиделки бывшего заключенного. Искрометная французская комедия с Омаром Си",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "47649cf90de74aca8da7eb5b17fc8a8a",
              "imdb": "tt8367814",
              "tmdb": 522627,
              "_id": "6376b9787ad98299ff91685f"
            },
            "logo": {
              "_id": "62f5427d252c8469ef8b44f9",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a00000176f18064fd95abb74cbcc02873b8/orig"
            },
            "poster": {
              "_id": "6339eb5489ae969da213a33e",
              "url": "https://st.kp.yandex.net/images/film_big/1143242.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1143242.jpg"
            },
            "rating": {
              "kp": 8.536,
              "imdb": 7.8,
              "filmCritics": 6.5,
              "russianFilmCritics": 86.3636,
              "await": 97.92,
              "_id": "63e647b968d824d6ca7a0fbf"
            },
            "votes": {
              "kp": 1284199,
              "imdb": 347206,
              "filmCritics": 275,
              "russianFilmCritics": 22,
              "await": 13643,
              "_id": "63e647b968d824d6ca7a0fc0"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e647b968d824d6ca7a0fc4"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-gentlemen?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e647b968d824d6ca7a0fc3"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e647b968d824d6ca7a0fc6"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/169735638?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e647b968d824d6ca7a0fc5"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e647b968d824d6ca7a0fc8"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/dzhentlmeny-2019/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e647b968d824d6ca7a0fc7"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e647b968d824d6ca7a0fca"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/95724717?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e647b968d824d6ca7a0fc9"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/74a3af87-2bfa-4cdc-bc16-32a21114665b/orig",
                    "_id": "63e647b968d824d6ca7a0fcc"
                  },
                  "name": "МегаФон ТВ",
                  "url": "https://megafon.tv/movies/vods/Dzhentlmeny_2019?utm_source=yandex&utm_medium=wizard&utm_campaign=Dzhentlmeny_2019",
                  "_id": "63e647b968d824d6ca7a0fcb"
                }
              ],
              "_id": "63e647b968d824d6ca7a0fc2"
            },
            "movieLength": 113,
            "id": 1143242,
            "type": "movie",
            "name": "Джентльмены",
            "description": "Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.",
            "year": 2019,
            "alternativeName": "The Gentlemen",
            "enName": null,
            "names": [
              {
                "_id": "6339eb5489ae969da213a33a",
                "name": "Джентльмены"
              },
              {
                "_id": "6339eb5489ae969da213a33b",
                "name": "The Gentlemen"
              }
            ],
            "color": "#DBCCC2",
            "shortDescription": "Наркобарон хочет уйти на покой, но криминальный мир не отпускает. Успешное возвращение Гая Ричи к корням",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4d05a2c799d34ac9bb644af70c8e5dc1",
              "imdb": "tt0993846",
              "tmdb": 106646,
              "_id": "6376b9807ad98299ff91fcae"
            },
            "logo": {
              "_id": "62f041420f5be41246fb0998",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a00000178c64fe43f3b567acaaa73e861f0/orig"
            },
            "poster": {
              "_id": "633981a5c22d011bb5975a0a",
              "url": "https://st.kp.yandex.net/images/film_big/462682.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_462682.jpg"
            },
            "rating": {
              "kp": 7.959,
              "imdb": 8.2,
              "filmCritics": 7.8,
              "russianFilmCritics": 77.4194,
              "await": 96.62,
              "_id": "63e79a4968d824d6ca1162e6"
            },
            "votes": {
              "kp": 1035137,
              "imdb": 1428244,
              "filmCritics": 289,
              "russianFilmCritics": 31,
              "await": 43025,
              "_id": "63e79a4968d824d6ca1162e7"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e79a4968d824d6ca116494"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-wolf-of-wall-street?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e79a4968d824d6ca116493"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e79a4968d824d6ca116496"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/103304?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e79a4968d824d6ca116495"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e79a4968d824d6ca116498"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/377166559?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e79a4968d824d6ca116497"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e79a4968d824d6ca11649a"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/17016?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e79a4968d824d6ca116499"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e79a4968d824d6ca11649c"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/volk-s-uoll-strit-2013/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e79a4968d824d6ca11649b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e79a4968d824d6ca11649e"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/55004454?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e79a4968d824d6ca11649d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/74a3af87-2bfa-4cdc-bc16-32a21114665b/orig",
                    "_id": "63e79a4968d824d6ca1164a0"
                  },
                  "name": "МегаФон ТВ",
                  "url": "https://megafon.tv/movies/vods/Volk_s_uol_strit?utm_source=yandex&utm_medium=wizard&utm_campaign=Volk_s_uol_strit",
                  "_id": "63e79a4968d824d6ca11649f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e79a4968d824d6ca1164a2"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/volk-s-uoll-strit-2013?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e79a4968d824d6ca1164a1"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e79a4968d824d6ca1164a4"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/17926-volk-s-uoll-strit?utm_source=kinopoisk",
                  "_id": "63e79a4968d824d6ca1164a3"
                }
              ],
              "_id": "63e79a4968d824d6ca116492"
            },
            "movieLength": 180,
            "id": 462682,
            "type": "movie",
            "name": "Волк с Уолл-стрит",
            "description": "1987 год. Джордан Белфорт становится брокером в успешном инвестиционном банке. Вскоре банк закрывается после внезапного обвала индекса Доу-Джонса. По совету жены Терезы Джордан устраивается в небольшое заведение, занимающееся мелкими акциями. Его настойчивый стиль общения с клиентами и врождённая харизма быстро даёт свои плоды. Он знакомится с соседом по дому Донни, торговцем, который сразу находит общий язык с Джорданом и решает открыть с ним собственную фирму. В качестве сотрудников они нанимают нескольких друзей Белфорта, его отца Макса и называют компанию «Стрэттон Оукмонт». В свободное от работы время Джордан прожигает жизнь: лавирует от одной вечеринки к другой, вступает в сексуальные отношения с проститутками, употребляет множество наркотических препаратов, в том числе кокаин и кваалюд. Однажды наступает момент, когда быстрым обогащением Белфорта начинает интересоваться агент ФБР...",
            "year": 2013,
            "alternativeName": "The Wolf of Wall Street",
            "enName": null,
            "names": [
              {
                "_id": "633981a5c22d011bb5975a06",
                "name": "Волк с Уолл-стрит"
              },
              {
                "_id": "633981a5c22d011bb5975a07",
                "name": "The Wolf of Wall Street"
              }
            ],
            "color": "#CCA97B",
            "shortDescription": "Восхождение циника-гедониста на бизнес-олимп 1980-х. Блистательный тандем Леонардо ДиКаприо и Мартина Скорсезе",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "48de522f4bc591d7baa92c12ce435265",
              "imdb": "tt11083552",
              "tmdb": 637649,
              "_id": "6376b9797ad98299ff916986"
            },
            "logo": {
              "_id": "63364fc7248263ce89af8082",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a00000179d1cc14e6c741017c7f7a2f15c2/orig"
            },
            "poster": {
              "_id": "633987cec22d011bb5ac8cd8",
              "url": "https://st.kp.yandex.net/images/film_big/1318972.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1318972.jpg"
            },
            "rating": {
              "kp": 7.578,
              "imdb": 7.1,
              "filmCritics": 6.3,
              "russianFilmCritics": 72.973,
              "await": 98.09,
              "_id": "63cebe3457101ffd39df33ae"
            },
            "votes": {
              "kp": 999626,
              "imdb": 182576,
              "filmCritics": 256,
              "russianFilmCritics": 37,
              "await": 23496,
              "_id": "63e5e96e68d824d6ca6e9fbb"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e5e96e68d824d6ca6e9fbf"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/wrath-of-man?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e5e96e68d824d6ca6e9fbe"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e5e96e68d824d6ca6e9fc1"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/415690?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e5e96e68d824d6ca6e9fc0"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e5e96e68d824d6ca6e9fc3"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/351880139?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e5e96e68d824d6ca6e9fc2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e5e96e68d824d6ca6e9fc5"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/117557603?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e5e96e68d824d6ca6e9fc4"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/74a3af87-2bfa-4cdc-bc16-32a21114665b/orig",
                    "_id": "63e5e96e68d824d6ca6e9fc7"
                  },
                  "name": "МегаФон ТВ",
                  "url": "https://megafon.tv/movies/vods/Gnev_chelovecheskij_2021?utm_source=yandex&utm_medium=wizard&utm_campaign=Gnev_chelovecheskij_2021",
                  "_id": "63e5e96e68d824d6ca6e9fc6"
                }
              ],
              "_id": "63e5e96e68d824d6ca6e9fbd"
            },
            "movieLength": 119,
            "id": 1318972,
            "type": "movie",
            "name": "Гнев человеческий",
            "description": "Грузовики лос-анджелесской инкассаторской компании Fortico Security часто подвергаются нападениям, и во время очередного ограбления погибают оба охранника. Через некоторое время в компанию устраивается крепкий немногословный британец Патрик Хилл. Он получает от босса прозвище Эйч и, впритык к необходимому минимуму пройдя тесты по фитнесу, стрельбе и вождению, отправляется на первое задание. Вскоре и его грузовик пытаются ограбить вооруженные налётчики, но Эйч в одиночку расправляется с целой бандой и становится героем. Кажется, слава и уважение коллег его совершенно не интересуют, ведь он преследует свои цели.",
            "year": 2021,
            "alternativeName": "Wrath of Man",
            "enName": null,
            "names": [
              {
                "_id": "633987cec22d011bb5ac8cd4",
                "name": "Гнев человеческий"
              },
              {
                "_id": "633987cec22d011bb5ac8cd5",
                "name": "Wrath of Man"
              }
            ],
            "color": "#080810",
            "shortDescription": "Хмурый мужчина прикидывается инкассатором, чтобы выйти на грабителей. Гай Ричи и Джейсон Стэйтем снова вместе",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "492c446642bf8dc88f0abcb9a4b02f7f",
              "imdb": "tt0118767",
              "tmdb": 20992,
              "_id": "6376b9847ad98299ff92347e"
            },
            "logo": {
              "_id": "62f7244f252c8469efed6c5c",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a0000017c61da4f185f94d808f4d90182a8/orig"
            },
            "poster": {
              "_id": "63397c2bc22d011bb57f4de4",
              "url": "https://st.kp.yandex.net/images/film_big/41519.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_41519.jpg"
            },
            "rating": {
              "kp": 8.288,
              "imdb": 7.8,
              "filmCritics": 7.6,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e891dd68d824d6ca917d46"
            },
            "votes": {
              "kp": 975841,
              "imdb": 22270,
              "filmCritics": 5,
              "russianFilmCritics": 2,
              "await": 0,
              "_id": "63e891dd68d824d6ca917d47"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e891dd68d824d6ca917d88"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/brat?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e891dd68d824d6ca917d87"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e891dd68d824d6ca917d8a"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/33531?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e891dd68d824d6ca917d89"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e891dd68d824d6ca917d8c"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/284738273?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e891dd68d824d6ca917d8b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e891dd68d824d6ca917d8e"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/9764?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e891dd68d824d6ca917d8d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e891dd68d824d6ca917d90"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/70749607?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e891dd68d824d6ca917d8f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e891dd68d824d6ca917d92"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/brat?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e891dd68d824d6ca917d91"
                }
              ],
              "_id": "63e891dd68d824d6ca917d86"
            },
            "id": 41519,
            "type": "movie",
            "name": "Брат",
            "description": "Демобилизовавшись, Данила Багров вернулся в родной городок. Но скучная жизнь российской провинции не устраивала его, и он решился податься в Петербург, где, по слухам, уже несколько лет процветает его старший брат. Данила нашел брата. Но все оказалось не так просто — брат работает наемным убийцей.",
            "year": 1997,
            "alternativeName": null,
            "enName": null,
            "movieLength": 100,
            "names": [
              {
                "_id": "63397c2bc22d011bb57f4de1",
                "name": "Брат"
              }
            ],
            "shortDescription": "Дембель Данила Багров защищает слабых в Петербурге 1990-х. Фильм, сделавший Сергея Бодрова народным героем",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4ed0391f9e10d314aa0a7de2ea07bf55",
              "imdb": "tt0099785",
              "tmdb": 771,
              "_id": "6376b97e7ad98299ff91e994"
            },
            "logo": {
              "_id": "62f1887d0f5be41246c5396b",
              "url": "https://avatars.mds.yandex.net/get-ott/212840/2a00000172550ce8255397b4e3d6f9938ddf/orig"
            },
            "poster": {
              "_id": "6339797fc22d011bb570608e",
              "url": "https://st.kp.yandex.net/images/film_big/8124.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_8124.jpg"
            },
            "rating": {
              "kp": 8.275,
              "imdb": 7.7,
              "filmCritics": 5.8,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63d63c6bf38219e94f6ce39f"
            },
            "votes": {
              "kp": 965519,
              "imdb": 597675,
              "filmCritics": 62,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8d00668d824d6ca9eee28"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8d00668d824d6ca9eee30"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/home-alone?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8d00668d824d6ca9eee2f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8d00668d824d6ca9eee32"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/100008?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8d00668d824d6ca9eee31"
                }
              ],
              "_id": "63e8d00668d824d6ca9eee2e"
            },
            "movieLength": 103,
            "id": 8124,
            "type": "movie",
            "name": "Один дома",
            "description": "Американское семейство отправляется из Чикаго в Европу, но в спешке сборов бестолковые родители забывают дома... одного из своих детей. Юное создание, однако, не теряется и демонстрирует чудеса изобретательности. И когда в дом залезают грабители, им приходится не раз пожалеть о встрече с милым крошкой.",
            "year": 1990,
            "alternativeName": "Home Alone",
            "enName": null,
            "names": [
              {
                "_id": "6339797fc22d011bb570608a",
                "name": "Один дома"
              },
              {
                "_id": "6339797fc22d011bb570608b",
                "name": "Home Alone"
              }
            ],
            "shortDescription": "Мальчик-озорник задает жару грабителям. Лучшая комедия для создания праздничного настроения у всей семьи",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4ae8f7b627a55093b7a4f634dd2f9cc5",
              "imdb": "tt0499549",
              "tmdb": 19995,
              "_id": "6376b97d7ad98299ff91c687"
            },
            "logo": {
              "_id": "62f59d28252c8469ef9da6e3",
              "url": "https://avatars.mds.yandex.net/get-ott/2385704/2a00000176f1bb64212c9df414a8909c8f44/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5647337",
              "url": "https://st.kp.yandex.net/images/film_big/251733.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_251733.jpg"
            },
            "rating": {
              "kp": 7.967,
              "imdb": 7.9,
              "filmCritics": 7.4,
              "russianFilmCritics": 75,
              "await": 85.93,
              "_id": "63e7f02f68d824d6ca07f81f"
            },
            "votes": {
              "kp": 936016,
              "imdb": 1320224,
              "filmCritics": 335,
              "russianFilmCritics": 12,
              "await": 38690,
              "_id": "63e7f02f68d824d6ca07f820"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7f02f68d824d6ca07f828"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/avatar?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7f02f68d824d6ca07f827"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7f02f68d824d6ca07f82a"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/99906?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7f02f68d824d6ca07f829"
                }
              ],
              "_id": "63e7f02f68d824d6ca07f826"
            },
            "movieLength": 162,
            "id": 251733,
            "type": "movie",
            "name": "Аватар",
            "description": "Бывший морпех Джейк Салли прикован к инвалидному креслу. Несмотря на немощное тело, Джейк в душе по-прежнему остается воином. Он получает задание совершить путешествие в несколько световых лет к базе землян на планете Пандора, где корпорации добывают редкий минерал, имеющий огромное значение для выхода Земли из энергетического кризиса.",
            "year": 2009,
            "alternativeName": "Avatar",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5647333",
                "name": "Аватар"
              },
              {
                "_id": "6339779fc22d011bb5647334",
                "name": "Avatar"
              }
            ],
            "shortDescription": "Парализованный морпех становится мессией для жителей Пандоры. Самый кассовый фильм в истории кино\n",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "42d5ba8f195451fda78fe0ce899a964a",
              "imdb": "tt1375666",
              "tmdb": 27205,
              "_id": "6376b97c7ad98299ff91ad44"
            },
            "logo": {
              "_id": "62f4d67a252c8469ef75c057",
              "url": "https://avatars.mds.yandex.net/get-ott/200035/2a00000178c5fc5e63481655114331b766a3/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5646d06",
              "url": "https://st.kp.yandex.net/images/film_big/447301.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_447301.jpg"
            },
            "rating": {
              "_id": "6339779fc22d011bb5646d04",
              "kp": 8.662,
              "imdb": 8.8,
              "filmCritics": 8.1,
              "russianFilmCritics": 80.9524,
              "await": 87.61
            },
            "votes": {
              "kp": 900629,
              "imdb": 2371109,
              "filmCritics": 365,
              "russianFilmCritics": 21,
              "await": 42546,
              "_id": "63e7dc3068d824d6cafd5c24"
            },
            "watchability": {
              "items": null,
              "_id": "63ae54b86b290d775e1116c2"
            },
            "movieLength": 148,
            "id": 447301,
            "type": "movie",
            "name": "Начало",
            "description": "Кобб – талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна, когда человеческий разум наиболее уязвим. Редкие способности Кобба сделали его ценным игроком в привычном к предательству мире промышленного шпионажа, но они же превратили его в извечного беглеца и лишили всего, что он когда-либо любил. \n\nИ вот у Кобба появляется шанс исправить ошибки. Его последнее дело может вернуть все назад, но для этого ему нужно совершить невозможное – инициацию. Вместо идеальной кражи Кобб и его команда спецов должны будут провернуть обратное. Теперь их задача – не украсть идею, а внедрить ее. Если у них получится, это и станет идеальным преступлением. \n\nНо никакое планирование или мастерство не могут подготовить команду к встрече с опасным противником, который, кажется, предугадывает каждый их ход. Врагом, увидеть которого мог бы лишь Кобб.",
            "year": 2010,
            "alternativeName": "Inception",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5646d02",
                "name": "Начало"
              },
              {
                "_id": "6339779fc22d011bb5646d03",
                "name": "Inception"
              }
            ],
            "color": "#B5ACAC",
            "shortDescription": "Профессиональные воры внедряются в сон наследника огромной империи. Фантастический боевик Кристофера Нолана",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "49bf154f0dea2d53b169846a284469cd",
              "imdb": "tt0111161",
              "tmdb": 278,
              "_id": "6376b9787ad98299ff91570a"
            },
            "logo": {
              "_id": "62e1afaa028619ccaf522a29",
              "url": "https://avatars.mds.yandex.net/get-ott/1648503/2a000001705c8bf514c033f1019473a4caae/orig"
            },
            "poster": {
              "_id": "633fda189a21d94e9a4a0696",
              "url": "https://st.kp.yandex.net/images/film_big/326.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_326.jpg"
            },
            "rating": {
              "_id": "633fda189a21d94e9a4a0694",
              "kp": 9.108,
              "imdb": 9.3,
              "filmCritics": 8.4,
              "russianFilmCritics": 0,
              "await": 0
            },
            "votes": {
              "kp": 891473,
              "imdb": 2699528,
              "filmCritics": 82,
              "russianFilmCritics": 1,
              "await": 2,
              "_id": "63e8ace368d824d6ca9336b7"
            },
            "watchability": {
              "items": null,
              "_id": "63ae950c6b290d775eadf5a8"
            },
            "movieLength": 142,
            "id": 326,
            "type": "movie",
            "name": "Побег из Шоушенка",
            "description": "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки. Каждый, кто попадает в эти стены, становится их рабом до конца жизни. Но Энди, обладающий живым умом и доброй душой, находит подход как к заключённым, так и к охранникам, добиваясь их особого к себе расположения.",
            "year": 1994,
            "alternativeName": "The Shawshank Redemption",
            "enName": null,
            "names": [
              {
                "_id": "633fda189a21d94e9a4a0692",
                "name": "Побег из Шоушенка"
              },
              {
                "_id": "633fda189a21d94e9a4a0693",
                "name": "The Shawshank Redemption"
              }
            ],
            "shortDescription": "Несправедливо осужденный банкир готовит побег из тюрьмы. Тим Роббинс в выдающейся экранизации Стивена Кинга",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "415fe4a19e98cd349eec8733bdd26c2c",
              "imdb": "tt2948356",
              "tmdb": 269149,
              "_id": "6376b97a7ad98299ff91856e"
            },
            "logo": {
              "_id": "62f458d5252c8469ef5be3fb",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a00000178cab3087920b10e48325211c178/orig"
            },
            "poster": {
              "_id": "63397d0cc22d011bb583cfff",
              "url": "https://st.kp.yandex.net/images/film_big/775276.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_775276.jpg"
            },
            "rating": {
              "kp": 8.315,
              "imdb": 8,
              "filmCritics": 8.1,
              "russianFilmCritics": 100,
              "await": 95.49,
              "_id": "63d83049f38219e94f139680"
            },
            "votes": {
              "kp": 860111,
              "imdb": 506007,
              "filmCritics": 298,
              "russianFilmCritics": 14,
              "await": 18811,
              "_id": "63e71df468d824d6cafb8c9f"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e71df468d824d6cafb8ca3"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/zootopia?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e71df468d824d6cafb8ca2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e71df468d824d6cafb8ca5"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/134069?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e71df468d824d6cafb8ca4"
                }
              ],
              "_id": "63e71df468d824d6cafb8ca1"
            },
            "movieLength": 108,
            "id": 775276,
            "type": "cartoon",
            "name": "Зверополис",
            "description": "Добро пожаловать в Зверополис – современный город, населенный самыми разными животными, от огромных слонов до крошечных мышек. Зверополис разделен на районы, полностью повторяющие естественную среду обитания разных жителей – здесь есть и элитный район Площадь Сахары и неприветливый Тундратаун. В этом городе появляется новый офицер полиции, жизнерадостная зайчиха Джуди Хоппс, которая с первых дней работы понимает, как сложно быть маленькой и пушистой среди больших и сильных полицейских. Джуди хватается за первую же возможность проявить себя, несмотря на то, что ее партнером будет болтливый хитрый лис Ник Уайлд. Вдвоем им предстоит раскрыть сложное дело, от которого будет зависеть судьба всех обитателей Зверополиса.",
            "year": 2016,
            "alternativeName": "Zootopia",
            "enName": null,
            "names": [
              {
                "_id": "63397d0cc22d011bb583cffb",
                "name": "Зверополис"
              },
              {
                "_id": "63397d0cc22d011bb583cffc",
                "name": "Zootopia"
              }
            ],
            "shortDescription": "Отважная крольчиха делает карьеру в полиции звериного города. Оскароносная комедия с серьезным подтекстом",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "490bbf023060c574abeccac74e8ae98b",
              "imdb": "tt0070233",
              "tmdb": 20803,
              "_id": "6376b97d7ad98299ff91dd3e"
            },
            "logo": {
              "_id": "62f29c04252c8469efc9acbd",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a000001720d0315b85f00ffcf4f8472e93a/orig"
            },
            "poster": {
              "_id": "6339872fc22d011bb5aa5f51",
              "url": "https://st.kp.yandex.net/images/film_big/42664.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_42664.jpg"
            },
            "rating": {
              "kp": 8.784,
              "imdb": 8.2,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "638a8872ead58d1db7668ae9"
            },
            "votes": {
              "kp": 858290,
              "imdb": 17154,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e9266968d824d6ca362f14"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e9266968d824d6ca362f1a"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/ivan-vasilevich-menjaet-professiju?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e9266968d824d6ca362f19"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e9266968d824d6ca362f1c"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/53141?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e9266968d824d6ca362f1b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e9266968d824d6ca362f1e"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/599189140?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e9266968d824d6ca362f1d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e9266968d824d6ca362f20"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/14588?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e9266968d824d6ca362f1f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e9266968d824d6ca362f22"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/ivan-vasilevich-menyaet-professiyu-1973/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e9266968d824d6ca362f21"
                }
              ],
              "_id": "63e9266968d824d6ca362f18"
            },
            "id": 42664,
            "type": "movie",
            "name": "Иван Васильевич меняет профессию",
            "description": "Инженер-изобретатель Тимофеев сконструировал машину времени, которая соединила его квартиру с далеким шестнадцатым веком - точнее, с палатами государя Ивана Грозного. Туда-то и попадают тезка царя пенсионер-общественник Иван Васильевич Бунша и квартирный вор Жорж Милославский.\n\nНа их место в двадцатом веке «переселяется» великий государь. Поломка машины приводит ко множеству неожиданных и забавных событий...",
            "year": 1973,
            "alternativeName": null,
            "enName": null,
            "movieLength": 88,
            "names": [
              {
                "_id": "6339872fc22d011bb5aa5f4e",
                "name": "Иван Васильевич меняет профессию"
              }
            ],
            "shortDescription": "Иван Грозный отвечает на телефон, пока его тезка-пенсионер сидит на троне. Советский хит о липовом государе",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "42e511a460839b298d96effd8de60c68",
              "imdb": "tt0120689",
              "tmdb": 497,
              "_id": "6376b97b7ad98299ff919a65"
            },
            "logo": {
              "_id": "62e2a299028619ccafbb2a42",
              "url": "https://avatars.mds.yandex.net/get-ott/239697/2a0000016f12f1eb8870b609ee94313774b2/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5646d92",
              "url": "https://st.kp.yandex.net/images/film_big/435.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_435.jpg"
            },
            "rating": {
              "kp": 9.071,
              "imdb": 8.6,
              "filmCritics": 6.8,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63c5f3692b1609d6692fe8f4"
            },
            "votes": {
              "kp": 854755,
              "imdb": 1312165,
              "filmCritics": 136,
              "russianFilmCritics": 1,
              "await": 0,
              "_id": "63e89dc068d824d6ca658650"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e89dc068d824d6ca658653"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-green-mile?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e89dc068d824d6ca658652"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e89dc068d824d6ca658655"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/90283?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e89dc068d824d6ca658654"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e89dc068d824d6ca658657"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/16086?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e89dc068d824d6ca658656"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e89dc068d824d6ca658659"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/97644479?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e89dc068d824d6ca658658"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e89dc068d824d6ca65865b"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/zelenaya-milya?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e89dc068d824d6ca65865a"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e89dc068d824d6ca65865d"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/619c836bbb003f90030b40bd?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e89dc068d824d6ca65865c"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e89dc068d824d6ca65865f"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/23303-zelenaya-milya?utm_source=kinopoisk",
                  "_id": "63e89dc068d824d6ca65865e"
                }
              ],
              "_id": "63e89dc068d824d6ca658651"
            },
            "movieLength": 189,
            "id": 435,
            "type": "movie",
            "name": "Зеленая миля",
            "description": "Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.",
            "year": 1999,
            "alternativeName": "The Green Mile",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5646d8e",
                "name": "Зеленая миля"
              },
              {
                "_id": "6339779fc22d011bb5646d8f",
                "name": "The Green Mile"
              }
            ],
            "shortDescription": "В тюрьме для смертников появляется заключенный с божественным даром. Мистическая драма по роману Стивена Кинга",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "47bab88d43ac0a82ad62bfbbaf302e07",
              "imdb": "tt0944947",
              "tmdb": 1399,
              "_id": "6376b98d7ad98299ff93154e"
            },
            "logo": {
              "_id": "62e97fd4b2521039877198e0",
              "url": "https://avatars.mds.yandex.net/get-ott/239697/2a00000170b077ba4dca5c9303185c5e8003/orig"
            },
            "poster": {
              "_id": "6359aad5ecae54d82cb190da",
              "url": "https://st.kp.yandex.net/images/film_big/464963.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_464963.jpg"
            },
            "rating": {
              "kp": 8.981,
              "imdb": 9.2,
              "filmCritics": 0,
              "russianFilmCritics": 90,
              "await": 90.77,
              "_id": "63bbaec00b7d940e835d538d"
            },
            "votes": {
              "kp": 846899,
              "imdb": 2122794,
              "filmCritics": 0,
              "russianFilmCritics": 20,
              "await": 1970,
              "_id": "63e7c99768d824d6ca228a5b"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7c99768d824d6ca228dc2"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/serial/game-of-thrones?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7c99768d824d6ca228dc1"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7c99768d824d6ca228dc4"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/igra-prestolov-amedia?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7c99768d824d6ca228dc3"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e7c99768d824d6ca228dc6"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/serial/127267213/season/127268028/episode/643084837?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e7c99768d824d6ca228dc5"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/eae327fe-4d7b-4ea2-899a-6aaa54300784/orig",
                    "_id": "63e7c99768d824d6ca228dc8"
                  },
                  "name": "AMEDIATEKA",
                  "url": "https://amediateka.ru/watch/series_11223_finaligra-prestolov?utm_medium=referral&utm_source=yandex_search&utm_campaign=yandex_feed",
                  "_id": "63e7c99768d824d6ca228dc7"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/4e5f7a8e-d5ac-4904-9fc0-208753ccf520/orig",
                    "_id": "63e7c99768d824d6ca228dca"
                  },
                  "name": "Кино1ТВ",
                  "url": "https://kino.1tv.ru/serials/igra-prestolov?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7c99768d824d6ca228dc9"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e7c99768d824d6ca228dcc"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/23741628?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e7c99768d824d6ca228dcb"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e7c99768d824d6ca228dce"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/198-igra-prestolov?utm_source=kinopoisk",
                  "_id": "63e7c99768d824d6ca228dcd"
                }
              ],
              "_id": "63e7c99768d824d6ca228dc0"
            },
            "id": 464963,
            "alternativeName": "Game of Thrones",
            "description": "К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия власти Семи королевств, Железного трона, зреет заговор, и в это непростое время король решает искать поддержки у друга юности Эддарда Старка. В мире, где все — от короля до наемника — рвутся к власти, плетут интриги и готовы вонзить нож в спину, есть место и благородству, состраданию и любви. Между тем никто не замечает пробуждение тьмы из легенд далеко на Севере — и лишь Стена защищает живых к югу от нее.",
            "enName": "Game of Thrones",
            "movieLength": 55,
            "name": "Игра престолов",
            "names": [
              {
                "_id": "6359aad5ecae54d82cb190d6",
                "name": "Игра престолов"
              },
              {
                "_id": "6359aad5ecae54d82cb190d7",
                "name": "Game of Thrones"
              }
            ],
            "shortDescription": "Рыцари, мертвецы и драконы — в эпической битве за судьбы мира. Сериал, который навсегда изменил телевидение",
            "type": "tv-series",
            "year": 2011,
            "releaseYears": [
              {
                "_id": "6359aad5ecae54d82cb19454",
                "start": 2011,
                "end": 2019
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "4b6323adfb04e652a9b88f6096d01ae9",
              "imdb": "tt0816692",
              "tmdb": 157336,
              "_id": "6376b97a7ad98299ff9171ce"
            },
            "logo": {
              "_id": "62e973bdb25210398766c89b",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a0000016fae962c6bf6cc87fd2098ed9035/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb56473d8",
              "url": "https://st.kp.yandex.net/images/film_big/258687.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_258687.jpg"
            },
            "rating": {
              "kp": 8.617,
              "imdb": 8.6,
              "filmCritics": 7.1,
              "russianFilmCritics": 80.6452,
              "await": 97.55,
              "_id": "63d319de57101ffd39119fdb"
            },
            "votes": {
              "kp": 843467,
              "imdb": 1855840,
              "filmCritics": 373,
              "russianFilmCritics": 31,
              "await": 78053,
              "_id": "63e77cb168d824d6cae5fb45"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e77cb168d824d6cae5fb49"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/interstellar?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e77cb168d824d6cae5fb48"
                }
              ],
              "_id": "63e77cb168d824d6cae5fb47"
            },
            "movieLength": 169,
            "id": 258687,
            "type": "movie",
            "name": "Интерстеллар",
            "description": "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.",
            "year": 2014,
            "alternativeName": "Interstellar",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb56473d4",
                "name": "Интерстеллар"
              },
              {
                "_id": "6339779fc22d011bb56473d5",
                "name": "Interstellar"
              }
            ],
            "shortDescription": "Фантастический эпос про задыхающуюся Землю, космические полеты и парадоксы времени. «Оскар» за спецэффекты",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "44a50371b7a82baca8b903c12a5a4310",
              "imdb": "tt0325980",
              "tmdb": 22,
              "_id": "6376b9807ad98299ff920a5b"
            },
            "logo": {
              "_id": "62f48fd6252c8469ef672101",
              "url": "https://avatars.mds.yandex.net/get-ott/236744/2a0000017a3448f7a52257d6b256bfc339e3/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5646edd",
              "url": "https://st.kp.yandex.net/images/film_big/4374.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_4374.jpg"
            },
            "rating": {
              "kp": 8.372,
              "imdb": 8.1,
              "filmCritics": 7.1,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8522d68d824d6ca5f6e63"
            },
            "votes": {
              "kp": 842287,
              "imdb": 1136522,
              "filmCritics": 220,
              "russianFilmCritics": 2,
              "await": 0,
              "_id": "63e8522d68d824d6ca5f6e64"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8522d68d824d6ca5f6e6d"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/pirates-of-the-caribbean-the-curse-of-the-black-pearl?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8522d68d824d6ca5f6e6c"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8522d68d824d6ca5f6e6f"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/58273?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8522d68d824d6ca5f6e6e"
                }
              ],
              "_id": "63e8522d68d824d6ca5f6e6b"
            },
            "movieLength": 143,
            "id": 4374,
            "type": "movie",
            "name": "Пираты Карибского моря: Проклятие Черной жемчужины",
            "description": "Жизнь харизматичного авантюриста, капитана Джека Воробья, полная увлекательных приключений, резко меняется, когда его заклятый враг капитан Барбосса похищает корабль Джека Черную Жемчужину, а затем нападает на Порт Ройал и крадет прекрасную дочь губернатора Элизабет Свонн.\n\nДруг детства Элизабет Уилл Тернер вместе с Джеком возглавляет спасательную экспедицию на самом быстром корабле Британии, чтобы вызволить девушку и заодно отобрать у злодея Черную Жемчужину. Вслед за этой парочкой отправляется амбициозный коммодор Норрингтон, который к тому же числится женихом Элизабет.\n\nОднако Уилл не знает, что над Барбоссой висит вечное проклятие, при лунном свете превращающее его с командой в живых скелетов. Проклятье будет снято лишь тогда, когда украденное золото Ацтеков будет возвращено пиратами на старое место.",
            "year": 2003,
            "alternativeName": "Pirates of the Caribbean: The Curse of the Black Pearl",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5646ed9",
                "name": "Пираты Карибского моря: Проклятие Черной жемчужины"
              },
              {
                "_id": "6339779fc22d011bb5646eda",
                "name": "Pirates of the Caribbean: The Curse of the Black Pearl"
              }
            ],
            "shortDescription": "Пират нападает на армию мертвецов, чтобы вернуть свой корабль. Начало приключений Джека Воробья",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4df0fe0d1c7bc66e88bb6848a1e926fd",
              "imdb": "tt0241527",
              "tmdb": 671,
              "_id": "6376b97f7ad98299ff91f79b"
            },
            "logo": {
              "_id": "62f5a7bb252c8469ef9fb7be",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000017e127a46aa2122ff48cb306de98b/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5647d56",
              "url": "https://st.kp.yandex.net/images/film_big/689.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_689.jpg"
            },
            "rating": {
              "kp": 8.261,
              "imdb": 7.6,
              "filmCritics": 7.1,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e87de068d824d6ca263ab4"
            },
            "votes": {
              "kp": 837252,
              "imdb": 791332,
              "filmCritics": 200,
              "russianFilmCritics": 2,
              "await": 0,
              "_id": "63e87de068d824d6ca263ab5"
            },
            "watchability": {
              "items": null,
              "_id": "63e87de068d824d6ca263b6c"
            },
            "movieLength": 152,
            "id": 689,
            "type": "movie",
            "name": "Гарри Поттер и философский камень",
            "description": "Жизнь десятилетнего Гарри Поттера нельзя назвать сладкой: родители умерли, едва ему исполнился год, а от дяди и тёти, взявших сироту на воспитание, достаются лишь тычки да подзатыльники. Но в одиннадцатый день рождения Гарри всё меняется. Странный гость, неожиданно появившийся на пороге, приносит письмо, из которого мальчик узнаёт, что на самом деле он - волшебник и зачислен в школу магии под названием Хогвартс. А уже через пару недель Гарри будет мчаться в поезде Хогвартс-экспресс навстречу новой жизни, где его ждут невероятные приключения, верные друзья и самое главное — ключ к разгадке тайны смерти его родителей.",
            "year": 2001,
            "alternativeName": "Harry Potter and the Sorcerer's Stone",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5647d52",
                "name": "Гарри Поттер и философский камень"
              },
              {
                "_id": "6339779fc22d011bb5647d53",
                "name": "Harry Potter and the Sorcerer's Stone"
              }
            ],
            "shortDescription": "Гарри поступает в школу магии Хогвартс и заводит друзей. Первая часть большой франшизы о маленьком волшебнике",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "411a4de4ea461ddf943dec0dfd29afc1",
              "imdb": "tt8946378",
              "tmdb": 546554,
              "_id": "6376b9887ad98299ff929b2c"
            },
            "logo": {
              "_id": "62dda9a7028619ccafa9d4e1",
              "url": "https://avatars.mds.yandex.net/get-ott/2385704/2a00000176f1c6464b62d464e2e9ddd8dbb6/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5646ffa",
              "url": "https://st.kp.yandex.net/images/film_big/1188529.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1188529.jpg"
            },
            "rating": {
              "kp": 8.077,
              "imdb": 7.9,
              "filmCritics": 8.3,
              "russianFilmCritics": 90,
              "await": 98.96,
              "_id": "63e62d8c68d824d6caa0ee08"
            },
            "votes": {
              "kp": 820378,
              "imdb": 700897,
              "filmCritics": 474,
              "russianFilmCritics": 20,
              "await": 9141,
              "_id": "63e62d8c68d824d6caa0ee09"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e62d8c68d824d6caa0ee0e"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/knives-out?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e62d8c68d824d6caa0ee0d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e62d8c68d824d6caa0ee10"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/226871?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e62d8c68d824d6caa0ee0f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                    "_id": "63e62d8c68d824d6caa0ee12"
                  },
                  "name": "START",
                  "url": "https://start.ru/watch/dostat-nozhi?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=dostat-nozhi",
                  "_id": "63e62d8c68d824d6caa0ee11"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e62d8c68d824d6caa0ee14"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/153844618?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e62d8c68d824d6caa0ee13"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e62d8c68d824d6caa0ee16"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/12502?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e62d8c68d824d6caa0ee15"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e62d8c68d824d6caa0ee18"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/93328166?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e62d8c68d824d6caa0ee17"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e62d8c68d824d6caa0ee1a"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/dostat-nozhi?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e62d8c68d824d6caa0ee19"
                }
              ],
              "_id": "63e62d8c68d824d6caa0ee0c"
            },
            "movieLength": 130,
            "id": 1188529,
            "type": "movie",
            "name": "Достать ножи",
            "description": "На следующее утро после празднования 85-летия известного автора криминальных романов Харлана Тромби виновника торжества находят мёртвым. Налицо — явное самоубийство, но полиция по протоколу опрашивает всех присутствующих в особняке членов семьи, хотя, в этом деле больше заинтересован частный детектив Бенуа Блан. Тем же утром он получил конверт с наличными от неизвестного и заказ на расследование смерти Харлана. Не нужно быть опытным следователем, чтобы понять, что все приукрашивают свои отношения с почившим главой семейства, но Блану достаётся настоящий подарок — медсестра покойного, которая физически не выносит ложь.",
            "year": 2019,
            "alternativeName": "Knives Out",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5646ff6",
                "name": "Достать ножи"
              },
              {
                "_id": "6339779fc22d011bb5646ff7",
                "name": "Knives Out"
              }
            ],
            "color": "#C36A49",
            "shortDescription": "Частный детектив ведет запутанное дело о смерти известного писателя. Криминальная комедия с Дэниэлом Крэйгом",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4e2111b36611a21e87e293af0b7e7ee1",
              "imdb": "tt0238883",
              "tmdb": 20993,
              "_id": "6376b98c7ad98299ff930aef"
            },
            "logo": {
              "_id": "62ed6749b252103987db22c5",
              "url": "https://avatars.mds.yandex.net/get-ott/1652588/2a0000016f12f895b05320538df47aca46c8/orig"
            },
            "poster": {
              "_id": "63397c16c22d011bb57ed6c1",
              "url": "https://st.kp.yandex.net/images/film_big/41520.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_41520.jpg"
            },
            "rating": {
              "kp": 8.172,
              "imdb": 7.7,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e87bfa68d824d6ca02b769"
            },
            "votes": {
              "kp": 794197,
              "imdb": 15794,
              "filmCritics": 0,
              "russianFilmCritics": 1,
              "await": 0,
              "_id": "63e87bfa68d824d6ca02b76a"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e87bfa68d824d6ca02b76e"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/33560?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e87bfa68d824d6ca02b76d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e87bfa68d824d6ca02b770"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/284327155?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e87bfa68d824d6ca02b76f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e87bfa68d824d6ca02b772"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/9759?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e87bfa68d824d6ca02b771"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e87bfa68d824d6ca02b774"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/brat-2-2000/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e87bfa68d824d6ca02b773"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e87bfa68d824d6ca02b776"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/72533208?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e87bfa68d824d6ca02b775"
                }
              ],
              "_id": "63e87bfa68d824d6ca02b76c"
            },
            "id": 41520,
            "type": "movie",
            "name": "Брат 2",
            "description": "Участвуя в программе на телевидении, Данила Багров встречает своих друзей по службе Чечне. Одного из них внезапно убивают. Выясняется, что у того были неприятности из-за брата-хоккеиста в Америке. Данила должен разобраться. Он вылетает в Америку и за компанию берёт с собой старшего брата.",
            "year": 2000,
            "alternativeName": null,
            "enName": null,
            "movieLength": 127,
            "names": [
              {
                "_id": "63397c16c22d011bb57ed6be",
                "name": "Брат 2"
              }
            ],
            "shortDescription": "Американцы знакомятся с Данилой Багровым и узнают, в чем сила. Сиквел о герое времени с мощным рок-саундтреком\n",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "46c5df252dc1a790b82d1a00fcf44812",
              "imdb": "tt2861424",
              "tmdb": 60625,
              "_id": "6376b98c7ad98299ff92fc0a"
            },
            "logo": {
              "_id": "62ee36bf0f5be41246b3f76e",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a0000017e4094aa8e5de73d2e865255c24d/orig"
            },
            "poster": {
              "_id": "6339799dc22d011bb5710ea5",
              "url": "https://st.kp.yandex.net/images/film_big/685246.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_685246.jpg"
            },
            "rating": {
              "kp": 8.988,
              "imdb": 9.1,
              "filmCritics": 0,
              "russianFilmCritics": 87.5,
              "await": 0,
              "_id": "63e78d5068d824d6ca6a5b4c"
            },
            "votes": {
              "kp": 786767,
              "imdb": 536507,
              "filmCritics": 0,
              "russianFilmCritics": 8,
              "await": 2,
              "_id": "63e78d5068d824d6ca6a5b4d"
            },
            "watchability": {
              "_id": "6339799dc22d011bb5710f58",
              "items": null
            },
            "id": 685246,
            "type": "animated-series",
            "name": "Рик и Морти",
            "description": "В центре сюжета - школьник по имени Морти и его дедушка Рик. Морти - самый обычный мальчик, который ничем не отличается от своих сверстников. А вот его дедуля занимается необычными научными исследованиями и зачастую полностью неадекватен. Он может в любое время дня и ночи схватить внука и отправиться вместе с ним в безумные приключения с помощью построенной из разного хлама летающей тарелки, которая способна перемещаться сквозь межпространственный тоннель. Каждый раз эта парочка оказывается в самых неожиданных местах и самых нелепых ситуациях.",
            "year": 2013,
            "alternativeName": "Rick and Morty",
            "enName": "Rick and Morty",
            "names": [
              {
                "_id": "6339799dc22d011bb5710ea1",
                "name": "Рик и Морти"
              },
              {
                "_id": "6339799dc22d011bb5710ea2",
                "name": "Rick and Morty"
              }
            ],
            "color": "#C0B818",
            "movieLength": 23,
            "shortDescription": "Гениальный ученый втягивает внука в безумные авантюры. Выдающийся анимационный сериал Дэна Хармона",
            "releaseYears": [
              {
                "_id": "6359ae029f6a011dbf62534b",
                "start": 2013,
                "end": null
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "46a0706f3a37eb52b933f510ae5c7d21",
              "imdb": "tt0109830",
              "tmdb": 13,
              "_id": "6376b9817ad98299ff921489"
            },
            "logo": {
              "_id": "62dee7b2028619ccaf2549ba",
              "url": "https://avatars.mds.yandex.net/get-ott/200035/2a00000170ed554ce17a2db2b2cfdc134a6c/orig"
            },
            "poster": {
              "_id": "633983c3c22d011bb59e98d3",
              "url": "https://st.kp.yandex.net/images/film_big/448.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_448.jpg"
            },
            "rating": {
              "kp": 8.916,
              "imdb": 8.8,
              "filmCritics": 7.5,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8af5e68d824d6cad706d0"
            },
            "votes": {
              "kp": 782274,
              "imdb": 2096709,
              "filmCritics": 106,
              "russianFilmCritics": 1,
              "await": 6,
              "_id": "63e8af5e68d824d6cad706d1"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8af5e68d824d6cad706d5"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/forrest-gump?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8af5e68d824d6cad706d4"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8af5e68d824d6cad706d7"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/99164?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8af5e68d824d6cad706d6"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e8af5e68d824d6cad706d9"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/118278367?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e8af5e68d824d6cad706d8"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e8af5e68d824d6cad706db"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/17285?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e8af5e68d824d6cad706da"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e8af5e68d824d6cad706dd"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/80879027?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e8af5e68d824d6cad706dc"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e8af5e68d824d6cad706df"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/forrest-gamp?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e8af5e68d824d6cad706de"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e8af5e68d824d6cad706e1"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/619c8367bb003f90030a18cf?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e8af5e68d824d6cad706e0"
                }
              ],
              "_id": "63e8af5e68d824d6cad706d3"
            },
            "movieLength": 142,
            "id": 448,
            "type": "movie",
            "name": "Форрест Гамп",
            "description": "Сидя на автобусной остановке, Форрест Гамп — не очень умный, но добрый и открытый парень — рассказывает случайным встречным историю своей необыкновенной жизни.\n\nС самого малолетства парень страдал от заболевания ног, соседские мальчишки дразнили его, но в один прекрасный день Форрест открыл в себе невероятные способности к бегу. Подруга детства Дженни всегда его поддерживала и защищала, но вскоре дороги их разошлись.",
            "year": 1994,
            "alternativeName": "Forrest Gump",
            "enName": null,
            "names": [
              {
                "_id": "633983c3c22d011bb59e98cf",
                "name": "Форрест Гамп"
              },
              {
                "_id": "633983c3c22d011bb59e98d0",
                "name": "Forrest Gump"
              }
            ],
            "shortDescription": "Полувековая история США глазами чудака из Алабамы. Абсолютная классика Роберта Земекиса с Томом Хэнксом",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "436bd5d28aa8fdfca558e95fb58993fe",
              "imdb": "tt6966692",
              "tmdb": 490132,
              "_id": "6376b9897ad98299ff92bdfd"
            },
            "logo": {
              "_id": "62e9d537b252103987ad46a4",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016e043a92a346ddf03b9f572b11d6/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5647881",
              "url": "https://st.kp.yandex.net/images/film_big/1108577.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1108577.jpg"
            },
            "rating": {
              "kp": 8.395,
              "imdb": 8.2,
              "filmCritics": 7.2,
              "russianFilmCritics": 93.75,
              "await": 99.09,
              "_id": "63d9a35ff38219e94f385aaa"
            },
            "votes": {
              "kp": 765479,
              "imdb": 500897,
              "filmCritics": 364,
              "russianFilmCritics": 16,
              "await": 6866,
              "_id": "63e69b8c68d824d6ca3ce642"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e69b8c68d824d6ca3ce645"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/green-book?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e69b8c68d824d6ca3ce644"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e69b8c68d824d6ca3ce647"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/210332?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e69b8c68d824d6ca3ce646"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                    "_id": "63e69b8c68d824d6ca3ce649"
                  },
                  "name": "START",
                  "url": "https://start.ru/watch/zelyonaya-kniga?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=zelyonaya-kniga",
                  "_id": "63e69b8c68d824d6ca3ce648"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e69b8c68d824d6ca3ce64b"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/179033109?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e69b8c68d824d6ca3ce64a"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e69b8c68d824d6ca3ce64d"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/9378?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e69b8c68d824d6ca3ce64c"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e69b8c68d824d6ca3ce64f"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/zelenaya-kniga-2018/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e69b8c68d824d6ca3ce64e"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e69b8c68d824d6ca3ce651"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/75532283?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e69b8c68d824d6ca3ce650"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/74a3af87-2bfa-4cdc-bc16-32a21114665b/orig",
                    "_id": "63e69b8c68d824d6ca3ce653"
                  },
                  "name": "МегаФон ТВ",
                  "url": "https://megafon.tv/movies/vods/Zelenaya_kniga_2018?utm_source=yandex&utm_medium=wizard&utm_campaign=Zelenaya_kniga_2018",
                  "_id": "63e69b8c68d824d6ca3ce652"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e69b8c68d824d6ca3ce655"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/zelenaya-kniga?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e69b8c68d824d6ca3ce654"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2439731/17c7ebcf-41aa-48b6-9366-621a85f1307a/orig",
                    "_id": "63e69b8c68d824d6ca3ce657"
                  },
                  "name": "Большое ТВ",
                  "url": "https://bolshoe.tv/promo/web/movie/24060?segment=yandex_feed&group=peoples&utm_campaign=ya_feed&utm_medium=ya_feed",
                  "_id": "63e69b8c68d824d6ca3ce656"
                }
              ],
              "_id": "63e69b8c68d824d6ca3ce643"
            },
            "movieLength": 130,
            "id": 1108577,
            "type": "movie",
            "name": "Зеленая книга",
            "description": "1960-е годы. После закрытия нью-йоркского ночного клуба на ремонт вышибала Тони по прозвищу Болтун ищет подработку на пару месяцев. Как раз в это время Дон Ширли — утонченный светский лев, богатый и талантливый чернокожий музыкант, исполняющий классическую музыку — собирается в турне по южным штатам, где ещё сильны расистские убеждения и царит сегрегация. Он нанимает Тони в качестве водителя, телохранителя и человека, способного решать текущие проблемы. У этих двоих так мало общего, и эта поездка навсегда изменит жизнь обоих.",
            "year": 2018,
            "alternativeName": "Green Book",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb564787d",
                "name": "Зеленая книга"
              },
              {
                "_id": "6339779fc22d011bb564787e",
                "name": "Green Book"
              }
            ],
            "shortDescription": "Путешествие итальянца-вышибалы и чернокожего пианиста по Америке 1960-х. «Оскар» за лучший фильм",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "44f2da0d8ace7b0ab1889e03a6a52d37",
              "imdb": "tt0137523",
              "tmdb": 550,
              "_id": "6376b98a7ad98299ff92e0da"
            },
            "logo": {
              "_id": "62e2a4f6028619ccafbc3988",
              "url": "https://avatars.mds.yandex.net/get-ott/239697/2a00000173c3126e043a7edfc591ded6c0c6/orig"
            },
            "poster": {
              "_id": "63397947c22d011bb56f2658",
              "url": "https://st.kp.yandex.net/images/film_big/361.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_361.jpg"
            },
            "rating": {
              "kp": 8.653,
              "imdb": 8.8,
              "filmCritics": 7.4,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8a89e68d824d6ca2ee8bf"
            },
            "votes": {
              "kp": 765092,
              "imdb": 2144443,
              "filmCritics": 181,
              "russianFilmCritics": 2,
              "await": 0,
              "_id": "63e8a89e68d824d6ca2ee8c0"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8a89e68d824d6ca2ee8c3"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/fight-club?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8a89e68d824d6ca2ee8c2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8a89e68d824d6ca2ee8c5"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/87485?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8a89e68d824d6ca2ee8c4"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e8a89e68d824d6ca2ee8c7"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/19876?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e8a89e68d824d6ca2ee8c6"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e8a89e68d824d6ca2ee8c9"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/boytsovskiy-klub-1999/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e8a89e68d824d6ca2ee8c8"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e8a89e68d824d6ca2ee8cb"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/68513761?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e8a89e68d824d6ca2ee8ca"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e8a89e68d824d6ca2ee8cd"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/boytsovskiy-klub?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e8a89e68d824d6ca2ee8cc"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e8a89e68d824d6ca2ee8cf"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/16942-bojtsovskij-klub?utm_source=kinopoisk",
                  "_id": "63e8a89e68d824d6ca2ee8ce"
                }
              ],
              "_id": "63e8a89e68d824d6ca2ee8c1"
            },
            "movieLength": 139,
            "id": 361,
            "type": "movie",
            "name": "Бойцовский клуб",
            "description": "Сотрудник страховой компании страдает хронической бессонницей и отчаянно пытается вырваться из мучительно скучной жизни. Однажды в очередной командировке он встречает некоего Тайлера Дёрдена — харизматического торговца мылом с извращенной философией. Тайлер уверен, что самосовершенствование — удел слабых, а единственное, ради чего стоит жить, — саморазрушение.\n\nПроходит немного времени, и вот уже новые друзья лупят друг друга почем зря на стоянке перед баром, и очищающий мордобой доставляет им высшее блаженство. Приобщая других мужчин к простым радостям физической жестокости, они основывают тайный Бойцовский клуб, который начинает пользоваться невероятной популярностью.",
            "year": 1999,
            "alternativeName": "Fight Club",
            "enName": null,
            "names": [
              {
                "_id": "63397947c22d011bb56f2654",
                "name": "Бойцовский клуб"
              },
              {
                "_id": "63397947c22d011bb56f2655",
                "name": "Fight Club"
              }
            ],
            "shortDescription": "Страховой работник разрушает рутину своей благополучной жизни. Культовая драма по книге Чака Паланика",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4592133f6f3e90e3811d0e202dbcba0c",
              "imdb": "tt0087650",
              "tmdb": 32334,
              "_id": "6376b9857ad98299ff9263aa"
            },
            "logo": {
              "_id": "62f7cd81252c8469ef102509",
              "url": "https://avatars.mds.yandex.net/get-ott/2385704/2a000001720d95c11088788d9e2be6562e66/orig"
            },
            "poster": {
              "_id": "633986d7c22d011bb5a965b2",
              "url": "https://st.kp.yandex.net/images/film_big/45146.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_45146.jpg"
            },
            "rating": {
              "kp": 8.285,
              "imdb": 8,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63cd10ae57101ffd39bc60d6"
            },
            "votes": {
              "kp": 761066,
              "imdb": 5070,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8efc368d824d6cafdb942"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8efc368d824d6cafdb945"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/ljubov-i-golubi?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8efc368d824d6cafdb944"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8efc368d824d6cafdb947"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/53119?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8efc368d824d6cafdb946"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e8efc368d824d6cafdb949"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/599189160?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e8efc368d824d6cafdb948"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e8efc368d824d6cafdb94b"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/14584?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e8efc368d824d6cafdb94a"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e8efc368d824d6cafdb94d"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/lyubov-i-golubi-1984/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e8efc368d824d6cafdb94c"
                }
              ],
              "_id": "63e8efc368d824d6cafdb943"
            },
            "id": 45146,
            "type": "movie",
            "name": "Любовь и голуби",
            "description": "Ликвидируя неисправность лебедки, Василий Кузякин получил травму и путевку на юг. Там он встретил роковую женщину Раису Захаровну и… вернулся Вася с курорта не к себе в деревню, а в дом Раисы Захаровны. Началась для него новая жизнь, в которой было много непонятного и интересного, но не было дома, где остались Надя, дети и голуби.",
            "year": 1984,
            "alternativeName": null,
            "enName": null,
            "names": [
              {
                "_id": "633986d7c22d011bb5a965af",
                "name": "Любовь и голуби"
              }
            ],
            "movieLength": 107,
            "shortDescription": "Вася пытается заслужить прощения у семьи. Мощнейший актерский состав под руководством Владимира Меньшова",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "443c9a2dee446db0b8d3a6d7f930528e",
              "imdb": "tt1130884",
              "tmdb": 11324,
              "_id": "6376b98a7ad98299ff92cb2e"
            },
            "logo": {
              "_id": "62f3bccb252c8469ef3bf1a3",
              "url": "https://avatars.mds.yandex.net/get-ott/2419418/2a0000016eadd14d677a2285a8ffa7e27974/orig"
            },
            "poster": {
              "_id": "63398443c22d011bb5a057ee",
              "url": "https://st.kp.yandex.net/images/film_big/397667.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_397667.jpg"
            },
            "rating": {
              "kp": 8.51,
              "imdb": 8.2,
              "filmCritics": 6.7,
              "russianFilmCritics": 85.7143,
              "await": 78.65,
              "_id": "63e7ef4168d824d6caf82aa7"
            },
            "votes": {
              "kp": 760268,
              "imdb": 1330178,
              "filmCritics": 260,
              "russianFilmCritics": 7,
              "await": 22948,
              "_id": "63e7ef4168d824d6caf82aa8"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7ef4168d824d6caf82aab"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/shutter-island?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7ef4168d824d6caf82aaa"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7ef4168d824d6caf82aad"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/89599?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7ef4168d824d6caf82aac"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                    "_id": "63e7ef4168d824d6caf82aaf"
                  },
                  "name": "START",
                  "url": "https://start.ru/watch/ostrov-proklyatyh?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=ostrov-proklyatyh",
                  "_id": "63e7ef4168d824d6caf82aae"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e7ef4168d824d6caf82ab1"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/213924851?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e7ef4168d824d6caf82ab0"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e7ef4168d824d6caf82ab3"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/10167?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e7ef4168d824d6caf82ab2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1648503/97e3cbbd-40ee-4298-888d-ed2d0f022a69/orig",
                    "_id": "63e7ef4168d824d6caf82ab5"
                  },
                  "name": "more.tv",
                  "url": "https://more.tv/ostrov_proklyatyh?utm_source=yandex-snippet&utm_medium=snippet&utm_campaign=ostrov_proklyatyh",
                  "_id": "63e7ef4168d824d6caf82ab4"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e7ef4168d824d6caf82ab7"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/ostrov-proklyatykh-2009/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e7ef4168d824d6caf82ab6"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/4e5f7a8e-d5ac-4904-9fc0-208753ccf520/orig",
                    "_id": "63e7ef4168d824d6caf82ab9"
                  },
                  "name": "Кино1ТВ",
                  "url": "https://kino.1tv.ru/serials/ostrov-proklyatyh?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7ef4168d824d6caf82ab8"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e7ef4168d824d6caf82abb"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/76282127?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e7ef4168d824d6caf82aba"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/74a3af87-2bfa-4cdc-bc16-32a21114665b/orig",
                    "_id": "63e7ef4168d824d6caf82abd"
                  },
                  "name": "МегаФон ТВ",
                  "url": "https://megafon.tv/movies/vods/Ostrov_proklyatyh?utm_source=yandex&utm_medium=wizard&utm_campaign=Ostrov_proklyatyh",
                  "_id": "63e7ef4168d824d6caf82abc"
                }
              ],
              "_id": "63e7ef4168d824d6caf82aa9"
            },
            "id": 397667,
            "type": "movie",
            "name": "Остров проклятых",
            "description": "Два американских судебных пристава отправляются на один из островов в штате Массачусетс, чтобы расследовать исчезновение пациентки клиники для умалишенных преступников. При проведении расследования им придется столкнуться с паутиной лжи, обрушившимся ураганом и смертельным бунтом обитателей клиники.",
            "year": 2009,
            "alternativeName": "Shutter Island",
            "color": "#BC7E6C",
            "enName": null,
            "names": [
              {
                "_id": "63398443c22d011bb5a057ea",
                "name": "Остров проклятых"
              },
              {
                "_id": "63398443c22d011bb5a057eb",
                "name": "Shutter Island"
              }
            ],
            "shortDescription": "Пристав оказывается заложником клиники для умалишенных. Сложносочиненный детектив с Леонардо ДиКаприо",
            "movieLength": 138,
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "45ec35086bb46573803551f378c69b73",
              "imdb": "tt4154756",
              "tmdb": 299536,
              "_id": "6376b98b7ad98299ff92ef1a"
            },
            "logo": {
              "_id": "62f29caf252c8469efca0745",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a00000178c586374cd541732e2109769c2d/orig"
            },
            "poster": {
              "_id": "63398037c22d011bb592817b",
              "url": "https://st.kp.yandex.net/images/film_big/843649.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_843649.jpg"
            },
            "rating": {
              "kp": 8.052,
              "imdb": 8.4,
              "filmCritics": 7.6,
              "russianFilmCritics": 86.3636,
              "await": 92.37,
              "_id": "63e6a24868d824d6ca956474"
            },
            "votes": {
              "kp": 758979,
              "imdb": 1092456,
              "filmCritics": 489,
              "russianFilmCritics": 22,
              "await": 77955,
              "_id": "63e6a24868d824d6ca956475"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e6a24868d824d6ca95647d"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/avengers-infinity-war?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e6a24868d824d6ca95647c"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e6a24868d824d6ca95647f"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/131259?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e6a24868d824d6ca95647e"
                }
              ],
              "_id": "63e6a24868d824d6ca95647b"
            },
            "movieLength": 149,
            "id": 843649,
            "type": "movie",
            "name": "Мстители: Война бесконечности",
            "description": "Пока Мстители и их союзники продолжают защищать мир от различных опасностей, с которыми не смог бы справиться один супергерой, новая угроза возникает из космоса: Танос. Межгалактический тиран преследует цель собрать все шесть Камней Бесконечности - артефакты невероятной силы, с помощью которых можно менять реальность по своему желанию. Всё, с чем Мстители сталкивались ранее, вело к этому моменту – судьба Земли никогда ещё не была столь неопределённой.",
            "year": 2018,
            "alternativeName": "Avengers: Infinity War",
            "enName": null,
            "names": [
              {
                "_id": "63398037c22d011bb5928177",
                "name": "Мстители: Война бесконечности"
              },
              {
                "_id": "63398037c22d011bb5928178",
                "name": "Avengers: Infinity War"
              }
            ],
            "shortDescription": "Титан Танос вынашивает страшный план — угрозу всей Вселенной. Предпоследний фильм о суперкоманде Marvel",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "467e936285361ab78c3ed4061d3cc363",
              "imdb": "tt0120338",
              "tmdb": 597,
              "_id": "6376b9857ad98299ff924f20"
            },
            "logo": {
              "_id": "62f21f3f252c8469ef7bd7c4",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a000001729e8bc06ab8fbd24ff28cf4e297/orig"
            },
            "poster": {
              "_id": "63397b4bc22d011bb57a4842",
              "url": "https://st.kp.yandex.net/images/film_big/2213.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_2213.jpg"
            },
            "rating": {
              "kp": 8.381,
              "imdb": 7.9,
              "filmCritics": 8,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63d88e56f38219e94f2c3971"
            },
            "votes": {
              "kp": 738334,
              "imdb": 1188640,
              "filmCritics": 241,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8a5a868d824d6caf98d51"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8a5a868d824d6caf98d54"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/titanic?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8a5a868d824d6caf98d53"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8a5a868d824d6caf98d56"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/93869?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8a5a868d824d6caf98d55"
                }
              ],
              "_id": "63e8a5a868d824d6caf98d52"
            },
            "movieLength": 194,
            "id": 2213,
            "type": "movie",
            "name": "Титаник",
            "description": "В первом и последнем плавании шикарного «Титаника» встречаются двое. Пассажир нижней палубы Джек выиграл билет в карты, а богатая наследница Роза отправляется в Америку, чтобы выйти замуж по расчёту. Чувства молодых людей только успевают расцвести, и даже не классовые различия создадут испытания влюблённым, а айсберг, вставший на пути считавшегося непотопляемым лайнера.",
            "year": 1997,
            "alternativeName": "Titanic",
            "enName": null,
            "names": [
              {
                "_id": "63397b4bc22d011bb57a483e",
                "name": "Титаник"
              },
              {
                "_id": "63397b4bc22d011bb57a483f",
                "name": "Titanic"
              }
            ],
            "shortDescription": "Запретная любовь на фоне гибели легендарного лайнера. Великий фильм-катастрофа — в отреставрированной версии",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4f3c027cbce13606b74124a9d5b140c7",
              "imdb": "tt9011124",
              "tmdb": 99671,
              "_id": "6376b9997ad98299ff93fe59"
            },
            "logo": {
              "_id": "62ec5511b252103987373c0b",
              "url": "https://avatars.mds.yandex.net/get-ott/236744/2a00000180bf38e7506037453dd1e1c11cc2/orig"
            },
            "poster": {
              "_id": "63397babc22d011bb57c7733",
              "url": "https://st.kp.yandex.net/images/film_big/1100777.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1100777.jpg"
            },
            "rating": {
              "kp": 8.48,
              "imdb": 7.4,
              "filmCritics": 0,
              "russianFilmCritics": 71.4286,
              "await": 93.68,
              "_id": "63e67a1e68d824d6ca7a358f"
            },
            "votes": {
              "kp": 719257,
              "imdb": 699,
              "filmCritics": 0,
              "russianFilmCritics": 7,
              "await": 307,
              "_id": "63e67a1e68d824d6ca7a3590"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/4e5f7a8e-d5ac-4904-9fc0-208753ccf520/orig",
                    "_id": "63e67a1e68d824d6ca7a36a1"
                  },
                  "name": "Кино1ТВ",
                  "url": "https://kino.1tv.ru/serials/trigger-2?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e67a1e68d824d6ca7a36a0"
                }
              ],
              "_id": "63e67a1e68d824d6ca7a369f"
            },
            "id": 1100777,
            "type": "tv-series",
            "name": "Триггер",
            "description": "Психолог Артём Стрелецкий — сторонник шоковой терапии в лечении больных. Он считает, что единственный способ для человека решить свои проблемы — это понять себя и перестать себе врать. Если большинство психологов нянчатся с клиентами, по полгода выслушивают жалобы на жизнь, сочувствуют и получают при этом немалые деньги за цикл сеансов, то Артём постоянно провоцирует клиентов: оскорбляет их, смеется над ними, намеренно выталкивает из зоны комфорта. Практика Артема процветает, пока один из его пациентов не кончает жизнь самоубийством.",
            "year": 2018,
            "alternativeName": null,
            "enName": null,
            "movieLength": 52,
            "names": [
              {
                "_id": "63397babc22d011bb57c7730",
                "name": "Триггер"
              }
            ],
            "shortDescription": "Страшная трагедия вынуждает психолога-провокатора вернуться к практике. Напряженная драма с Максимом Матвеевым",
            "releaseYears": [
              {
                "_id": "6359adf59f6a011dbf624b19",
                "start": 2018,
                "end": null
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "4e7c6d933dff14428eaa7b1522a00c7f",
              "imdb": "tt4154796",
              "tmdb": 299534,
              "_id": "6376b9867ad98299ff927494"
            },
            "logo": {
              "_id": "62f6e045252c8469efdf66ad",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a00000176f208a7a61cc08d59dec87c9876/orig"
            },
            "poster": {
              "_id": "633980e1c22d011bb594b3ed",
              "url": "https://st.kp.yandex.net/images/film_big/843650.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_843650.jpg"
            },
            "rating": {
              "kp": 7.837,
              "imdb": 8.4,
              "filmCritics": 8.2,
              "russianFilmCritics": 70.5882,
              "await": 92.33,
              "_id": "63e636a368d824d6ca00e73f"
            },
            "votes": {
              "kp": 714554,
              "imdb": 1144860,
              "filmCritics": 555,
              "russianFilmCritics": 17,
              "await": 96318,
              "_id": "63e636a368d824d6ca00e740"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e636a368d824d6ca00e748"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/avengers-endgame?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e636a368d824d6ca00e747"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e636a368d824d6ca00e74a"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/132291?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e636a368d824d6ca00e749"
                }
              ],
              "_id": "63e636a368d824d6ca00e746"
            },
            "movieLength": 181,
            "id": 843650,
            "type": "movie",
            "name": "Мстители: Финал",
            "description": "Оставшиеся в живых члены команды Мстителей и их союзники должны разработать новый план, который поможет противостоять разрушительным действиям могущественного титана Таноса. После наиболее масштабной и трагической битвы в истории они не могут допустить ошибку.",
            "year": 2019,
            "alternativeName": "Avengers: Endgame",
            "enName": null,
            "names": [
              {
                "_id": "633980e1c22d011bb594b3e9",
                "name": "Мстители: Финал"
              },
              {
                "_id": "633980e1c22d011bb594b3ea",
                "name": "Avengers: Endgame"
              }
            ],
            "shortDescription": "Железный человек, Тор и другие пытаются переиграть Таноса. Эпохальное завершение супергеройской франшизы",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4bb2756fc4f689b4a10f3eb9e7b21145",
              "imdb": "tt4426042",
              "tmdb": 63435,
              "_id": "6376b9957ad98299ff93adb1"
            },
            "logo": {
              "_id": "62ea03beb252103987cd3db2",
              "url": "https://avatars.mds.yandex.net/get-ott/374297/2a00000176fc5571eb16df590c77886ccab0/orig"
            },
            "poster": {
              "_id": "63397e68c22d011bb58ad8da",
              "url": "https://st.kp.yandex.net/images/film_big/820638.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_820638.jpg"
            },
            "rating": {
              "kp": 8.234,
              "imdb": 7.6,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 81.25,
              "_id": "63e7538968d824d6ca0a4eb0"
            },
            "votes": {
              "kp": 701084,
              "imdb": 1704,
              "filmCritics": 0,
              "russianFilmCritics": 1,
              "await": 406,
              "_id": "63e7538968d824d6ca0a4eb1"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/4e5f7a8e-d5ac-4904-9fc0-208753ccf520/orig",
                    "_id": "63e7538968d824d6ca0a4f42"
                  },
                  "name": "Кино1ТВ",
                  "url": "https://kino.1tv.ru/serials/mazhor-chetvertyy-sezon?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7538968d824d6ca0a4f41"
                }
              ],
              "_id": "63e7538968d824d6ca0a4f40"
            },
            "id": 820638,
            "type": "tv-series",
            "name": "Мажор",
            "description": "Таких, как наш главный герой Игорь Соколовский, то есть детей высокопоставленных, богатых родителей, называют мажорами. Наш герой имеет юридическое образование, но ни одного дня не проработал. Безответственный прожигатель жизни. В один из загулов ночью он вступился за приятеля, подрался с полицейскими, выбил табельное оружие у офицера... В итоге отец лишает героя всего и отправляет работать в отделение полиции - то самое, в котором служат ночные полицейские. Его, мажора, там не ждут. Его презирают. Но именно там он начнет становиться мужчиной, встретит свою любовь и найдет убийцу мамы.",
            "year": 2014,
            "alternativeName": null,
            "enName": null,
            "movieLength": 52,
            "names": [
              {
                "_id": "63397e68c22d011bb58ad8d7",
                "name": "Мажор"
              }
            ],
            "shortDescription": "Расследуя серию убийств, Мажор сам оказывается под подозрением. Продолжение экшен-сериала с Павлом Прилучным",
            "releaseYears": [
              {
                "_id": "6359ae019f6a011dbf625236",
                "start": 2014,
                "end": null
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "45e8f29f25fe31a59be88301baa5caa1",
              "imdb": "tt0110912",
              "tmdb": 680,
              "_id": "6376b98f7ad98299ff933d3e"
            },
            "logo": {
              "_id": "62ecfed3b2521039879eb60a",
              "url": null
            },
            "poster": {
              "_id": "63397ed3c22d011bb58ccce5",
              "url": "https://st.kp.yandex.net/images/film_big/342.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_342.jpg"
            },
            "rating": {
              "kp": 8.64,
              "imdb": 8.9,
              "filmCritics": 9.2,
              "russianFilmCritics": 100,
              "await": 0,
              "_id": "63d39be857101ffd3901b5dd"
            },
            "votes": {
              "kp": 674055,
              "imdb": 2072098,
              "filmCritics": 115,
              "russianFilmCritics": 7,
              "await": 1,
              "_id": "63e8a53668d824d6caf157ca"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8a53668d824d6caf157ce"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/pulp-fiction?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8a53668d824d6caf157cd"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8a53668d824d6caf157d0"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/100142?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8a53668d824d6caf157cf"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e8a53668d824d6caf157d2"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/16647?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e8a53668d824d6caf157d1"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e8a53668d824d6caf157d4"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/81237818?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e8a53668d824d6caf157d3"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e8a53668d824d6caf157d6"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/kriminalnoe-chtivo?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e8a53668d824d6caf157d5"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e8a53668d824d6caf157d8"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/618e0567bb003f90038be6f8?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e8a53668d824d6caf157d7"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e8a53668d824d6caf157da"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/17792-kriminalnoe-chtivo?utm_source=kinopoisk",
                  "_id": "63e8a53668d824d6caf157d9"
                }
              ],
              "_id": "63e8a53668d824d6caf157cc"
            },
            "movieLength": 154,
            "id": 342,
            "type": "movie",
            "name": "Криминальное чтиво",
            "description": "Двое бандитов Винсент Вега и Джулс Винфилд ведут философские беседы в перерывах между разборками и решением проблем с должниками криминального босса Марселласа Уоллеса.\n\nВ первой истории Винсент проводит незабываемый вечер с женой Марселласа Мией. Во второй рассказывается о боксёре Бутче Кулидже, купленном Уоллесом, чтобы сдать бой. В третьей истории Винсент и Джулс по нелепой случайности попадают в неприятности.",
            "year": 1994,
            "alternativeName": "Pulp Fiction",
            "enName": null,
            "names": [
              {
                "_id": "63397ed3c22d011bb58ccce1",
                "name": "Криминальное чтиво"
              },
              {
                "_id": "63397ed3c22d011bb58ccce2",
                "name": "Pulp Fiction"
              }
            ],
            "shortDescription": "Несколько связанных историй из жизни бандитов. Шедевр Квентина Тарантино, который изменил мировое кино",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "444c5bfed612531184dd86785e799f58",
              "imdb": "tt1211837",
              "tmdb": 284052,
              "_id": "6376b9827ad98299ff921fd2"
            },
            "logo": {
              "_id": "62ee262f0f5be41246a77cf2",
              "url": "https://avatars.mds.yandex.net/get-ott/2419418/2a0000016e043b6ca119c3a776483a7d95f8/orig"
            },
            "poster": {
              "_id": "63398604c22d011bb5a6a97a",
              "url": "https://st.kp.yandex.net/images/film_big/409600.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_409600.jpg"
            },
            "rating": {
              "kp": 7.511,
              "imdb": 7.5,
              "filmCritics": 7.3,
              "russianFilmCritics": 94.7368,
              "await": 95.79,
              "_id": "63e724f568d824d6ca5edf4a"
            },
            "votes": {
              "kp": 673757,
              "imdb": 751235,
              "filmCritics": 387,
              "russianFilmCritics": 19,
              "await": 69984,
              "_id": "63e724f568d824d6ca5edf4b"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e724f568d824d6ca5edfc3"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/doctor-strange?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e724f568d824d6ca5edfc2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e724f568d824d6ca5edfc5"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/131267?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e724f568d824d6ca5edfc4"
                }
              ],
              "_id": "63e724f568d824d6ca5edfc1"
            },
            "movieLength": 115,
            "id": 409600,
            "type": "movie",
            "name": "Доктор Стрэндж",
            "description": "Страшная автокатастрофа поставила крест на карьере успешного нейрохирурга Доктора Стрэнджа. Отчаявшись, он отправляется в путешествие в поисках исцеления и открывает в себе невероятные способности к трансформации пространства и времени. Теперь он — связующее звено между параллельными измерениями, а его миссия — защищать жителей Земли и противодействовать злу, какое бы обличие оно ни принимало.",
            "year": 2016,
            "alternativeName": "Doctor Strange",
            "enName": null,
            "names": [
              {
                "_id": "63398604c22d011bb5a6a976",
                "name": "Доктор Стрэндж"
              },
              {
                "_id": "63398604c22d011bb5a6a977",
                "name": "Doctor Strange"
              }
            ],
            "shortDescription": "После автокатастрофы хирург становится верховным защитником Земли. В роли супергероя — Бенедикт Камбербэтч",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4ba2562d337ca9548d398f4a80509f08",
              "imdb": "tt1160419",
              "tmdb": 438631,
              "_id": "6376b9907ad98299ff93548b"
            },
            "logo": {
              "_id": "633645d4248263ce89ad3933",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a0000017ede1a0d9f8bae88b8f757431b94/orig"
            },
            "poster": {
              "_id": "6339888ec22d011bb5aee70c",
              "url": "https://st.kp.yandex.net/images/film_big/409424.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_409424.jpg"
            },
            "rating": {
              "kp": 7.673,
              "imdb": 8,
              "filmCritics": 7.6,
              "russianFilmCritics": 72,
              "await": 96.96,
              "_id": "63d14c4f57101ffd39314d2a"
            },
            "votes": {
              "kp": 669595,
              "imdb": 646888,
              "filmCritics": 496,
              "russianFilmCritics": 25,
              "await": 89742,
              "_id": "63e608ca68d824d6ca51a194"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e608ca68d824d6ca51a199"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/129900718?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e608ca68d824d6ca51a198"
                }
              ],
              "_id": "63e608ca68d824d6ca51a197"
            },
            "movieLength": 155,
            "id": 409424,
            "type": "movie",
            "name": "Дюна",
            "description": "Наследник знаменитого дома Атрейдесов Пол отправляется вместе с семьей на одну из самых опасных планет во Вселенной — Арракис. Здесь нет ничего, кроме песка, палящего солнца, гигантских чудовищ и основной причины межгалактических конфликтов — невероятно ценного ресурса, который называется меланж. В результате захвата власти Пол вынужден бежать и скрываться, и это становится началом его эпического путешествия. Враждебный мир Арракиса приготовил для него множество тяжелых испытаний, но только тот, кто готов взглянуть в глаза своему страху, достоин стать избранным.",
            "year": 2021,
            "alternativeName": "Dune: Part One",
            "enName": null,
            "names": [
              {
                "_id": "6339888ec22d011bb5aee708",
                "name": "Дюна"
              },
              {
                "_id": "6339888ec22d011bb5aee709",
                "name": "Dune: Part One"
              }
            ],
            "shortDescription": "Атрейдесы прибывают на планету, где им никто не рад. Фантастический эпос Дени Вильнёва с шестью «Оскарами»",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4a297ba39cb704fa9a81855f76ab1d73",
              "imdb": "tt2015381",
              "tmdb": 118340,
              "_id": "6376b9937ad98299ff937ec2"
            },
            "logo": {
              "_id": "62f7050e252c8469efe71c50",
              "url": "https://avatars.mds.yandex.net/get-ott/2385704/2a0000016e11e92154e4c2189debbfb0af18/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5647e97",
              "url": "https://st.kp.yandex.net/images/film_big/689066.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_689066.jpg"
            },
            "rating": {
              "kp": 7.838,
              "imdb": 8,
              "filmCritics": 7.8,
              "russianFilmCritics": 83.3333,
              "await": 95.04,
              "_id": "63d9c4c440a684fbea163cfb"
            },
            "votes": {
              "kp": 667432,
              "imdb": 1189035,
              "filmCritics": 338,
              "russianFilmCritics": 18,
              "await": 46217,
              "_id": "63e7795c68d824d6cabc708d"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7795c68d824d6cabc7093"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/guardians-of-the-galaxy?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7795c68d824d6cabc7092"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7795c68d824d6cabc7095"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/109912?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7795c68d824d6cabc7094"
                }
              ],
              "_id": "63e7795c68d824d6cabc7091"
            },
            "movieLength": 121,
            "id": 689066,
            "type": "movie",
            "name": "Стражи Галактики",
            "description": "Отважному путешественнику Питеру Квиллу попадает в руки таинственный артефакт, принадлежащий могущественному и безжалостному злодею Ронану, строящему коварные планы по захвату Вселенной. Питер оказывается в центре межгалактической охоты, где жертва — он сам.\n\nЕдинственный способ спасти свою жизнь — объединиться с четверкой нелюдимых изгоев: воинственным енотом по кличке Ракета, человекоподобным деревом Грутом, смертельно опасной Гаморой и одержимым жаждой мести Драксом, также известным как Разрушитель. Когда Квилл понимает, какой силой обладает украденный артефакт и какую опасность он представляет для вселенной, одиночка пойдет на все, чтобы сплотить случайных союзников для решающей битвы за судьбу галактики.",
            "year": 2014,
            "alternativeName": "Guardians of the Galaxy",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5647e93",
                "name": "Стражи Галактики"
              },
              {
                "_id": "6339779fc22d011bb5647e94",
                "name": "Guardians of the Galaxy"
              }
            ],
            "shortDescription": "Питер Квилл и горстка неземных лузеров спасают артефакт. Крис Пратт в фильме Джеймса Ганна по комиксу Marvel",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4824a95e60a7db7e86f14137516ba590",
              "imdb": "tt0133093",
              "tmdb": 603,
              "_id": "6376b9907ad98299ff934f3a"
            },
            "logo": {
              "_id": "62f6d3c3252c8469efdcce3f",
              "url": null
            },
            "poster": {
              "_id": "63397ec5c22d011bb58c8f70",
              "url": "https://st.kp.yandex.net/images/film_big/301.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_301.jpg"
            },
            "rating": {
              "_id": "63397ec5c22d011bb58c8f6e",
              "kp": 8.497,
              "imdb": 8.7,
              "filmCritics": 7.8,
              "russianFilmCritics": 60,
              "await": 0
            },
            "votes": {
              "kp": 665918,
              "imdb": 1926490,
              "filmCritics": 161,
              "russianFilmCritics": 5,
              "await": 0,
              "_id": "63e87dc168d824d6ca23cf16"
            },
            "watchability": {
              "items": null,
              "_id": "63ae88c66b290d775e27134a"
            },
            "movieLength": 136,
            "id": 301,
            "type": "movie",
            "name": "Матрица",
            "description": "Жизнь Томаса Андерсона разделена на две части: днём он — самый обычный офисный работник, получающий нагоняи от начальства, а ночью превращается в хакера по имени Нео, и нет места в сети, куда он бы не смог проникнуть. Но однажды всё меняется. Томас узнаёт ужасающую правду о реальности.",
            "year": 1999,
            "alternativeName": "The Matrix",
            "enName": null,
            "names": [
              {
                "_id": "63397ec5c22d011bb58c8f6c",
                "name": "Матрица"
              },
              {
                "_id": "63397ec5c22d011bb58c8f6d",
                "name": "The Matrix"
              }
            ],
            "shortDescription": "Хакер Нео узнает, что его мир — виртуальный. Выдающийся экшен, доказавший, что зрелищное кино может быть умным",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "16658f1fdc3f4506bf4687639275c5c3",
              "_id": "6363aa6d08cbd3f03749ce19"
            },
            "poster": {
              "url": "https://st.kp.yandex.net/images/film_big/5079093.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_5079093.jpg",
              "_id": "6363aa6d08cbd3f03749ce1d"
            },
            "rating": {
              "kp": 7.445,
              "imdb": 0,
              "filmCritics": 0,
              "russianFilmCritics": 78.5714,
              "await": 88.74,
              "_id": "63e58c1068d824d6ca1d9d4d"
            },
            "votes": {
              "kp": 664456,
              "imdb": 0,
              "filmCritics": 0,
              "russianFilmCritics": 14,
              "await": 21670,
              "_id": "63e58c1068d824d6ca1d9d4e"
            },
            "watchability": {
              "items": null,
              "_id": "6363aa6d08cbd3f03749ce3e"
            },
            "id": 5079093,
            "name": "Монастырь",
            "alternativeName": null,
            "names": [
              {
                "name": "Монастырь",
                "_id": "6363aa6d08cbd3f03749ce1a"
              }
            ],
            "type": "tv-series",
            "description": "Мария — обаятельная тусовщица, которая живёт за чужой счёт. Однажды в Эмиратах она едет в ночной клуб вместе с женой миллиардера, вечеринка выходит из-под контроля, и теперь Марии грозит тюрьма, её преследуют опасные люди, а счета оказываются заблокированы. Приходится бежать в Россию, но и дома она не в безопасности — и девушка укрывается в стенах монастыря.",
            "shortDescription": "Московская оторва попадает в монастырь. Завораживающая трансформация Насти Ивлеевой в руках Филиппа Янковского",
            "movieLength": 50,
            "releaseYears": [
              {
                "start": 2022,
                "end": 2022,
                "_id": "636b83545aba03d332f367b6"
              }
            ],
            "year": 2022
          },
          {
            "externalId": {
              "kpHD": "4426da496a131d27a6546e16128f2080",
              "imdb": "tt0468569",
              "tmdb": 155,
              "_id": "6376b9927ad98299ff93748f"
            },
            "logo": {
              "_id": "62ecadcdb2521039876ca982",
              "url": "https://avatars.mds.yandex.net/get-ott/224348/2a00000176f159505eff31a41fe3e4ccf723/orig"
            },
            "poster": {
              "_id": "63398433c22d011bb5a01ea0",
              "url": "https://st.kp.yandex.net/images/film_big/111543.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_111543.jpg"
            },
            "rating": {
              "kp": 8.519,
              "imdb": 9,
              "filmCritics": 8.6,
              "russianFilmCritics": 45.4545,
              "await": 0,
              "_id": "63c5ccc02b1609d669ff53c2"
            },
            "votes": {
              "kp": 662099,
              "imdb": 2672769,
              "filmCritics": 345,
              "russianFilmCritics": 11,
              "await": 1,
              "_id": "63e8019468d824d6cad89836"
            },
            "watchability": {
              "items": null,
              "_id": "63ae60e06b290d775e91969b"
            },
            "movieLength": 152,
            "id": 111543,
            "type": "movie",
            "name": "Темный рыцарь",
            "description": "Бэтмен поднимает ставки в войне с криминалом. С помощью лейтенанта Джима Гордона и прокурора Харви Дента он намерен очистить улицы Готэма от преступности. Сотрудничество оказывается эффективным, но скоро они обнаружат себя посреди хаоса, развязанного восходящим криминальным гением, известным напуганным горожанам под именем Джокер.",
            "year": 2008,
            "alternativeName": "The Dark Knight",
            "enName": null,
            "names": [
              {
                "_id": "63398433c22d011bb5a01e9c",
                "name": "Темный рыцарь"
              },
              {
                "_id": "63398433c22d011bb5a01e9d",
                "name": "The Dark Knight"
              }
            ],
            "shortDescription": "У Бэтмена появляется новый враг — философ-террорист Джокер. Кинокомикс, который вывел жанр на новый уровень",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4279c3b744c498bbb5beedf09a8debcf",
              "imdb": "tt1219289",
              "tmdb": 51876,
              "_id": "6376b98e7ad98299ff93198e"
            },
            "logo": {
              "_id": "62ead78cb252103987469ace",
              "url": "https://avatars.mds.yandex.net/get-ott/2385704/2a0000016e4af6c2eb6d8d847857255fe628/orig"
            },
            "poster": {
              "_id": "6339841fc22d011bb59fd7ad",
              "url": "https://st.kp.yandex.net/images/film_big/462606.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_462606.jpg"
            },
            "rating": {
              "kp": 7.989,
              "imdb": 7.4,
              "filmCritics": 6.4,
              "russianFilmCritics": 75,
              "await": 85.59,
              "_id": "63a0c95b479554e950dc3eb0"
            },
            "votes": {
              "kp": 659427,
              "imdb": 581089,
              "filmCritics": 202,
              "russianFilmCritics": 8,
              "await": 19263,
              "_id": "63e7c92068d824d6ca1cdfa3"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7c92068d824d6ca1cdfa7"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/limitless?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7c92068d824d6ca1cdfa6"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7c92068d824d6ca1cdfa9"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/52652?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7c92068d824d6ca1cdfa8"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e7c92068d824d6ca1cdfab"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/229169927?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e7c92068d824d6ca1cdfaa"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e7c92068d824d6ca1cdfad"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/oblasti-tmy?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e7c92068d824d6ca1cdfac"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e7c92068d824d6ca1cdfaf"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/17331-oblasti-tmy?utm_source=kinopoisk",
                  "_id": "63e7c92068d824d6ca1cdfae"
                }
              ],
              "_id": "63e7c92068d824d6ca1cdfa5"
            },
            "movieLength": 105,
            "id": 462606,
            "type": "movie",
            "name": "Области тьмы",
            "description": "Нью-йоркский писатель Эдди, желая преодолеть чёрную полосу в жизни, принимает засекреченный препарат под названием NZT. Таблетка выводит мозг парня на работу в нереальной мощности. Этот творческий наркотик меняет всю жизнь Эдди, за короткий срок он зарабатывает кучу денег, но скоро начинает страдать от зловещих побочных эффектов препарата. А когда пытается найти других NZT-гениев, чтобы понять, как можно справиться с этим пристрастием, он узнает страшную правду…",
            "year": 2011,
            "alternativeName": "Limitless",
            "enName": null,
            "names": [
              {
                "_id": "6339841fc22d011bb59fd7a9",
                "name": "Области тьмы"
              },
              {
                "_id": "6339841fc22d011bb59fd7aa",
                "name": "Limitless"
              }
            ],
            "shortDescription": "Чудодейственные таблетки выводят писателя из кризиса. Триллер о том, что сверхсила не обходится без побочек",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "49aabf28ca2dbb07abfbad036dcdbff0",
              "imdb": "tt0382932",
              "tmdb": 2062,
              "_id": "6376b9927ad98299ff93783b"
            },
            "logo": {
              "_id": "62f4cba1252c8469ef73904a",
              "url": "https://avatars.mds.yandex.net/get-ott/212840/2a00000178cad05913b4b6c6377bc8405c47/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5647ffb",
              "url": "https://st.kp.yandex.net/images/film_big/89514.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_89514.jpg"
            },
            "rating": {
              "kp": 8.039,
              "imdb": 8.1,
              "filmCritics": 8.5,
              "russianFilmCritics": 100,
              "await": 0,
              "_id": "63e8124668d824d6cab47b34"
            },
            "votes": {
              "kp": 654848,
              "imdb": 747755,
              "filmCritics": 253,
              "russianFilmCritics": 6,
              "await": 0,
              "_id": "63e8124668d824d6cab47b35"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8124768d824d6cab47b75"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/ratatouille?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8124768d824d6cab47b74"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8124768d824d6cab47b77"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/100064?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8124768d824d6cab47b76"
                }
              ],
              "_id": "63e8124768d824d6cab47b73"
            },
            "movieLength": 111,
            "id": 89514,
            "type": "cartoon",
            "name": "Рататуй",
            "description": "Крыс Реми обладает уникальным вкусом. Он готов рисковать собственной жизнью, чтобы посмотреть любимое кулинарное шоу и раздобыть какую-нибудь приправку или просто свежий продукт. Реми живет со своими сородичами, которые его не понимают и не принимают его увлечения кулинарией. Когда Реми случайно попадает на кухню шикарного ресторана, он решает воспользоваться выпавшим ему шансом и проверить свои навыки. \n\nНа эту же кухню попадает и юный Лингвини. Всё, на что он может рассчитывать — это должность уборщика. Но он тоже получает свой шанс.",
            "year": 2007,
            "alternativeName": "Ratatouille",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb5647ff7",
                "name": "Рататуй"
              },
              {
                "_id": "6339779fc22d011bb5647ff8",
                "name": "Ratatouille"
              }
            ],
            "shortDescription": "Крысенок-кулинар попадает на кухню ресторана. Аппетитная комедия с «Оскаром» за лучший анимационный фильм",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4e58356164af1f1e8c640621b4760b6c",
              "imdb": "tt0848228",
              "tmdb": 24428,
              "_id": "6376b9917ad98299ff936f49"
            },
            "logo": {
              "_id": "62f4bb09252c8469ef7017eb",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a0000016e043b52e8a10c1fb3f0a134a986/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb564712f",
              "url": "https://st.kp.yandex.net/images/film_big/263531.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_263531.jpg"
            },
            "rating": {
              "kp": 7.892,
              "imdb": 8,
              "filmCritics": 8.1,
              "russianFilmCritics": 83.3333,
              "await": 93.78,
              "_id": "63e7b42068d824d6ca2b30a9"
            },
            "votes": {
              "kp": 652733,
              "imdb": 1399378,
              "filmCritics": 367,
              "russianFilmCritics": 18,
              "await": 54436,
              "_id": "63e7b42068d824d6ca2b30aa"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7b42068d824d6ca2b30b3"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-avengers-31078?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7b42068d824d6ca2b30b2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7b42068d824d6ca2b30b5"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/93557?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7b42068d824d6ca2b30b4"
                }
              ],
              "_id": "63e7b42068d824d6ca2b30b1"
            },
            "id": 263531,
            "type": "movie",
            "name": "Мстители",
            "description": "Локи, сводный брат Тора, возвращается, и в этот раз он не один. Земля оказывается на грани порабощения, и только лучшие из лучших могут спасти человечество. Глава международной организации Щ.И.Т. Ник Фьюри собирает выдающихся поборников справедливости и добра, чтобы отразить атаку. Под предводительством Капитана Америки Железный Человек, Тор, Невероятный Халк, Соколиный Глаз и Чёрная Вдова вступают в войну с захватчиком.",
            "year": 2012,
            "alternativeName": "The Avengers",
            "enName": null,
            "movieLength": 137,
            "names": [
              {
                "_id": "6339779fc22d011bb564712b",
                "name": "Мстители"
              },
              {
                "_id": "6339779fc22d011bb564712c",
                "name": "The Avengers"
              }
            ],
            "shortDescription": "Команда супергероев дает отпор скандинавскому богу Локи. Начало фантастической саги в киновселенной Marvel",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4d757e043db71463a2014d864138a5ff",
              "imdb": "tt1853728",
              "tmdb": 68718,
              "_id": "6376b9977ad98299ff93cb47"
            },
            "logo": {
              "_id": "62f2a21a252c8469efcde0ad",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a00000170cfa903c504effbb48cb6d55881/orig"
            },
            "poster": {
              "_id": "63398767c22d011bb5ab2961",
              "url": "https://st.kp.yandex.net/images/film_big/586397.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_586397.jpg"
            },
            "rating": {
              "kp": 8.23,
              "imdb": 8.4,
              "filmCritics": 8,
              "russianFilmCritics": 88.2353,
              "await": 92.92,
              "_id": "63e7b07468d824d6caf6b267"
            },
            "votes": {
              "kp": 635471,
              "imdb": 1568683,
              "filmCritics": 298,
              "russianFilmCritics": 34,
              "await": 38000,
              "_id": "63e7b07468d824d6caf6b268"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7b07468d824d6caf6b26c"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/98382?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7b07468d824d6caf6b26b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                    "_id": "63e7b07468d824d6caf6b26e"
                  },
                  "name": "START",
                  "url": "https://start.ru/watch/dzhango-osvobozhdyonnyy?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=dzhango-osvobozhdyonnyy",
                  "_id": "63e7b07468d824d6caf6b26d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e7b07468d824d6caf6b270"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/dzhango-osvobozhdyennyy-2012/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e7b07468d824d6caf6b26f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e7b07468d824d6caf6b272"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/54981043?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e7b07468d824d6caf6b271"
                }
              ],
              "_id": "63e7b07468d824d6caf6b26a"
            },
            "movieLength": 165,
            "id": 586397,
            "type": "movie",
            "name": "Джанго освобожденный",
            "description": "Шульц — эксцентричный охотник за головами, который выслеживает и отстреливает самых опасных преступников. Он освобождает раба по имени Джанго, поскольку тот может помочь ему в поисках трёх бандитов. Джанго знает этих парней в лицо, ведь у него с ними свои счёты.",
            "year": 2012,
            "alternativeName": "Django Unchained",
            "enName": null,
            "names": [
              {
                "_id": "63398767c22d011bb5ab295d",
                "name": "Джанго освобожденный"
              },
              {
                "_id": "63398767c22d011bb5ab295e",
                "name": "Django Unchained"
              }
            ],
            "shortDescription": "Метко шутя и стреляя, охотники за головами уничтожают негодяев. Квентин Тарантино пробует силы в вестерне",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4e618e9ed093491eb17650097198c56e",
              "imdb": "tt3569230",
              "tmdb": 276907,
              "_id": "6376b9977ad98299ff93de66"
            },
            "logo": {
              "_id": "62f55020252c8469ef8e2813",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a0000016ef58845361034a2fa24360fdc21/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb56474b0",
              "url": "https://st.kp.yandex.net/images/film_big/839954.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_839954.jpg"
            },
            "rating": {
              "kp": 7.183,
              "imdb": 6.9,
              "filmCritics": 5.9,
              "russianFilmCritics": 76.9231,
              "await": 96.09,
              "_id": "63e745f968d824d6ca951c6e"
            },
            "votes": {
              "kp": 632697,
              "imdb": 187128,
              "filmCritics": 171,
              "russianFilmCritics": 13,
              "await": 16065,
              "_id": "63e745f968d824d6ca951c6f"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e745f968d824d6ca951c73"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/128104?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e745f968d824d6ca951c72"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e745f968d824d6ca951c75"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/legenda?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e745f968d824d6ca951c74"
                }
              ],
              "_id": "63e745f968d824d6ca951c71"
            },
            "id": 839954,
            "type": "movie",
            "name": "Легенда",
            "description": "Близнецы Реджи и Ронни Крэй — культовые фигуры преступного мира Великобритании 1960-х. Братья возглавляли самую влиятельную бандитскую группировку Ист-Энда. В их послужном списке были вооруженные грабежи, рэкет, поджоги, покушения, убийства и собственный ночной клуб, куда доезжали даже голливудские знаменитости. Среди их жертв — криминальные авторитеты Джек МакВитти и Джордж Корнелл.",
            "year": 2015,
            "alternativeName": "Legend",
            "enName": null,
            "movieLength": 131,
            "names": [
              {
                "_id": "6339779fc22d011bb56474ac",
                "name": "Легенда"
              },
              {
                "_id": "6339779fc22d011bb56474ad",
                "name": "Legend"
              }
            ],
            "shortDescription": "Гангстеры-близнецы завоевывают Лондон 1960-х. Драма о знаменитых преступниках с двойной ролью Тома Харди",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4e674f4389d244b185ee6c8f13794bc2",
              "imdb": "tt0068519",
              "tmdb": 20871,
              "_id": "6376b9997ad98299ff93f331"
            },
            "logo": {
              "_id": "62ef43480f5be412466121f2",
              "url": null
            },
            "poster": {
              "_id": "6339872fc22d011bb5aa5e53",
              "url": "https://st.kp.yandex.net/images/film_big/44386.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_44386.jpg"
            },
            "rating": {
              "kp": 8.54,
              "imdb": 8.4,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63cf9d0a57101ffd3962725f"
            },
            "votes": {
              "kp": 630739,
              "imdb": 11987,
              "filmCritics": 0,
              "russianFilmCritics": 1,
              "await": 0,
              "_id": "63e929d668d824d6ca807eba"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e929d668d824d6ca807ebe"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/dzhentlmeny-udachi-74424?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e929d668d824d6ca807ebd"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e929d668d824d6ca807ec0"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/53016?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e929d668d824d6ca807ebf"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e929d668d824d6ca807ec2"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/599188992?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e929d668d824d6ca807ec1"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e929d668d824d6ca807ec4"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/12366?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e929d668d824d6ca807ec3"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e929d668d824d6ca807ec6"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/dzhentlmeny-udachi-1971/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e929d668d824d6ca807ec5"
                }
              ],
              "_id": "63e929d668d824d6ca807ebc"
            },
            "id": 44386,
            "type": "movie",
            "name": "Джентльмены удачи",
            "description": "Заведующему детсадом Трошкину фатально не повезло: он оказался как две капли воды похож на бандита по кличке «Доцент», похитившего уникальный шлем Александра Македонского.\n\nМилиция внедряет добряка Трошкина в воровскую среду - и ему ничего не остается, кроме как старательно изображать своего двойника-злодея, путая всех окружающих. Со временем он настолько блестяще входит в роль, что сам начинает порой приходить в ужас. Между тем, жизни его угрожает смертельная опасность...",
            "year": 1971,
            "alternativeName": null,
            "enName": null,
            "movieLength": 84,
            "names": [
              {
                "_id": "6339872fc22d011bb5aa5e50",
                "name": "Джентльмены удачи"
              }
            ],
            "shortDescription": "Воспитатель детсада внедряется в банду матерых рецидивистов. Евгений Леонов в разошедшейся на цитаты комедии",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4ba3dd505807f37b9644e902e4c5a9f6",
              "imdb": "tt0264464",
              "tmdb": 640,
              "_id": "6376b99c7ad98299ff9436ee"
            },
            "logo": {
              "_id": "62dd4be0028619ccaf755b3e",
              "url": "https://avatars.mds.yandex.net/get-ott/1648503/2a00000170ed493266088fc0739ab3c58d12/orig"
            },
            "poster": {
              "_id": "633977a0c22d011bb5648e86",
              "url": "https://st.kp.yandex.net/images/film_big/324.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_324.jpg"
            },
            "rating": {
              "kp": 8.524,
              "imdb": 8.1,
              "filmCritics": 7.9,
              "russianFilmCritics": 80,
              "await": 0,
              "_id": "63d6279cf38219e94f32f672"
            },
            "votes": {
              "kp": 628190,
              "imdb": 996319,
              "filmCritics": 202,
              "russianFilmCritics": 5,
              "await": 0,
              "_id": "63e8649268d824d6ca7ee5da"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8649268d824d6ca7ee5dd"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/catch-me-if-you-can?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8649268d824d6ca7ee5dc"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8649268d824d6ca7ee5df"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/99165?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8649268d824d6ca7ee5de"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e8649268d824d6ca7ee5e1"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/111886417?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e8649268d824d6ca7ee5e0"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e8649268d824d6ca7ee5e3"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/16908?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e8649268d824d6ca7ee5e2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e8649268d824d6ca7ee5e5"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/2190124?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e8649268d824d6ca7ee5e4"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e8649268d824d6ca7ee5e7"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/poymay-menya-esli-smozhesh?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e8649268d824d6ca7ee5e6"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e8649268d824d6ca7ee5e9"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/22422-pojmaj-menya-esli-smozhesh?utm_source=kinopoisk",
                  "_id": "63e8649268d824d6ca7ee5e8"
                }
              ],
              "_id": "63e8649268d824d6ca7ee5db"
            },
            "movieLength": 141,
            "id": 324,
            "type": "movie",
            "name": "Поймай меня, если сможешь",
            "description": "Фрэнк Эбегнейл успел поработать врачом, адвокатом и пилотом на пассажирской авиалинии – и все это до достижения полного совершеннолетия в 21 год. Мастер в обмане и жульничестве, он также обладал искусством подделки документов, что в конечном счете принесло ему миллионы долларов, которые он получил по фальшивым чекам.\n\nАгент ФБР Карл Хэнрэтти отдал бы все, чтобы схватить Фрэнка и привлечь к ответственности за свои деяния, но Фрэнк всегда опережает его на шаг, заставляя продолжать погоню.",
            "year": 2002,
            "alternativeName": "Catch Me If You Can",
            "enName": null,
            "names": [
              {
                "_id": "633977a0c22d011bb5648e82",
                "name": "Поймай меня, если сможешь"
              },
              {
                "_id": "633977a0c22d011bb5648e83",
                "name": "Catch Me If You Can"
              }
            ],
            "shortDescription": "Виртуозный аферист годами водит за нос ФБР. Хит Стивена Спилберга по реальным событиям с Леонардо ДиКаприо ",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4eac76d69bdb21d9aa2945deb6ba8d7f",
              "imdb": "tt0110357",
              "tmdb": 8587,
              "_id": "6376b9957ad98299ff939640"
            },
            "logo": {
              "_id": "62eb89b2b252103987baef8b",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a0000016e044a3db74ffde3e15fc9a558cc/orig"
            },
            "poster": {
              "_id": "63397be6c22d011bb57dcd8c",
              "url": "https://st.kp.yandex.net/images/film_big/2360.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_2360.jpg"
            },
            "rating": {
              "kp": 8.775,
              "imdb": 8.5,
              "filmCritics": 8.5,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8b72668d824d6cad04d77"
            },
            "votes": {
              "kp": 623874,
              "imdb": 1067007,
              "filmCritics": 136,
              "russianFilmCritics": 2,
              "await": 0,
              "_id": "63e8b72668d824d6cad04d78"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8b72668d824d6cad04d7e"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-lion-king?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8b72668d824d6cad04d7d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8b72668d824d6cad04d80"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/105687?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8b72668d824d6cad04d7f"
                }
              ],
              "_id": "63e8b72668d824d6cad04d7c"
            },
            "movieLength": 88,
            "id": 2360,
            "type": "cartoon",
            "name": "Король Лев",
            "description": "У величественного Короля-Льва Муфасы рождается наследник по имени Симба. Уже в детстве любознательный малыш становится жертвой интриг своего завистливого дяди Шрама, мечтающего о власти.\n\nСимба познаёт горе утраты, предательство и изгнание, но в конце концов обретает верных друзей и находит любимую. Закалённый испытаниями, он в нелёгкой борьбе отвоёвывает своё законное место в «Круге жизни», осознав, что значит быть настоящим Королём. ",
            "year": 1994,
            "alternativeName": "The Lion King",
            "enName": null,
            "names": [
              {
                "_id": "63397be6c22d011bb57dcd88",
                "name": "Король Лев"
              },
              {
                "_id": "63397be6c22d011bb57dcd89",
                "name": "The Lion King"
              }
            ],
            "shortDescription": "Львенок Симба бросает вызов дяде-убийце. Величественный саундтрек, рисованная анимация и шекспировский размах",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4ad80bb0eadac154a255cbd395e093e9",
              "imdb": "tt0126029",
              "tmdb": 808,
              "_id": "6376b99d7ad98299ff944c96"
            },
            "logo": {
              "_id": "62f463dd252c8469ef5e08b2",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a000001706322b7aab311a80769a58e93d4/orig"
            },
            "poster": {
              "_id": "633977a0c22d011bb564906a",
              "url": "https://st.kp.yandex.net/images/film_big/430.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_430.jpg"
            },
            "rating": {
              "kp": 8.104,
              "imdb": 7.9,
              "filmCritics": 7.8,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8751868d824d6ca88f0b4"
            },
            "votes": {
              "kp": 613204,
              "imdb": 687084,
              "filmCritics": 211,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8751868d824d6ca88f0b5"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8751868d824d6ca88f0be"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/shrek?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8751868d824d6ca88f0bd"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8751868d824d6ca88f0c0"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/99983?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8751868d824d6ca88f0bf"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e8751868d824d6ca88f0c2"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/160222045?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e8751868d824d6ca88f0c1"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e8751868d824d6ca88f0c4"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/16507?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e8751868d824d6ca88f0c3"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e8751868d824d6ca88f0c6"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/74302696?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e8751868d824d6ca88f0c5"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e8751868d824d6ca88f0c8"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/shrek?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e8751868d824d6ca88f0c7"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e8751868d824d6ca88f0ca"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/618e0564bb003f90038b39c1?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e8751868d824d6ca88f0c9"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e8751868d824d6ca88f0cc"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/17575-shrek?utm_source=kinopoisk",
                  "_id": "63e8751868d824d6ca88f0cb"
                }
              ],
              "_id": "63e8751868d824d6ca88f0bc"
            },
            "movieLength": 90,
            "id": 430,
            "type": "cartoon",
            "name": "Шрэк",
            "description": "Жил да был в сказочном государстве большой зеленый великан по имени Шрэк. Жил он в гордом одиночестве в лесу, на болоте, которое считал своим. Но однажды злобный коротышка — лорд Фаркуад, правитель волшебного королевства, безжалостно согнал на Шрэково болото всех сказочных обитателей.\n\nИ беспечной жизни зеленого великана пришел конец. Но лорд Фаркуад пообещал вернуть Шрэку болото, если великан добудет ему прекрасную принцессу Фиону, которая томится в неприступной башне, охраняемой огнедышащим драконом.",
            "year": 2001,
            "alternativeName": "Shrek",
            "enName": null,
            "names": [
              {
                "_id": "633977a0c22d011bb5649066",
                "name": "Шрэк"
              },
              {
                "_id": "633977a0c22d011bb5649067",
                "name": "Shrek"
              }
            ],
            "shortDescription": "Огр-мизантроп спасает принцессу, чтобы вернуть свое болото. Революционная анимация о том, что красота — внутри",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "47a38f03dce381358fa79811f98e8e9e",
              "imdb": "tt1431045",
              "tmdb": 293660,
              "_id": "6376b9967ad98299ff93b967"
            },
            "logo": {
              "_id": "62ed78aab252103987e5e664",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a000001725520dbcd79e1c66b058176b54b/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb5648790",
              "url": "https://st.kp.yandex.net/images/film_big/462360.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_462360.jpg"
            },
            "rating": {
              "kp": 7.556,
              "imdb": 8,
              "filmCritics": 7.1,
              "russianFilmCritics": 100,
              "await": 95.11,
              "_id": "63e7200768d824d6ca1d3bbc"
            },
            "votes": {
              "kp": 612971,
              "imdb": 1048108,
              "filmCritics": 349,
              "russianFilmCritics": 16,
              "await": 84887,
              "_id": "63e7200768d824d6ca1d3bbd"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7200768d824d6ca1d3c1f"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/deadpool?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7200768d824d6ca1d3c1e"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7200768d824d6ca1d3c21"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/131261?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7200768d824d6ca1d3c20"
                }
              ],
              "_id": "63e7200768d824d6ca1d3c1d"
            },
            "movieLength": 108,
            "id": 462360,
            "type": "movie",
            "name": "Дэдпул",
            "description": "Уэйд Уилсон — наёмник. Будучи побочным продуктом программы вооружённых сил под названием «Оружие X», Уилсон приобрёл невероятную силу, проворство и способность к исцелению. Но страшной ценой: его клеточная структура постоянно меняется, а здравомыслие сомнительно. Всё, чего хочет Уилсон, — держаться на плаву в социальной выгребной яме. Но течение в ней слишком быстрое.",
            "year": 2016,
            "alternativeName": "Deadpool",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb564878c",
                "name": "Дэдпул"
              },
              {
                "_id": "6339779fc22d011bb564878d",
                "name": "Deadpool"
              }
            ],
            "shortDescription": "Бывший наемник становится сверхчеловеком поневоле. Безбашенный блокбастер о самом дерзком супергерое Marvel",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4db90bea36e15d319bd62aafb769f487",
              "imdb": "tt0988045",
              "tmdb": 10528,
              "_id": "6376b99a7ad98299ff940c98"
            },
            "logo": {
              "_id": "62f2e56c252c8469eff8b91c",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a00000170ed76563839fe9830642b60c50b/orig"
            },
            "poster": {
              "_id": "6339779fc22d011bb564857f",
              "url": "https://st.kp.yandex.net/images/film_big/420923.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_420923.jpg"
            },
            "rating": {
              "kp": 8.063,
              "imdb": 7.6,
              "filmCritics": 6.2,
              "russianFilmCritics": 100,
              "await": 83.06,
              "_id": "63d70ddaf38219e94f6ff041"
            },
            "votes": {
              "kp": 609649,
              "imdb": 640727,
              "filmCritics": 249,
              "russianFilmCritics": 8,
              "await": 29388,
              "_id": "63e7efd668d824d6ca020135"
            },
            "watchability": {
              "items": null,
              "_id": "63ae5b1b6b290d775e547640"
            },
            "movieLength": 128,
            "id": 420923,
            "type": "movie",
            "name": "Шерлок Холмс",
            "description": "Величайший в истории сыщик Шерлок Холмс вместе со своим верным соратником Ватсоном вступают в схватку, требующую нешуточной физической и умственной подготовки, ведь их враг представляет угрозу для всего Лондона.",
            "year": 2009,
            "alternativeName": "Sherlock Holmes",
            "enName": null,
            "names": [
              {
                "_id": "6339779fc22d011bb564857b",
                "name": "Шерлок Холмс"
              },
              {
                "_id": "6339779fc22d011bb564857c",
                "name": "Sherlock Holmes"
              }
            ],
            "shortDescription": "Великий сыщик преследует воскресшего из мертвых чернокнижника. Бодрый детектив Гая Ричи, первая часть франшизы",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "49e57db5137c7ed0829715a09db575f6",
              "imdb": "tt2380307",
              "tmdb": 354912,
              "_id": "6376b99f7ad98299ff946df0"
            },
            "logo": {
              "_id": "62e46e22028619ccaf734c23",
              "url": "https://avatars.mds.yandex.net/get-ott/2419418/2a0000016e043a226253ed309d7a01d84b6f/orig"
            },
            "poster": {
              "_id": "6339851ac22d011bb5a35105",
              "url": "https://st.kp.yandex.net/images/film_big/679486.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_679486.jpg"
            },
            "rating": {
              "kp": 8.715,
              "imdb": 8.4,
              "filmCritics": 8.3,
              "russianFilmCritics": 94.1176,
              "await": 97.51,
              "_id": "63e6f03a68d824d6cad03cd9"
            },
            "votes": {
              "kp": 607366,
              "imdb": 517378,
              "filmCritics": 356,
              "russianFilmCritics": 17,
              "await": 2830,
              "_id": "63e6f03a68d824d6cad03cda"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e6f03a68d824d6cad03cde"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/coco?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e6f03a68d824d6cad03cdd"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e6f03a68d824d6cad03ce0"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/138449?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e6f03a68d824d6cad03cdf"
                }
              ],
              "_id": "63e6f03a68d824d6cad03cdc"
            },
            "movieLength": 105,
            "id": 679486,
            "type": "cartoon",
            "name": "Тайна Коко",
            "description": "12-летний Мигель живёт в мексиканской деревушке в семье сапожников и тайно мечтает стать музыкантом. Тайно, потому что в его семье музыка считается проклятием. Когда-то его прапрадед оставил жену, прапрабабку Мигеля, ради мечты, которая теперь не даёт спокойно жить и его праправнуку. С тех пор музыкальная тема в семье стала табу. Мигель обнаруживает, что между ним и его любимым певцом Эрнесто де ла Крусом, ныне покойным, существует некая связь. Паренёк отправляется к своему кумиру в Страну Мёртвых, где встречает души предков. Мигель знакомится там с духом-скелетом по имени Гектор, который становится его проводником. Вдвоём они отправляются на поиски де ла Круса.",
            "year": 2017,
            "alternativeName": "Coco",
            "enName": null,
            "names": [
              {
                "_id": "6339851ac22d011bb5a35101",
                "name": "Тайна Коко"
              },
              {
                "_id": "6339851ac22d011bb5a35102",
                "name": "Coco"
              }
            ],
            "shortDescription": "Юный музыкант Мигель попадает в мир мертвых. Трогательная история о любви без границ, получившая два «Оскара»",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "422c2eeee174f1cda1d00737488edc1a",
              "imdb": "tt1950186",
              "tmdb": 359724,
              "_id": "6376b9a27ad98299ff94b00f"
            },
            "logo": {
              "_id": "62f69ada252c8469efd1471b",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a000001701068309f9ea919c912ea2c9f41/orig"
            },
            "poster": {
              "_id": "6339803bc22d011bb5928de0",
              "url": "https://st.kp.yandex.net/images/film_big/835086.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_835086.jpg"
            },
            "rating": {
              "kp": 8.243,
              "imdb": 8.1,
              "filmCritics": 7.8,
              "russianFilmCritics": 81.8182,
              "await": 96.61,
              "_id": "63e638ed68d824d6ca157fb8"
            },
            "votes": {
              "kp": 606270,
              "imdb": 402227,
              "filmCritics": 361,
              "russianFilmCritics": 11,
              "await": 13502,
              "_id": "63e638ed68d824d6ca157fb9"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e638ed68d824d6ca157fbc"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/ford-v-ferrari?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e638ed68d824d6ca157fbb"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e638ed68d824d6ca157fbe"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/215176?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e638ed68d824d6ca157fbd"
                }
              ],
              "_id": "63e638ed68d824d6ca157fba"
            },
            "movieLength": 152,
            "id": 835086,
            "type": "movie",
            "name": "Ford против Ferrari",
            "description": "В начале 1960-х Генри Форд II принимает решение улучшить имидж компании и сменить курс на производство более модных автомобилей. После неудавшейся попытки купить практически банкрота Ferrari американцы решают бросить вызов итальянским конкурентам на трассе и выиграть престижную гонку 24 часа Ле-Мана. Чтобы создать подходящую машину, компания нанимает автоконструктора Кэррола Шэлби, а тот отказывается работать без выдающегося, но, как считается, трудного в общении гонщика Кена Майлза. Вместе они принимаются за разработку впоследствии знаменитого спорткара Ford GT40.",
            "year": 2019,
            "alternativeName": "Ford v Ferrari",
            "enName": null,
            "names": [
              {
                "_id": "6339803bc22d011bb5928ddc",
                "name": "Ford против Ferrari"
              },
              {
                "_id": "6339803bc22d011bb5928ddd",
                "name": "Ford v Ferrari"
              }
            ],
            "shortDescription": "Автоконструктор и строптивый гонщик против непобедимых конкурентов. Биографическая драма о любви к скорости",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4b1c140be7efc668a518bb8718ba159f",
              "imdb": "tt0120737",
              "tmdb": 120,
              "_id": "6376b9987ad98299ff93e87a"
            },
            "logo": {
              "_id": "62f147690f5be412469c023d",
              "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a000001714e8c3b6a57d19aebf13bcafe4f/orig"
            },
            "poster": {
              "_id": "63397dc6c22d011bb58782fe",
              "url": "https://st.kp.yandex.net/images/film_big/328.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_328.jpg"
            },
            "rating": {
              "kp": 8.602,
              "imdb": 8.8,
              "filmCritics": 8.2,
              "russianFilmCritics": 71.4286,
              "await": 0,
              "_id": "63e8752368d824d6ca8a13e4"
            },
            "votes": {
              "kp": 603640,
              "imdb": 1888313,
              "filmCritics": 234,
              "russianFilmCritics": 7,
              "await": 0,
              "_id": "63e8752368d824d6ca8a13e5"
            },
            "watchability": {
              "items": null,
              "_id": "63ae82176b290d775ee2e267"
            },
            "movieLength": 178,
            "id": 328,
            "type": "movie",
            "name": "Властелин колец: Братство Кольца",
            "description": "Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал неограниченную власть, но был обязан служить злу. \n\nТихая деревня, где живут хоббиты. Придя на 111-й день рождения к своему старому другу Бильбо Бэггинсу, волшебник Гэндальф начинает вести разговор о кольце, которое Бильбо нашел много лет назад. Это кольцо принадлежало когда-то темному властителю Средиземья Саурону, и оно дает большую власть своему обладателю. Теперь Саурон хочет вернуть себе власть над Средиземьем. Бильбо отдает Кольцо племяннику Фродо, чтобы тот отнёс его к Роковой Горе и уничтожил.",
            "year": 2001,
            "alternativeName": "The Lord of the Rings: The Fellowship of the Ring",
            "enName": null,
            "names": [
              {
                "_id": "63397dc6c22d011bb58782fa",
                "name": "Властелин колец: Братство Кольца"
              },
              {
                "_id": "63397dc6c22d011bb58782fb",
                "name": "The Lord of the Rings: The Fellowship of the Ring"
              }
            ],
            "shortDescription": "Фродо Бэггинс отправляется спасать Средиземье. Первая часть культовой фэнтези-трилогии Питера Джексона",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "471181c2383a244a97fd843cee0f044a",
              "imdb": "tt0910970",
              "tmdb": 10681,
              "_id": "6376b99d7ad98299ff945726"
            },
            "logo": {
              "_id": "62f29a3f252c8469efc87df7",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a0000016e4af2e7c9f986c307f1feb96141/orig"
            },
            "poster": {
              "_id": "633977a0c22d011bb5648fc2",
              "url": "https://st.kp.yandex.net/images/film_big/279102.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_279102.jpg"
            },
            "rating": {
              "kp": 8.357,
              "imdb": 8.4,
              "filmCritics": 8.6,
              "russianFilmCritics": 93.3333,
              "await": 0,
              "_id": "63e800d468d824d6cacbe89e"
            },
            "votes": {
              "kp": 600206,
              "imdb": 1124533,
              "filmCritics": 261,
              "russianFilmCritics": 15,
              "await": 0,
              "_id": "63e800d468d824d6cacbe89f"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e800d468d824d6cacbe8a2"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/walle?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e800d468d824d6cacbe8a1"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e800d468d824d6cacbe8a4"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/58265?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e800d468d824d6cacbe8a3"
                }
              ],
              "_id": "63e800d468d824d6cacbe8a0"
            },
            "movieLength": 98,
            "id": 279102,
            "type": "cartoon",
            "name": "ВАЛЛ·И",
            "description": "Робот ВАЛЛ·И из года в год прилежно трудится на опустевшей Земле, очищая нашу планету от гор мусора, которые оставили после себя улетевшие в космос люди. Он и не представляет, что совсем скоро произойдут невероятные события, благодаря которым он встретит друзей, поднимется к звездам и даже сумеет изменить к лучшему своих бывших хозяев, совсем позабывших родную Землю.",
            "year": 2008,
            "alternativeName": "WALL·E",
            "enName": null,
            "names": [
              {
                "_id": "633977a0c22d011bb5648fbe",
                "name": "ВАЛЛ·И"
              },
              {
                "_id": "633977a0c22d011bb5648fbf",
                "name": "WALL·E"
              }
            ],
            "shortDescription": "Люди покинули Землю и оставили робота собирать за ними мусор. Экологический шедевр Pixar",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4964f658870ba92086f5bc1f7d675331",
              "imdb": "tt0172495",
              "tmdb": 98,
              "_id": "6376b99b7ad98299ff94258e"
            },
            "logo": {
              "_id": "62f4b06a252c8469ef6df83c",
              "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a000001720e23e8084f0b54c4441bab5f0c/orig"
            },
            "poster": {
              "_id": "63398397c22d011bb59e0da9",
              "url": "https://st.kp.yandex.net/images/film_big/474.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_474.jpg"
            },
            "rating": {
              "kp": 8.582,
              "imdb": 8.5,
              "filmCritics": 7.4,
              "russianFilmCritics": 50,
              "await": 0,
              "_id": "63da400e351d7a08b1c31cd4"
            },
            "votes": {
              "kp": 598458,
              "imdb": 1511629,
              "filmCritics": 253,
              "russianFilmCritics": 4,
              "await": 1,
              "_id": "63e885c968d824d6cabbd957"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e885c968d824d6cabbd95b"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/90284?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e885c968d824d6cabbd95a"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e885c968d824d6cabbd95d"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/163676970?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e885c968d824d6cabbd95c"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e885c968d824d6cabbd95f"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/70741468?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e885c968d824d6cabbd95e"
                }
              ],
              "_id": "63e885c968d824d6cabbd959"
            },
            "movieLength": 155,
            "id": 474,
            "type": "movie",
            "name": "Гладиатор",
            "description": "В великой Римской империи не было военачальника, равного генералу Максимусу. Непобедимые легионы, которыми командовал этот благородный воин, боготворили его и могли последовать за ним даже в ад.\n\nНо случилось так, что отважный Максимус, готовый сразиться с любым противником в честном бою, оказался бессилен против вероломных придворных интриг. Генерала предали и приговорили к смерти. Чудом избежав гибели, Максимус становится гладиатором.\n\nБыстро снискав себе славу в кровавых поединках, он оказывается в знаменитом римском Колизее, на арене которого он встретится в смертельной схватке со своим заклятым врагом...",
            "year": 2000,
            "alternativeName": "Gladiator",
            "enName": null,
            "names": [
              {
                "_id": "63398397c22d011bb59e0da5",
                "name": "Гладиатор"
              },
              {
                "_id": "63398397c22d011bb59e0da6",
                "name": "Gladiator"
              }
            ],
            "shortDescription": "Отважный генерал, ставший рабом, мстит империи. Культовая историческая драма Ридли Скотта с пятью «Оскарами»",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "468d3b0de3fd9aeba85fad1010196b86",
              "imdb": "tt0088763",
              "tmdb": 105,
              "_id": "6376b9a37ad98299ff94bb35"
            },
            "logo": {
              "_id": "62f620b9252c8469efb86f6e",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016eadd2590232b1f0f0ea7b27b0b0/orig"
            },
            "poster": {
              "_id": "63397a5ec22d011bb5754749",
              "url": "https://st.kp.yandex.net/images/film_big/476.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_476.jpg"
            },
            "rating": {
              "kp": 8.644,
              "imdb": 8.5,
              "filmCritics": 8.8,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63b2a6784d1de3ae1925c65e"
            },
            "votes": {
              "kp": 595977,
              "imdb": 1216086,
              "filmCritics": 88,
              "russianFilmCritics": 2,
              "await": 1,
              "_id": "63e8e97768d824d6ca84f86c"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8e97768d824d6ca84f872"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/90324?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8e97768d824d6ca84f871"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e8e97768d824d6ca84f874"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/161293491?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e8e97768d824d6ca84f873"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e8e97768d824d6ca84f876"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/72678262?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e8e97768d824d6ca84f875"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e8e97768d824d6ca84f878"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/61c561e4bb003f9003c75399?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e8e97768d824d6ca84f877"
                }
              ],
              "_id": "63e8e97768d824d6ca84f870"
            },
            "movieLength": 116,
            "id": 476,
            "type": "movie",
            "name": "Назад в будущее",
            "description": "Подросток Марти с помощью машины времени, сооружённой его другом-профессором доком Брауном, попадает из 80-х в далекие 50-е. Там он встречается со своими будущими родителями, ещё подростками, и другом-профессором, совсем молодым.",
            "year": 1985,
            "alternativeName": "Back to the Future",
            "enName": null,
            "names": [
              {
                "_id": "63397a5ec22d011bb5754745",
                "name": "Назад в будущее"
              },
              {
                "_id": "63397a5ec22d011bb5754746",
                "name": "Back to the Future"
              }
            ],
            "shortDescription": "Безумный ученый и 17-летний оболтус тестируют машину времени, наводя шороху в 1950-х. Классика кинофантастики",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": null,
              "imdb": "tt0110413",
              "tmdb": 101,
              "_id": "6376b99e7ad98299ff945f23"
            },
            "logo": {
              "_id": "62f2d657252c8469efee816c",
              "url": null
            },
            "poster": {
              "_id": "63397ec4c22d011bb58c8bb9",
              "url": "https://st.kp.yandex.net/images/film_big/389.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_389.jpg"
            },
            "rating": {
              "kp": 8.669,
              "imdb": 8.5,
              "filmCritics": 6.9,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63bbf3a20b7d940e833caf06"
            },
            "votes": {
              "kp": 589695,
              "imdb": 1170660,
              "filmCritics": 65,
              "russianFilmCritics": 2,
              "await": 0,
              "_id": "63e8b6e668d824d6cac892a0"
            },
            "watchability": {
              "_id": "63397ec4c22d011bb58c8c20",
              "items": null
            },
            "id": 389,
            "type": "movie",
            "name": "Леон",
            "description": "Профессиональный убийца Леон неожиданно для себя самого решает помочь 12-летней соседке Матильде, семью которой убили коррумпированные полицейские.",
            "year": 1994,
            "alternativeName": "Léon",
            "enName": null,
            "names": [
              {
                "_id": "63397ec4c22d011bb58c8bb5",
                "name": "Леон"
              },
              {
                "_id": "63397ec4c22d011bb58c8bb6",
                "name": "Léon"
              }
            ],
            "movieLength": 133,
            "shortDescription": null,
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4319afe5d620cda19b8d2588e9081849",
              "imdb": "tt0304141",
              "tmdb": 673,
              "_id": "6376b9a77ad98299ff9518b1"
            },
            "logo": {
              "_id": "62f4c196252c8469ef7170db",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000017e1279bdad156b0db18e10058195/orig"
            },
            "poster": {
              "_id": "633977a1c22d011bb5649991",
              "url": "https://st.kp.yandex.net/images/film_big/322.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_322.jpg"
            },
            "rating": {
              "kp": 8.218,
              "imdb": 7.9,
              "filmCritics": 7.9,
              "russianFilmCritics": 80,
              "await": 0,
              "_id": "63e8412c68d824d6ca70f489"
            },
            "votes": {
              "kp": 587002,
              "imdb": 643364,
              "filmCritics": 259,
              "russianFilmCritics": 5,
              "await": 0,
              "_id": "63e8412c68d824d6ca70f48a"
            },
            "watchability": {
              "items": null,
              "_id": "63e8412c68d824d6ca70f493"
            },
            "movieLength": 142,
            "id": 322,
            "type": "movie",
            "name": "Гарри Поттер и узник Азкабана",
            "description": "В третьей части истории о юном волшебнике полюбившиеся всем герои — Гарри Поттер, Рон и Гермиона — возвращаются уже на третий курс школы чародейства и волшебства Хогвартс. На этот раз они должны раскрыть тайну узника, сбежавшего из зловещей тюрьмы Азкабан, чье пребывание на воле создает для Гарри смертельную опасность...",
            "year": 2004,
            "alternativeName": "Harry Potter and the Prisoner of Azkaban",
            "enName": null,
            "names": [
              {
                "_id": "633977a1c22d011bb564998d",
                "name": "Гарри Поттер и узник Азкабана"
              },
              {
                "_id": "633977a1c22d011bb564998e",
                "name": "Harry Potter and the Prisoner of Azkaban"
              }
            ],
            "shortDescription": "Беглый маг, тайны прошлого и путешествия во времени. В третьей части поттерианы Альфонсо Куарон сгущает краски",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4508c727798ae209b6f18f57c04ec865",
              "imdb": "tt3659388",
              "tmdb": 286217,
              "_id": "6376b9a07ad98299ff9487c8"
            },
            "logo": {
              "_id": "62f75077252c8469eff6973a",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a0000017c4ca064394d460243f06faf4702/orig"
            },
            "poster": {
              "_id": "63398243c22d011bb5998e46",
              "url": "https://st.kp.yandex.net/images/film_big/841700.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_841700.jpg"
            },
            "rating": {
              "kp": 7.756,
              "imdb": 8,
              "filmCritics": 7.9,
              "russianFilmCritics": 95.2381,
              "await": 97.82,
              "_id": "63e7457d68d824d6ca8de349"
            },
            "votes": {
              "kp": 585437,
              "imdb": 864280,
              "filmCritics": 386,
              "russianFilmCritics": 21,
              "await": 59667,
              "_id": "63e7457d68d824d6ca8de34a"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7457d68d824d6ca8de34e"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-martian?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7457d68d824d6ca8de34d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7457d68d824d6ca8de350"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/126880?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7457d68d824d6ca8de34f"
                }
              ],
              "_id": "63e7457d68d824d6ca8de34c"
            },
            "movieLength": 144,
            "id": 841700,
            "type": "movie",
            "name": "Марсианин",
            "description": "Марсианская миссия «Арес-3» в процессе работы была вынуждена экстренно покинуть планету из-за надвигающейся песчаной бури. Инженер и биолог Марк Уотни получил повреждение скафандра во время песчаной бури. Сотрудники миссии, посчитав его погибшим, эвакуировались с планеты, оставив Марка одного.\n\nОчнувшись, Уотни обнаруживает, что связь с Землёй отсутствует, но при этом полностью функционирует жилой модуль. Главный герой начинает искать способ продержаться на имеющихся запасах еды, витаминов, воды и воздуха ещё 4 года до прилёта следующей миссии «Арес-4».",
            "year": 2015,
            "alternativeName": "The Martian",
            "enName": null,
            "names": [
              {
                "_id": "63398243c22d011bb5998e42",
                "name": "Марсианин"
              },
              {
                "_id": "63398243c22d011bb5998e43",
                "name": "The Martian"
              }
            ],
            "shortDescription": "Инженер-биолог пытается выжить на Марсе, ожидая помощи с Земли. Научно-фантастический блокбастер Ридли Скотта",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "47cbb935e940cc7e824df1257053c6ec",
              "imdb": "tt0383574",
              "tmdb": 58,
              "_id": "6376b9a67ad98299ff950bb7"
            },
            "logo": {
              "_id": "62e9d2eab252103987ab9359",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016eadd30c4364e99037d0995bd78d/orig"
            },
            "poster": {
              "_id": "633977a0c22d011bb564961b",
              "url": "https://st.kp.yandex.net/images/film_big/63991.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_63991.jpg"
            },
            "rating": {
              "kp": 8.135,
              "imdb": 7.3,
              "filmCritics": 6,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8222568d824d6ca895449"
            },
            "votes": {
              "kp": 575207,
              "imdb": 726730,
              "filmCritics": 229,
              "russianFilmCritics": 1,
              "await": 0,
              "_id": "63e8222568d824d6ca89544a"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8222568d824d6ca895453"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/pirates-of-the-caribbean-dead-mans-chest?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8222568d824d6ca895452"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8222568d824d6ca895455"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/106363?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8222568d824d6ca895454"
                }
              ],
              "_id": "63e8222568d824d6ca895451"
            },
            "movieLength": 151,
            "id": 63991,
            "type": "movie",
            "name": "Пираты Карибского моря: Сундук мертвеца",
            "description": "Вновь оказавшись в ирреальном мире, лихой капитан Джек Воробей неожиданно узнает, что является должником легендарного капитана «Летучего Голландца» Дэйви Джонса. Джек должен в кратчайшие сроки решить эту проблему, иначе ему грозит вечное проклятие и рабское существование после смерти. Вдобавок ко всему, срывается свадьба Уилла Тернера и Элизабет Суонн, которые вынуждены составить Джеку компанию в его злоключениях…",
            "year": 2006,
            "alternativeName": "Pirates of the Caribbean: Dead Man's Chest",
            "enName": null,
            "names": [
              {
                "_id": "633977a0c22d011bb5649617",
                "name": "Пираты Карибского моря: Сундук мертвеца"
              },
              {
                "_id": "633977a0c22d011bb5649618",
                "name": "Pirates of the Caribbean: Dead Man's Chest"
              }
            ],
            "shortDescription": "Джек Воробей и друзья выступают против морских гадов с «Летучего голландца». Вторая часть пиратской киносаги",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4a1b9b7ca81e26789bdd29fdf3c424db",
              "imdb": "tt0482571",
              "tmdb": 1124,
              "_id": "6376b99f7ad98299ff947830"
            },
            "logo": {
              "_id": "62f77b3d252c8469efff56a7",
              "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a00000170ed68067f4365ed815233444c93/orig"
            },
            "poster": {
              "_id": "633977a0c22d011bb5648e0e",
              "url": "https://st.kp.yandex.net/images/film_big/195334.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_195334.jpg"
            },
            "rating": {
              "_id": "633977a0c22d011bb5648e0c",
              "kp": 8.519,
              "imdb": 8.5,
              "filmCritics": 7.1,
              "russianFilmCritics": 33.3333,
              "await": 0
            },
            "votes": {
              "kp": 571532,
              "imdb": 1343143,
              "filmCritics": 204,
              "russianFilmCritics": 3,
              "await": 6,
              "_id": "63e8201568d824d6ca63d6ba"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e8201568d824d6ca63d6be"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/prestizh?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e8201568d824d6ca63d6bd"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e8201568d824d6ca63d6c0"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/17345-prestizh?utm_source=kinopoisk",
                  "_id": "63e8201568d824d6ca63d6bf"
                }
              ],
              "_id": "63e8201568d824d6ca63d6bc"
            },
            "id": 195334,
            "type": "movie",
            "name": "Престиж",
            "description": "Роберт и Альфред - фокусники-иллюзионисты, которые на рубеже XIX и XX веков соперничали друг с другом в Лондоне. С годами их дружеская конкуренция на профессиональной почве перерастает в настоящую войну.\n\nОни готовы на все, чтобы выведать друг у друга секреты фантастических трюков и сорвать их исполнение. Непримиримая вражда, вспыхнувшая между ними, начинает угрожать жизни окружающих их людей…",
            "year": 2006,
            "alternativeName": "The Prestige",
            "enName": null,
            "movieLength": 125,
            "names": [
              {
                "_id": "633977a0c22d011bb5648e0a",
                "name": "Престиж"
              },
              {
                "_id": "633977a0c22d011bb5648e0b",
                "name": "The Prestige"
              }
            ],
            "shortDescription": "Вражда двух иллюзионистов выходит на новый уровень. Фильм Кристофера Нолана с Дэвидом Боуи в роли Николы Теслы",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4ac4fca3f9f26eef96019e3b403c5be7",
              "imdb": "tt1670345",
              "tmdb": 75656,
              "_id": "6376b9a47ad98299ff94db7a"
            },
            "logo": {
              "_id": "62f0d3920f5be4124655ad07",
              "url": "https://avatars.mds.yandex.net/get-ott/374297/2a0000017a5c2c31264e0df936d733bcbc83/orig"
            },
            "poster": {
              "_id": "633977a0c22d011bb5649334",
              "url": "https://st.kp.yandex.net/images/film_big/522892.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_522892.jpg"
            },
            "rating": {
              "kp": 7.714,
              "imdb": 7.2,
              "filmCritics": 5.8,
              "russianFilmCritics": 60,
              "await": 96.42,
              "_id": "63b4ec2b4d1de3ae1980c63e"
            },
            "votes": {
              "kp": 570441,
              "imdb": 668116,
              "filmCritics": 173,
              "russianFilmCritics": 15,
              "await": 37931,
              "_id": "63e797de68d824d6caf26d77"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e797de68d824d6caf26d7c"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/now-you-see-me?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e797de68d824d6caf26d7b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e797de68d824d6caf26d7e"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/97804?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e797de68d824d6caf26d7d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                    "_id": "63e797de68d824d6caf26d80"
                  },
                  "name": "START",
                  "url": "https://start.ru/watch/illyuziya-obmana?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=illyuziya-obmana",
                  "_id": "63e797de68d824d6caf26d7f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e797de68d824d6caf26d82"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/508591726?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e797de68d824d6caf26d81"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e797de68d824d6caf26d84"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/8723?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e797de68d824d6caf26d83"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e797de68d824d6caf26d86"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/illyuziya-obmana-2013/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e797de68d824d6caf26d85"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e797de68d824d6caf26d88"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/54985056?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e797de68d824d6caf26d87"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e797de68d824d6caf26d8a"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/illyuziya-obmana?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e797de68d824d6caf26d89"
                }
              ],
              "_id": "63e797de68d824d6caf26d7a"
            },
            "movieLength": 115,
            "id": 522892,
            "type": "movie",
            "name": "Иллюзия обмана",
            "description": "Команда лучших иллюзионистов мира проворачивает дерзкие ограбления прямо во время своих шоу, играя в кошки-мышки с агентами ФБР.",
            "year": 2013,
            "alternativeName": "Now You See Me",
            "enName": null,
            "names": [
              {
                "_id": "633977a0c22d011bb5649330",
                "name": "Иллюзия обмана"
              },
              {
                "_id": "633977a0c22d011bb5649331",
                "name": "Now You See Me"
              }
            ],
            "shortDescription": "Банда иллюзионистов грабит счета коррупционеров. Триллер с криминальными фокусами и звездным составом",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4473a31e267ee987b5b49fc9b7b41fd4",
              "imdb": "tt12361974",
              "tmdb": 791373,
              "_id": "6376b9a37ad98299ff94cc9f"
            },
            "logo": {
              "_id": "63364f91248263ce89af755e",
              "url": "https://avatars.mds.yandex.net/get-ott/2419418/2a0000017f9c627d747e3d0ec0be715e48dd/orig"
            },
            "poster": {
              "_id": "633987a3c22d011bb5abf9d5",
              "url": "https://st.kp.yandex.net/images/film_big/1387021.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1387021.jpg"
            },
            "rating": {
              "kp": 7.836,
              "imdb": 8,
              "filmCritics": 6.7,
              "russianFilmCritics": 92.3077,
              "await": 98.63,
              "_id": "63e5ee8f68d824d6ca94755b"
            },
            "votes": {
              "kp": 567274,
              "imdb": 402961,
              "filmCritics": 307,
              "russianFilmCritics": 26,
              "await": 57116,
              "_id": "63e5ee8f68d824d6ca94755c"
            },
            "watchability": {
              "_id": "633987a3c22d011bb5abfa98",
              "items": null
            },
            "id": 1387021,
            "type": "movie",
            "name": "Лига справедливости Зака Снайдера",
            "description": "Вдохновившись самопожертвованием Супермена, Брюс Уэйн вновь обретает веру в человечество. Он заручается поддержкой новой союзницы Дианы Принс, чтобы сразиться с ещё более могущественным противником. Бэтмен и Чудо-женщина набирают команду сверхлюдей для борьбы с пробудившейся угрозой.",
            "year": 2021,
            "alternativeName": "Zack Snyder's Justice League",
            "color": "#000000",
            "enName": null,
            "movieLength": 242,
            "names": [
              {
                "_id": "633987a3c22d011bb5abf9d1",
                "name": "Лига справедливости Зака Снайдера"
              },
              {
                "_id": "633987a3c22d011bb5abf9d2",
                "name": "Zack Snyder's Justice League"
              }
            ],
            "shortDescription": "Бэтмен собирает команду супергероев, чтобы спасти Землю. Режиссерская версия, которую так ждали фанаты",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "40933bebfe15d69c91452061717f9243",
              "imdb": "tt0371746",
              "tmdb": 1726,
              "_id": "6376b9a87ad98299ff953524"
            },
            "logo": {
              "_id": "62f3d5aa252c8469ef413a72",
              "url": "https://avatars.mds.yandex.net/get-ott/2385704/2a0000016e4acdd81a988eaa0b5b63668d37/orig"
            },
            "poster": {
              "_id": "6339822ec22d011bb5993ede",
              "url": "https://st.kp.yandex.net/images/film_big/61237.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_61237.jpg"
            },
            "rating": {
              "kp": 7.956,
              "imdb": 7.9,
              "filmCritics": 7.7,
              "russianFilmCritics": 100,
              "await": 0,
              "_id": "63e801d168d824d6cadd0354"
            },
            "votes": {
              "kp": 566352,
              "imdb": 1067211,
              "filmCritics": 282,
              "russianFilmCritics": 7,
              "await": 0,
              "_id": "63e801d168d824d6cadd0355"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e801d168d824d6cadd035a"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/iron-man?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e801d168d824d6cadd0359"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e801d168d824d6cadd035c"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/87201?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e801d168d824d6cadd035b"
                }
              ],
              "_id": "63e801d168d824d6cadd0358"
            },
            "id": 61237,
            "type": "movie",
            "name": "Железный человек",
            "description": "Миллиардер-изобретатель Тони Старк попадает в плен к Афганским террористам, которые пытаются заставить его создать оружие массового поражения. В тайне от своих захватчиков Старк конструирует высокотехнологичную киберброню, которая помогает  ему сбежать. Однако по возвращении в США он узнаёт, что в совете директоров его фирмы плетётся заговор, чреватый страшными последствиями. Используя своё последнее изобретение, Старк пытается решить проблемы своей компании радикально...",
            "year": 2008,
            "alternativeName": "Iron Man",
            "enName": null,
            "movieLength": 121,
            "names": [
              {
                "_id": "6339822ec22d011bb5993eda",
                "name": "Железный человек"
              },
              {
                "_id": "6339822ec22d011bb5993edb",
                "name": "Iron Man"
              }
            ],
            "shortDescription": "Попав в плен, Тони Старк изобретает суперкостюм и спасает мир. Блокбастер, запустивший киновселенную Marvel",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4b94994d2cfce2eda1181debca01d1ba",
              "imdb": "tt1475582",
              "tmdb": 19885,
              "_id": "6376b9ab7ad98299ff9566c9"
            },
            "logo": {
              "_id": "62eca936b25210398769fabd",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a00000176f14b4a1e2a3f40dd652de59d6e/orig"
            },
            "poster": {
              "_id": "6339fa40049f6e1dbf99e410",
              "url": "https://st.kp.yandex.net/images/film_big/502838.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_502838.jpg"
            },
            "rating": {
              "kp": 8.861,
              "imdb": 9.1,
              "filmCritics": 0,
              "russianFilmCritics": 75,
              "await": 0,
              "_id": "63e7db2268d824d6caed9908"
            },
            "votes": {
              "kp": 564489,
              "imdb": 935892,
              "filmCritics": 0,
              "russianFilmCritics": 12,
              "await": 12,
              "_id": "63e7db2268d824d6caed9909"
            },
            "watchability": {
              "_id": "6339fa40049f6e1dbf99e583",
              "items": null
            },
            "id": 502838,
            "type": "tv-series",
            "name": "Шерлок",
            "description": "События разворачиваются в наши дни. Он прошел Афганистан, остался инвалидом. По возвращении в родные края встречается с загадочным, но своеобразным гениальным человеком. Тот в поиске соседа по квартире. Лондон, 2010 год. Происходят необъяснимые убийства. Скотланд-Ярд без понятия, за что хвататься. Существует лишь один человек, который в силах разрешить проблемы и найти ответы на сложные вопросы.",
            "year": 2010,
            "alternativeName": "Sherlock",
            "enName": "Sherlock",
            "movieLength": 90,
            "names": [
              {
                "_id": "6339fa40049f6e1dbf99e40c",
                "name": "Шерлок"
              },
              {
                "_id": "6339fa40049f6e1dbf99e40d",
                "name": "Sherlock"
              }
            ],
            "shortDescription": "Гений-социопат знакомит соседа с миром частного сыска. Бенедикт Камбербэтч в одном из лучших шоу XXI века",
            "releaseYears": [
              {
                "_id": "6359ae099f6a011dbf625775",
                "start": 2010,
                "end": 2017
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "48148bb33997e7978617debbb1bc1b4e",
              "imdb": "tt0295297",
              "tmdb": 672,
              "_id": "6376b9b47ad98299ff960ee8"
            },
            "logo": {
              "_id": "62f4c8cd252c8469ef72ffcc",
              "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a0000017e12791a83f15ab89c146aa13b32/orig"
            },
            "poster": {
              "_id": "633977a2c22d011bb564b2da",
              "url": "https://st.kp.yandex.net/images/film_big/688.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_688.jpg"
            },
            "rating": {
              "kp": 8.121,
              "imdb": 7.4,
              "filmCritics": 7.2,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e862cb68d824d6ca5c93b7"
            },
            "votes": {
              "kp": 563286,
              "imdb": 644412,
              "filmCritics": 237,
              "russianFilmCritics": 1,
              "await": 0,
              "_id": "63e862cb68d824d6ca5c93b8"
            },
            "watchability": {
              "items": null,
              "_id": "63e862cb68d824d6ca5c93c1"
            },
            "movieLength": 161,
            "id": 688,
            "type": "movie",
            "name": "Гарри Поттер и Тайная комната",
            "description": "Гарри Поттер переходит на второй курс Школы чародейства и волшебства Хогвартс. Эльф Добби предупреждает Гарри об опасности, которая поджидает его там, и просит больше не возвращаться в школу.\n\nЮный волшебник не следует совету эльфа и становится свидетелем таинственных событий, разворачивающихся в Хогвартсе. Вскоре Гарри и его друзья узнают о существовании Тайной Комнаты и сталкиваются с новыми приключениями, пытаясь победить темные силы.",
            "year": 2002,
            "alternativeName": "Harry Potter and the Chamber of Secrets",
            "enName": null,
            "names": [
              {
                "_id": "633977a2c22d011bb564b2d6",
                "name": "Гарри Поттер и Тайная комната"
              },
              {
                "_id": "633977a2c22d011bb564b2d7",
                "name": "Harry Potter and the Chamber of Secrets"
              }
            ],
            "shortDescription": "Домашний эльф, магический дневник и привидение. Второй год Гарри в школе Хогвартс — еще более захватывающий",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4261bfa5447761298397bd57fe0341fb",
              "imdb": "tt0119472",
              "tmdb": 158,
              "_id": "6376b9a57ad98299ff94eefa"
            },
            "logo": {
              "_id": "62f5d8c7252c8469efa9dfa9",
              "url": null
            },
            "poster": {
              "_id": "6339839bc22d011bb59e145a",
              "url": "https://st.kp.yandex.net/images/film_big/32898.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_32898.jpg"
            },
            "rating": {
              "kp": 8.632,
              "imdb": 7.8,
              "filmCritics": 0,
              "russianFilmCritics": 100,
              "await": 0,
              "_id": "63ba5a680b7d940e83d2a5e5"
            },
            "votes": {
              "kp": 562829,
              "imdb": 31465,
              "filmCritics": 0,
              "russianFilmCritics": 3,
              "await": 3,
              "_id": "63e88daa68d824d6ca477474"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e88daa68d824d6ca477477"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/knockin-on-heavens-door?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e88daa68d824d6ca477476"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e88daa68d824d6ca477479"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/149581931?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e88daa68d824d6ca477478"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e88daa68d824d6ca47747b"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/620df23a686730755e73f142?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e88daa68d824d6ca47747a"
                }
              ],
              "_id": "63e88daa68d824d6ca477475"
            },
            "movieLength": 87,
            "id": 32898,
            "type": "movie",
            "name": "Достучаться до небес",
            "description": "Волею судеб две абсолютные противоположности, тихоня Руди и разгильдяй Мартин, оказываются в одной больничной палате. Узнав неутешительные прогнозы, друзья решают использовать последние дни на полную катушку — угнать машину с деньгами, напиться текилы, и, конечно, увидеть море.",
            "year": 1997,
            "alternativeName": "Knockin' on Heaven's Door",
            "enName": null,
            "names": [
              {
                "_id": "6339839bc22d011bb59e1456",
                "name": "Достучаться до небес"
              },
              {
                "_id": "6339839bc22d011bb59e1457",
                "name": "Knockin' on Heaven's Door"
              }
            ],
            "shortDescription": "Смертельно больные Мартин и Руди едут к морю на угнанной машине. Роль, сделавшая Тиля Швайгера суперзвездой",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "472fb6c75c24f089bfe1f4bfcacc2079",
              "imdb": "tt2267998",
              "tmdb": 210577,
              "_id": "6376b9a57ad98299ff94fb6d"
            },
            "logo": {
              "_id": "62e00fec028619ccafa1abf6",
              "url": "https://avatars.mds.yandex.net/get-ott/1648503/2a0000017bf4245c84f48dbdc48af1aca7f8/orig"
            },
            "poster": {
              "_id": "63398428c22d011bb59ff749",
              "url": "https://st.kp.yandex.net/images/film_big/692861.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_692861.jpg"
            },
            "rating": {
              "kp": 7.959,
              "imdb": 8.1,
              "filmCritics": 8,
              "russianFilmCritics": 96.2963,
              "await": 96.18,
              "_id": "6382bb95e2833f4de42976f3"
            },
            "votes": {
              "kp": 557045,
              "imdb": 992372,
              "filmCritics": 369,
              "russianFilmCritics": 27,
              "await": 32367,
              "_id": "63e7793568d824d6caba668a"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7793568d824d6caba668d"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/gone-girl?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7793568d824d6caba668c"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7793568d824d6caba668f"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/115679?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7793568d824d6caba668e"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e7793568d824d6caba6691"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/ischeznuvshaya-2014/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e7793568d824d6caba6690"
                }
              ],
              "_id": "63e7793568d824d6caba668b"
            },
            "movieLength": 149,
            "id": 692861,
            "type": "movie",
            "name": "Исчезнувшая",
            "description": "Всё было готово для празднования пятилетия супружеской жизни, когда вдруг необъяснимо пропала виновница торжества. Остались следы борьбы в доме, кровь, которую явно пытались стереть, и цепочка подсказок в игре «охота за сокровищами» - жена ежегодно устраивала её для своего обожаемого мужа. И похоже, что эти подсказки дают шанс пролить свет на судьбу исчезнувшей.",
            "year": 2014,
            "alternativeName": "Gone Girl",
            "enName": null,
            "names": [
              {
                "_id": "63398428c22d011bb59ff745",
                "name": "Исчезнувшая"
              },
              {
                "_id": "63398428c22d011bb59ff746",
                "name": "Gone Girl"
              }
            ],
            "shortDescription": "Жена Ника бесследно исчезает в день пятилетия свадьбы. Фильм-головоломка от Дэвида Финчера с Беном Аффлеком",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4b63db58ab27e92b90a457e533b00007",
              "imdb": "tt12112298",
              "tmdb": 105276,
              "_id": "6376ba007ad98299ff9ade8d"
            },
            "logo": {
              "_id": "62f530f5252c8469ef879242",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000017e6cfdc1ef7c20c1ab738be817f3/orig"
            },
            "poster": {
              "_id": "63397948c22d011bb56f2d47",
              "url": "https://st.kp.yandex.net/images/film_big/1355059.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1355059.jpg"
            },
            "rating": {
              "kp": 7.666,
              "imdb": 6.4,
              "filmCritics": 0,
              "russianFilmCritics": 50,
              "await": 94.9,
              "_id": "63e6330668d824d6cad9b036"
            },
            "votes": {
              "kp": 555245,
              "imdb": 417,
              "filmCritics": 0,
              "russianFilmCritics": 6,
              "await": 1504,
              "_id": "63e6330668d824d6cad9b037"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                    "_id": "63e6330668d824d6cad9b03a"
                  },
                  "name": "START",
                  "url": "https://start.ru/watch/besprincipnye?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=besprincipnye",
                  "_id": "63e6330668d824d6cad9b039"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e6330668d824d6cad9b03c"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/122118692?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e6330668d824d6cad9b03b"
                }
              ],
              "_id": "63e6330668d824d6cad9b038"
            },
            "id": 1355059,
            "type": "tv-series",
            "name": "Беспринципные",
            "description": "Добро пожаловать на Патриаршие. Смешные и волнующие подробности личной жизни богатых москвичей, которые, как и все, попадают в неловкие ситуации. Правда, ситуации у них не самые обычные... Жена чувствует себя виноватой, познакомившись с любовницей мужа. Муж прикрывается выдуманной дочерью друга. А друг толкает помощника на измену, потому что так хочет жена. И это только начало. Одним словом, неприличные истории о приличных, казалось бы, людях. ",
            "year": 2020,
            "alternativeName": null,
            "enName": null,
            "movieLength": 47,
            "names": [
              {
                "_id": "63397948c22d011bb56f2d44",
                "name": "Беспринципные"
              }
            ],
            "shortDescription": "Смешные истории из жизни очень богатых москвичей. Продолжение комедии по мотивам рассказов Александра Цыпкина\n",
            "releaseYears": [
              {
                "_id": "6359ae719f6a011dbf62e4c3",
                "start": 2020,
                "end": null
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "47bd6e273ed822a19b90f63c9ebd9526",
              "imdb": "tt0079579",
              "tmdb": 21028,
              "_id": "6376b9b07ad98299ff95b1cc"
            },
            "logo": {
              "_id": "62ecb1c3b2521039876e7e58",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016fae383f9a29e03b9b723af1cc6a/orig"
            },
            "poster": {
              "_id": "633977a1c22d011bb564a0f6",
              "url": "https://st.kp.yandex.net/images/film_big/46708.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_46708.jpg"
            },
            "rating": {
              "kp": 8.417,
              "imdb": 8.1,
              "filmCritics": 4.8,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e905fc68d824d6caabb905"
            },
            "votes": {
              "kp": 551280,
              "imdb": 13351,
              "filmCritics": 5,
              "russianFilmCritics": 1,
              "await": 0,
              "_id": "63e905fc68d824d6caabb906"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e905fc68d824d6caabb909"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/moskva-slezam-ne-verit?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e905fc68d824d6caabb908"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e905fc68d824d6caabb90b"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/moskva_slezam_ne_verit?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e905fc68d824d6caabb90a"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e905fc68d824d6caabb90d"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/694772640?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e905fc68d824d6caabb90c"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e905fc68d824d6caabb90f"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/15617?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e905fc68d824d6caabb90e"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e905fc68d824d6caabb911"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/moskva-slezam-ne-verit-1979/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e905fc68d824d6caabb910"
                }
              ],
              "_id": "63e905fc68d824d6caabb907"
            },
            "id": 46708,
            "type": "movie",
            "name": "Москва слезам не верит",
            "description": "Москва, 1950-е годы. Три молодые провинциалки приезжают в Москву в поисках того, что ищут люди во всех столицах мира — любви, счастья и достатка. Антонина выходит замуж, растит детей, любит мужа. Людмиле Москва представляется лотереей, в которой она должна выиграть свое особенное счастье. Катерина же отчаянно влюбляется, но избранник ее оставляет. Однако она не опускает руки, в одиночку растит дочь и к тому же успевает делать блестящую карьеру. В 40 лет судьба дарит ей неожиданную встречу.",
            "year": 1979,
            "alternativeName": null,
            "enName": null,
            "names": [
              {
                "_id": "633977a1c22d011bb564a0f3",
                "name": "Москва слезам не верит"
              }
            ],
            "movieLength": 150,
            "shortDescription": "Три девушки переезжают в Москву в поисках любви, дружбы и успеха. Советский хит, отмеченный «Оскаром»",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4599fa80d6df7c03ada9b62708f00658",
              "imdb": "tt6264654",
              "tmdb": 550988,
              "_id": "6376b9ad7ad98299ff95873b"
            },
            "logo": {
              "_id": "633644ff248263ce89ad0128",
              "url": "https://avatars.mds.yandex.net/get-ott/2419418/2a0000017fcecddf9df291d4555d325b9014/orig"
            },
            "poster": {
              "_id": "633977a1c22d011bb5649ff5",
              "url": "https://st.kp.yandex.net/images/film_big/1199100.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1199100.jpg"
            },
            "rating": {
              "kp": 7.388,
              "imdb": 7.1,
              "filmCritics": 7,
              "russianFilmCritics": 85.7143,
              "await": 95.15,
              "_id": "63e5d15568d824d6cabc9338"
            },
            "votes": {
              "kp": 548180,
              "imdb": 376806,
              "filmCritics": 294,
              "russianFilmCritics": 14,
              "await": 53014,
              "_id": "63e5d15568d824d6cabc9339"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e5d15568d824d6cabc933d"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/free-guy?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e5d15568d824d6cabc933c"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e5d15568d824d6cabc933f"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/245013?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e5d15568d824d6cabc933e"
                }
              ],
              "_id": "63e5d15568d824d6cabc933b"
            },
            "id": 1199100,
            "type": "movie",
            "name": "Главный герой",
            "description": "Парень по имени Парень счастлив. Он живет в лучшем в мире городе Городе, работает на лучшей в мире работе в Банке и дружит с охранником по имени Приятель. И его совершенно не волнует, что Банк грабят по нескольку раз на дню, а улицы Города напоминают зону военных действий. Единственное, чего Парню не хватает для полного счастья — идеальной девушки, к которой у него имеется точный список требований. И вот однажды он видит на улице красотку, точь-в-точь как в его мечтах. Эта встреча изменит не только нашего главного героя, но и перевернёт весь известный ему мир.",
            "year": 2021,
            "alternativeName": "Free Guy",
            "enName": null,
            "movieLength": 115,
            "names": [
              {
                "_id": "633977a1c22d011bb5649ff1",
                "name": "Главный герой"
              },
              {
                "_id": "633977a1c22d011bb5649ff2",
                "name": "Free Guy"
              }
            ],
            "shortDescription": "Банковский клерк обнаруживает, что он персонаж видеоигры. Фантастическая экшен-комедия с Райаном Рейнольдсом",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "455cdb9e38e050d4bf994ac8a3f575ed",
              "imdb": "tt1677720",
              "tmdb": 333339,
              "_id": "6376b9a97ad98299ff954776"
            },
            "logo": {
              "_id": "62f61945252c8469efb6f538",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a0000016eadd29ace91e1475b3d2d6f8a28/orig"
            },
            "poster": {
              "_id": "633977a1c22d011bb5649e5f",
              "url": "https://st.kp.yandex.net/images/film_big/538225.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_538225.jpg"
            },
            "rating": {
              "kp": 7.459,
              "imdb": 7.4,
              "filmCritics": 6.8,
              "russianFilmCritics": 92.5926,
              "await": 92.89,
              "_id": "63c879f52b1609d669e232d4"
            },
            "votes": {
              "kp": 546586,
              "imdb": 442956,
              "filmCritics": 448,
              "russianFilmCritics": 27,
              "await": 27205,
              "_id": "63e6a3e068d824d6caa82e41"
            },
            "watchability": {
              "_id": "633977a1c22d011bb5649f32",
              "items": null
            },
            "movieLength": 140,
            "id": 538225,
            "type": "movie",
            "name": "Первому игроку приготовиться",
            "description": "Действие фильма происходит в 2045 году, мир погружается в хаос и находится на грани коллапса. Люди ищут спасения в игре OASIS – огромной вселенной виртуальной реальности. Ее создатель, гениальный и эксцентричный Джеймс Холлидэй, оставляет уникальное завещание. Все его колоссальное состояние получит игрок, первым обнаруживший цифровое «пасхальное яйцо», которое миллиардер спрятал где-то на просторах OASISа. Запущенный им квест охватывает весь мир. Совершенно негероический парень по имени Уэйд Уоттс решает принять участие в состязании, с головой бросаясь в головокружительную, искажающую реальность погоню за сокровищами по фантастической вселенной, полной загадок, открытий и опасностей.",
            "year": 2018,
            "alternativeName": "Ready Player One",
            "enName": null,
            "names": [
              {
                "_id": "633977a1c22d011bb5649e5b",
                "name": "Первому игроку приготовиться"
              },
              {
                "_id": "633977a1c22d011bb5649e5c",
                "name": "Ready Player One"
              }
            ],
            "shortDescription": "Подросток охотится за пасхалками в виртуальной игре, захватившей мир. Фантастический экшен Стивена Спилберга",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "469dd100cdfca80d94219646f6731e78",
              "imdb": "tt0167260",
              "tmdb": 122,
              "_id": "6376b9a77ad98299ff952823"
            },
            "logo": {
              "_id": "62f20030252c8469ef6a87f3",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a000001714e8cc04eecc3c173091b04d4f4/orig"
            },
            "poster": {
              "_id": "63397e12c22d011bb5890865",
              "url": "https://st.kp.yandex.net/images/film_big/3498.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_3498.jpg"
            },
            "rating": {
              "kp": 8.654,
              "imdb": 9,
              "filmCritics": 8.7,
              "russianFilmCritics": 100,
              "await": 0,
              "_id": "63e8542968d824d6ca89cfa7"
            },
            "votes": {
              "kp": 545524,
              "imdb": 1858975,
              "filmCritics": 274,
              "russianFilmCritics": 8,
              "await": 0,
              "_id": "63e8542968d824d6ca89cfa8"
            },
            "watchability": {
              "items": null,
              "_id": "63ae7a306b290d775e93abea"
            },
            "movieLength": 201,
            "id": 3498,
            "type": "movie",
            "name": "Властелин колец: Возвращение короля",
            "description": "Повелитель сил тьмы Саурон направляет свою бесчисленную армию под стены Минас-Тирита, крепости Последней Надежды. Он предвкушает близкую победу, но именно это мешает ему заметить две крохотные фигурки — хоббитов, приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо Всевластья.",
            "year": 2003,
            "alternativeName": "The Lord of the Rings: The Return of the King",
            "enName": null,
            "names": [
              {
                "_id": "63397e12c22d011bb5890861",
                "name": "Властелин колец: Возвращение короля"
              },
              {
                "_id": "63397e12c22d011bb5890862",
                "name": "The Lord of the Rings: The Return of the King"
              }
            ],
            "shortDescription": "Арагорн штурмует Мордор, а Фродо устал бороться с чарами кольца. Эффектный финал саги, собравший 11 «Оскаров» ",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "429c63a2e1be0919892f20e72a890bdd",
              "imdb": "tt2096673",
              "tmdb": 150540,
              "_id": "6376b9ae7ad98299ff95a0b2"
            },
            "logo": {
              "_id": "62f526e9252c8469ef858da2",
              "url": "https://avatars.mds.yandex.net/get-ott/224348/2a00000178cac49aa0c6e467653242bb4da5/orig"
            },
            "poster": {
              "_id": "63398208c22d011bb598aa8b",
              "url": "https://st.kp.yandex.net/images/film_big/645118.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_645118.jpg"
            },
            "rating": {
              "kp": 8.071,
              "imdb": 8.2,
              "filmCritics": 8.9,
              "russianFilmCritics": 87.5,
              "await": 94.95,
              "_id": "63e749e368d824d6cacb209c"
            },
            "votes": {
              "kp": 545091,
              "imdb": 721748,
              "filmCritics": 382,
              "russianFilmCritics": 8,
              "await": 19067,
              "_id": "63e749e368d824d6cacb209d"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e749e368d824d6cacb20a2"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/inside-out-60097?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e749e368d824d6cacb20a1"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e749e368d824d6cacb20a4"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/132295?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e749e368d824d6cacb20a3"
                }
              ],
              "_id": "63e749e368d824d6cacb20a0"
            },
            "movieLength": 95,
            "id": 645118,
            "type": "cartoon",
            "name": "Головоломка",
            "description": "Райли — обычная 11-летняя школьница, и, как у каждого из нас, ее поведение определяют пять базовых эмоций: Радость, Печаль, Страх, Гнев и Брезгливость. Эмоции живут в сознании девочки и каждый день помогают ей справляться с проблемами, руководя всеми ее поступками. До поры до времени эмоции живут дружно, но вдруг оказывается, что Райли и ее родителям предстоит переезд из небольшого уютного городка в шумный и людный мегаполис. Каждая из эмоций считает, что именно она лучше прочих знает, что нужно делать в этой непростой ситуации, и в голове у девочки наступает полная неразбериха. Чтобы наладить жизнь в большом городе, освоиться в новой школе и подружиться с одноклассниками, эмоциям Райли предстоит снова научиться работать сообща.",
            "year": 2015,
            "alternativeName": "Inside Out",
            "enName": null,
            "names": [
              {
                "_id": "63398208c22d011bb598aa87",
                "name": "Головоломка"
              },
              {
                "_id": "63398208c22d011bb598aa88",
                "name": "Inside Out"
              }
            ],
            "shortDescription": "Пять человеческих эмоций должны договориться и помочь девочке справиться с собой. «Оскар» за лучший мультфильм",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4ddb4ee50875035893b0aff7dbf82138",
              "imdb": "tt1197624",
              "tmdb": 22803,
              "_id": "6376b9a97ad98299ff953e54"
            },
            "logo": {
              "_id": "62f59358252c8469ef9baeec",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016faea0d85441d487c107f2a60c8a/orig"
            },
            "poster": {
              "_id": "633977a1c22d011bb5649d2b",
              "url": "https://st.kp.yandex.net/images/film_big/406408.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_406408.jpg"
            },
            "rating": {
              "_id": "633977a1c22d011bb5649d29",
              "kp": 8,
              "imdb": 7.4,
              "filmCritics": 4.4,
              "russianFilmCritics": 20,
              "await": 71.23
            },
            "votes": {
              "kp": 543797,
              "imdb": 302121,
              "filmCritics": 162,
              "russianFilmCritics": 5,
              "await": 3866,
              "_id": "63e7ee9c68d824d6caeb34c1"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7ee9c68d824d6caeb34c5"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/law-abiding-citizen?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7ee9c68d824d6caeb34c4"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e7ee9c68d824d6caeb34c7"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/10701?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e7ee9c68d824d6caeb34c6"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e7ee9c68d824d6caeb34c9"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/147513643?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e7ee9c68d824d6caeb34c8"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e7ee9c68d824d6caeb34cb"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/zakonoposlushnyy-grazhdanin?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e7ee9c68d824d6caeb34ca"
                }
              ],
              "_id": "63e7ee9c68d824d6caeb34c3"
            },
            "id": 406408,
            "type": "movie",
            "name": "Законопослушный гражданин",
            "description": "Окружной прокурор пошёл на сделку с преступниками и освободил их из тюрьмы. Тогда человек, чьи жена и ребёнок погибли от рук убийц, решает отомстить прокурору, совершив правосудие самостоятельно. Его ловят и сажают в тюрьму, но он неожиданно ставит ультиматум: он будет убивать, не выходя из-за решетки, если его требования не будут выполнены. Смешное заявление, но вскоре люди правда начинают гибнуть...",
            "year": 2009,
            "alternativeName": "Law Abiding Citizen",
            "enName": null,
            "movieLength": 108,
            "names": [
              {
                "_id": "633977a1c22d011bb5649d27",
                "name": "Законопослушный гражданин"
              },
              {
                "_id": "633977a1c22d011bb5649d28",
                "name": "Law Abiding Citizen"
              }
            ],
            "shortDescription": "Потеряв семью, Клайд жестоко мстит убийцам и нечестному прокурору. Брутальный триллер с Джерардом Батлером",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4bcd6b4c0361350b9fdae16789d4cb36",
              "imdb": "tt0892769",
              "tmdb": 10191,
              "_id": "6376b9ad7ad98299ff959749"
            },
            "logo": {
              "_id": "62eaaa1bb252103987213cb7",
              "url": "https://avatars.mds.yandex.net/get-ott/239697/2a0000017d72bff6884076340156ac462530/orig"
            },
            "poster": {
              "_id": "63397cf9c22d011bb5837b1a",
              "url": "https://st.kp.yandex.net/images/film_big/280172.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_280172.jpg"
            },
            "rating": {
              "kp": 8.218,
              "imdb": 8.1,
              "filmCritics": 7.9,
              "russianFilmCritics": 100,
              "await": 68.42,
              "_id": "63e7de3868d824d6ca1c8c4a"
            },
            "votes": {
              "kp": 543204,
              "imdb": 747804,
              "filmCritics": 214,
              "russianFilmCritics": 9,
              "await": 7398,
              "_id": "63e7de3868d824d6ca1c8c4b"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7de3868d824d6ca1c8c52"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/how-to-train-your-dragon?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7de3868d824d6ca1c8c51"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7de3868d824d6ca1c8c54"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/87203?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7de3868d824d6ca1c8c53"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e7de3868d824d6ca1c8c56"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/160222108?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e7de3868d824d6ca1c8c55"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e7de3868d824d6ca1c8c58"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/17294?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e7de3868d824d6ca1c8c57"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e7de3868d824d6ca1c8c5a"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/66841500?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e7de3868d824d6ca1c8c59"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e7de3868d824d6ca1c8c5c"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/kak-priruchit-drakona?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e7de3868d824d6ca1c8c5b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e7de3868d824d6ca1c8c5e"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/619c836cbb003f90030b6698?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e7de3868d824d6ca1c8c5d"
                }
              ],
              "_id": "63e7de3868d824d6ca1c8c50"
            },
            "movieLength": 98,
            "id": 280172,
            "type": "cartoon",
            "name": "Как приручить дракона",
            "description": "Вы узнаете историю подростка Иккинга, которому не слишком близки традиции его героического племени, много лет ведущего войну с драконами. Мир Иккинга переворачивается с ног на голову, когда он неожиданно встречает дракона Беззубика, который поможет ему и другим викингам увидеть привычный мир с совершенно другой стороны…",
            "year": 2010,
            "alternativeName": "How to Train Your Dragon",
            "enName": null,
            "names": [
              {
                "_id": "63397cf9c22d011bb5837b16",
                "name": "Как приручить дракона"
              },
              {
                "_id": "63397cf9c22d011bb5837b17",
                "name": "How to Train Your Dragon"
              }
            ],
            "shortDescription": "Сын вождя заводит дружбу с врагом племени, драконом. История о том, что ум и сочувствие куда важнее силы",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4d1cac6adb79ccef8545673d86c8b486",
              "imdb": "tt1201607",
              "tmdb": 12445,
              "_id": "6376b9b17ad98299ff95d58e"
            },
            "logo": {
              "_id": "62f5ce9b252c8469efa7cceb",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000017e1276ab31c4f156c31c0e02bd3d/orig"
            },
            "poster": {
              "_id": "633977a2c22d011bb564a33d",
              "url": "https://st.kp.yandex.net/images/film_big/407636.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_407636.jpg"
            },
            "rating": {
              "kp": 8.149,
              "imdb": 8.1,
              "filmCritics": 8.3,
              "russianFilmCritics": 83.3333,
              "await": 82.85,
              "_id": "63e7c94c68d824d6ca1f1f24"
            },
            "votes": {
              "kp": 542710,
              "imdb": 884445,
              "filmCritics": 332,
              "russianFilmCritics": 12,
              "await": 84003,
              "_id": "63e7c94c68d824d6ca1f1f25"
            },
            "watchability": {
              "items": null,
              "_id": "63e7c94d68d824d6ca1f2055"
            },
            "movieLength": 130,
            "id": 407636,
            "type": "movie",
            "name": "Гарри Поттер и Дары Смерти: Часть II",
            "description": "В грандиозной последней главе битва между добрыми и злыми силами мира волшебников перерастает во всеобщую войну. Ставки ещё никогда не были так высоки, а поиск убежища — столь сложен. И, быть может, именно Гарри Поттеру придется пожертвовать всем в финальном сражении с Волан-де-Мортом.",
            "year": 2011,
            "alternativeName": "Harry Potter and the Deathly Hallows - Part 2",
            "enName": null,
            "names": [
              {
                "name": "Гарри Поттер и Дары Смерти: Часть II",
                "_id": "63a5ca52724b35d32e0c43f7"
              },
              {
                "name": "Harry Potter and the Deathly Hallows - Part 2",
                "_id": "63a5ca52724b35d32e0c43f8"
              }
            ],
            "shortDescription": "Гарри уничтожил почти все крестражи Волан-де-Морта, но еще не знает о последнем. Финал грандиозной саги",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "45b63ee83d9ea3c293a927da58e6ce1d",
              "imdb": "tt7286456",
              "tmdb": 475557,
              "_id": "6376b9aa7ad98299ff95561f"
            },
            "logo": {
              "_id": "62f073220f5be412461c1772",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a00000176f15a40fc3ec20b6a61c0b19850/orig"
            },
            "poster": {
              "_id": "63397d82c22d011bb58620aa",
              "url": "https://st.kp.yandex.net/images/film_big/1048334.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1048334.jpg"
            },
            "rating": {
              "kp": 7.977,
              "imdb": 8.4,
              "filmCritics": 7.3,
              "russianFilmCritics": 89.6552,
              "await": 96.44,
              "_id": "638674b7e2833f4de41093da"
            },
            "votes": {
              "kp": 541224,
              "imdb": 1306023,
              "filmCritics": 597,
              "russianFilmCritics": 29,
              "await": 41182,
              "_id": "63e634c568d824d6caed6534"
            },
            "watchability": {
              "_id": "63397d82c22d011bb586218c",
              "items": null
            },
            "movieLength": 122,
            "id": 1048334,
            "type": "movie",
            "name": "Джокер",
            "description": "Готэм, начало 1980-х годов. Комик Артур Флек живет с больной матерью, которая с детства учит его «ходить с улыбкой». Пытаясь нести в мир хорошее и дарить людям радость, Артур сталкивается с человеческой жестокостью и постепенно приходит к выводу, что этот мир получит от него не добрую улыбку, а ухмылку злодея Джокера.",
            "year": 2019,
            "alternativeName": "Joker",
            "enName": null,
            "names": [
              {
                "_id": "63397d82c22d011bb58620a6",
                "name": "Джокер"
              },
              {
                "_id": "63397d82c22d011bb58620a7",
                "name": "Joker"
              }
            ],
            "shortDescription": "Как неудачливый комик стал самым опасным человеком в Готэме. Бенефис Хоакина Феникса и «Оскар» за саундтрек",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "43c5a627d76803459e2cedc915acbf21",
              "imdb": "tt0361748",
              "tmdb": 16869,
              "_id": "6376b9b37ad98299ff95fd44"
            },
            "logo": {
              "_id": "62f540e7252c8469ef8add4d",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016e4acd33a1edfdb81b7818353e04/orig"
            },
            "poster": {
              "_id": "63398766c22d011bb5ab2190",
              "url": "https://st.kp.yandex.net/images/film_big/9691.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_9691.jpg"
            },
            "rating": {
              "kp": 7.977,
              "imdb": 8.3,
              "filmCritics": 7.8,
              "russianFilmCritics": 80,
              "await": 83.74,
              "_id": "63e7f05a68d824d6ca0ada4e"
            },
            "votes": {
              "kp": 539610,
              "imdb": 1463208,
              "filmCritics": 332,
              "russianFilmCritics": 10,
              "await": 13070,
              "_id": "63e7f05a68d824d6ca0ada4f"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7f05a68d824d6ca0ada52"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/inglourious-basterds?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7f05a68d824d6ca0ada51"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7f05a68d824d6ca0ada54"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/106220?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7f05a68d824d6ca0ada53"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e7f05a68d824d6ca0ada56"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/160179723?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e7f05a68d824d6ca0ada55"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e7f05a68d824d6ca0ada58"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/18461?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e7f05a68d824d6ca0ada57"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e7f05a68d824d6ca0ada5a"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/75465591?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e7f05a68d824d6ca0ada59"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e7f05a68d824d6ca0ada5c"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/besslavnye-ublyudki?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e7f05a68d824d6ca0ada5b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e7f05a68d824d6ca0ada5e"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/621ccdb4686730755eac0d19?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e7f05a68d824d6ca0ada5d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e7f05a68d824d6ca0ada60"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/17366-besslavnye-ublyudki?utm_source=kinopoisk",
                  "_id": "63e7f05a68d824d6ca0ada5f"
                }
              ],
              "_id": "63e7f05a68d824d6ca0ada50"
            },
            "movieLength": 153,
            "id": 9691,
            "type": "movie",
            "name": "Бесславные ублюдки",
            "description": "Вторая мировая война. В оккупированной немцами Франции группа американских солдат-евреев наводит страх на нацистов, жестоко убивая и скальпируя солдат.",
            "year": 2009,
            "alternativeName": "Inglourious Basterds",
            "enName": null,
            "names": [
              {
                "_id": "63398766c22d011bb5ab218c",
                "name": "Бесславные ублюдки"
              },
              {
                "_id": "63398766c22d011bb5ab218d",
                "name": "Inglourious Basterds"
              }
            ],
            "shortDescription": "Американский спецотряд жестоко расправляется с нацистами. Пародия на военные фильмы от Квентина Тарантино",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "410e683f7dc325ea8aced77ca57916fb",
              "imdb": "tt0119116",
              "tmdb": 18,
              "_id": "6376b9b07ad98299ff95c96d"
            },
            "logo": {
              "_id": "62f59d64252c8469ef9db36b",
              "url": "https://avatars.mds.yandex.net/get-ott/212840/2a0000017af8518090563463ba17354a88cb/orig"
            },
            "poster": {
              "_id": "63397b5bc22d011bb57a9c78",
              "url": "https://st.kp.yandex.net/images/film_big/2656.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_2656.jpg"
            },
            "rating": {
              "kp": 8.104,
              "imdb": 7.6,
              "filmCritics": 6.4,
              "russianFilmCritics": 66.6667,
              "await": 0,
              "_id": "63d616ebf38219e94f85c8d7"
            },
            "votes": {
              "kp": 539039,
              "imdb": 479497,
              "filmCritics": 68,
              "russianFilmCritics": 3,
              "await": 0,
              "_id": "63e88e0768d824d6ca4e612e"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e88e0768d824d6ca4e6131"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-fifth-element?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e88e0768d824d6ca4e6130"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e88e0768d824d6ca4e6133"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/65057230?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e88e0768d824d6ca4e6132"
                }
              ],
              "_id": "63e88e0768d824d6ca4e612f"
            },
            "movieLength": 126,
            "id": 2656,
            "type": "movie",
            "name": "Пятый элемент",
            "description": "Каждые пять тысяч лет открываются двери между измерениями и темные силы стремятся нарушить существующую гармонию. Каждые пять тысяч лет Вселенной нужен герой, способный противостоять этому злу. XXIII век. Нью-йоркский таксист Корбен Даллас должен решить глобальную задачу - спасение всего рода человеческого.\n\nЗло в виде раскаленной массы, наделенной интеллектом, надвигается на Землю. Победить его можно, только лишь собрав воедино четыре элемента (они же стихии - земля, вода, воздух и огонь) и добавив к ним загадочный пятый элемент.",
            "year": 1997,
            "alternativeName": "The Fifth Element",
            "enName": null,
            "names": [
              {
                "_id": "63397b5bc22d011bb57a9c74",
                "name": "Пятый элемент"
              },
              {
                "_id": "63397b5bc22d011bb57a9c75",
                "name": "The Fifth Element"
              }
            ],
            "shortDescription": "Последняя надежда человечества — безалаберный нью-йоркский таксист. Самый обаятельный фильм Люка Бессона",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4c842cbb3f1bc0d7815766097aa88366",
              "imdb": "tt2948372",
              "tmdb": 508442,
              "_id": "6376b9af7ad98299ff95a468"
            },
            "logo": {
              "_id": "62f1561f0f5be41246a544d6",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a00000179e695b1277b8740b5bfcf77a6bf/orig"
            },
            "poster": {
              "_id": "633978f8c22d011bb56dba75",
              "url": "https://st.kp.yandex.net/images/film_big/775273.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_775273.jpg"
            },
            "rating": {
              "kp": 8.373,
              "imdb": 8,
              "filmCritics": 8.3,
              "russianFilmCritics": 77.2727,
              "await": 96.86,
              "_id": "63e609a068d824d6ca66c1ee"
            },
            "votes": {
              "kp": 538794,
              "imdb": 335589,
              "filmCritics": 354,
              "russianFilmCritics": 22,
              "await": 10944,
              "_id": "63e609a068d824d6ca66c1ef"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e609a068d824d6ca66c1f3"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/soul?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e609a068d824d6ca66c1f2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e609a068d824d6ca66c1f5"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/415493?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e609a068d824d6ca66c1f4"
                }
              ],
              "_id": "63e609a068d824d6ca66c1f1"
            },
            "id": 775273,
            "type": "cartoon",
            "name": "Душа",
            "description": "Уже немолодой школьный учитель музыки Джо Гарднер всю жизнь мечтал выступать на сцене в составе джазового ансамбля. Однажды он успешно проходит прослушивание у легендарной саксофонистки и, возвращаясь домой вне себя от счастья, падает в люк и умирает. Теперь у Джо одна дорога — в Великое После, но он сбегает с идущего в вечность эскалатора и случайно попадает в Великое До. Тут новенькие души обретают себя, и у будущих людей зарождаются увлечения, мечты и интересы. Джо становится наставником упрямой души 22, которая уже много веков не может найти свою искру и отправиться на Землю.",
            "year": 2020,
            "alternativeName": "Soul",
            "enName": null,
            "names": [
              {
                "_id": "633978f8c22d011bb56dba71",
                "name": "Душа"
              },
              {
                "_id": "633978f8c22d011bb56dba72",
                "name": "Soul"
              }
            ],
            "color": "#101010",
            "movieLength": 106,
            "shortDescription": "Джазмен хочет сбежать с того света на концерт. Фантазия о призвании и важных мелочах жизни от автора «Вверх»",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4edfc8baf73a662bbcff2aee028c3e5f",
              "imdb": "tt0167261",
              "tmdb": 121,
              "_id": "6376b9ac7ad98299ff95772b"
            },
            "logo": {
              "_id": "62ec31c1b2521039871c5211",
              "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a000001714e8bc03538ec41949c44ef2a71/orig"
            },
            "poster": {
              "_id": "63397dc7c22d011bb58787a8",
              "url": "https://st.kp.yandex.net/images/film_big/312.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_312.jpg"
            },
            "rating": {
              "kp": 8.598,
              "imdb": 8.8,
              "filmCritics": 8.5,
              "russianFilmCritics": 83.3333,
              "await": 0,
              "_id": "63c5e9582b1609d669e20b3d"
            },
            "votes": {
              "kp": 535287,
              "imdb": 1678542,
              "filmCritics": 256,
              "russianFilmCritics": 6,
              "await": 0,
              "_id": "63e8657a68d824d6ca90d604"
            },
            "watchability": {
              "items": null,
              "_id": "63ae7e496b290d775ebc7f7a"
            },
            "movieLength": 179,
            "id": 312,
            "type": "movie",
            "name": "Властелин колец: Две крепости",
            "description": "Братство распалось, но Кольцо Всевластья должно быть уничтожено. Фродо и Сэм вынуждены довериться Голлуму, который взялся провести их к вратам Мордора. Громадная армия Сарумана приближается: члены братства и их союзники готовы принять бой. Битва за Средиземье продолжается.",
            "year": 2002,
            "alternativeName": "The Lord of the Rings: The Two Towers",
            "enName": null,
            "names": [
              {
                "_id": "63397dc7c22d011bb58787a4",
                "name": "Властелин колец: Две крепости"
              },
              {
                "_id": "63397dc7c22d011bb58787a5",
                "name": "The Lord of the Rings: The Two Towers"
              }
            ],
            "shortDescription": "Голлум ведет хоббитов в Мордор, а великие армии готовятся к битве. Вторая часть трилогии, два «Оскара»",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "490790b846806ca695588bc88cdf0d4d",
              "imdb": "tt0104431",
              "tmdb": 772,
              "_id": "6376b9e67ad98299ff996109"
            },
            "logo": {
              "_id": "62ec60efb2521039873e8727",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a00000170ed5eac70d1cc0e4843a4e73c8c/orig"
            },
            "poster": {
              "_id": "633979d9c22d011bb5723e45",
              "url": "https://st.kp.yandex.net/images/film_big/5928.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_5928.jpg"
            },
            "rating": {
              "kp": 8.028,
              "imdb": 6.8,
              "filmCritics": 4.5,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8e7f068d824d6ca661960"
            },
            "votes": {
              "kp": 529115,
              "imdb": 370534,
              "filmCritics": 57,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8e7f068d824d6ca661961"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8e7f068d824d6ca661969"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/home-alone-2-lost-in-new-york?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8e7f068d824d6ca661968"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8e7f068d824d6ca66196b"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/119732?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8e7f068d824d6ca66196a"
                }
              ],
              "_id": "63e8e7f068d824d6ca661967"
            },
            "id": 5928,
            "type": "movie",
            "name": "Один дома 2: Затерянный в Нью-Йорке",
            "description": "Самый маленький герой Америки устраивает большой переполох в Нью-Йорке! Кевин МакКалистер вернулся! Но теперь он один не дома, а в Нью-Йорке и у него достаточно денег и кредитных карточек, чтобы превратить Большое Яблоко в собственную площадку для игр.\n\nНо, как всегда, Кевину не суждено быть долго одному: его старые приятели ― жулики Гарри и Марв ― сбежали из тюрьмы, куда они попали стараниями Кевина. И надо же им было попасть именно в тот город, где Кевин планировал поразвлечься! Новые западни и ловушки уже ждут горе-бандитов.",
            "year": 1992,
            "alternativeName": "Home Alone 2: Lost in New York",
            "enName": null,
            "movieLength": 119,
            "names": [
              {
                "_id": "633979d9c22d011bb5723e41",
                "name": "Один дома 2: Затерянный в Нью-Йорке"
              },
              {
                "_id": "633979d9c22d011bb5723e42",
                "name": "Home Alone 2: Lost in New York"
              }
            ],
            "shortDescription": "Неугомонный малыш Кевин в одиночку покоряет Нью-Йорк. Очередной шедевр от Джона Хьюза и Криса Коламбуса",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4f39d7763a829bc3a003fa801a781ca1",
              "imdb": "tt0458352",
              "tmdb": 350,
              "_id": "6376b9bc7ad98299ff96859e"
            },
            "logo": {
              "_id": "62e28d50028619ccafb15c30",
              "url": "https://avatars.mds.yandex.net/get-ott/200035/2a000001725515009edce05c53e3ccf94a56/orig"
            },
            "poster": {
              "_id": "633981b5c22d011bb5978dcb",
              "url": "https://st.kp.yandex.net/images/film_big/104992.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_104992.jpg"
            },
            "rating": {
              "kp": 7.681,
              "imdb": 6.9,
              "filmCritics": 6.6,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8211868d824d6ca76b03a"
            },
            "votes": {
              "kp": 526441,
              "imdb": 427270,
              "filmCritics": 195,
              "russianFilmCritics": 1,
              "await": 0,
              "_id": "63e8211868d824d6ca76b03b"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8211868d824d6ca76b03f"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-devil-wears-prada?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8211868d824d6ca76b03e"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8211868d824d6ca76b041"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/87510?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8211868d824d6ca76b040"
                }
              ],
              "_id": "63e8211868d824d6ca76b03d"
            },
            "movieLength": 109,
            "id": 104992,
            "type": "movie",
            "name": "Дьявол носит Prada",
            "description": "Мечтающая стать журналисткой провинциальная девушка Энди по окончании университета получает должность помощницы всесильной Миранды Пристли, деспотичного редактора одного из крупнейших нью-йоркских журналов мод. Энди всегда мечтала о такой работе, не зная, с каким нервным напряжением это будет связано…",
            "year": 2006,
            "alternativeName": "The Devil Wears Prada",
            "enName": null,
            "names": [
              {
                "_id": "633981b5c22d011bb5978dc7",
                "name": "Дьявол носит Prada"
              },
              {
                "_id": "633981b5c22d011bb5978dc8",
                "name": "The Devil Wears Prada"
              }
            ],
            "shortDescription": "Юная карьеристка сталкивается с изнанкой гламура. В главных ролях — Энн Хэтэуэй и Мерил Стрип",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "464daa0109bfb96190229ae24d84d90c",
              "imdb": "tt0449088",
              "tmdb": 285,
              "_id": "6376b9b57ad98299ff962821"
            },
            "logo": {
              "_id": "62e11b52028619ccaf1472c8",
              "url": "https://avatars.mds.yandex.net/get-ott/224348/2a0000016eadcdee3b8cde3bb3f07b8ba183/orig"
            },
            "poster": {
              "_id": "633977a2c22d011bb564a98f",
              "url": "https://st.kp.yandex.net/images/film_big/102124.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_102124.jpg"
            },
            "rating": {
              "kp": 8.058,
              "imdb": 7.1,
              "filmCritics": 5.4,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8121268d824d6cab0c68d"
            },
            "votes": {
              "kp": 524537,
              "imdb": 658336,
              "filmCritics": 227,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8121268d824d6cab0c68e"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8121268d824d6cab0c697"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/pirates-of-the-caribbean-at-worlds-end?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8121268d824d6cab0c696"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8121268d824d6cab0c699"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/106362?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8121268d824d6cab0c698"
                }
              ],
              "_id": "63e8121268d824d6cab0c695"
            },
            "movieLength": 169,
            "id": 102124,
            "type": "movie",
            "name": "Пираты Карибского моря: На краю света",
            "description": "Новые приключения Джека Воробья и его друзей Уилла Тернера и Элизабет Суонн. На этот раз Уиллу и Элизабет придется объединиться с самим Капитаном Барбоссой для того, чтобы отправиться на край света и спасти своего друга — Джека. Ситуация осложняется тем, что Элизабет попадает к сингапурским пиратам…",
            "year": 2007,
            "alternativeName": "Pirates of the Caribbean: At World's End",
            "enName": null,
            "names": [
              {
                "_id": "633977a2c22d011bb564a98b",
                "name": "Пираты Карибского моря: На краю света"
              },
              {
                "_id": "633977a2c22d011bb564a98c",
                "name": "Pirates of the Caribbean: At World's End"
              }
            ],
            "shortDescription": "Пираты сражаются против короля Англии и морского чудовища. Фантастические приключения с Джонни Деппом",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4a146071bec0e165a754f4963224587b",
              "imdb": "tt0437086",
              "tmdb": 399579,
              "_id": "6376b9b27ad98299ff95e180"
            },
            "logo": {
              "_id": "62efe7710f5be41246c1be04",
              "url": "https://avatars.mds.yandex.net/get-ott/2439731/2a0000016e043c44553e85b35e5bce8ecc76/orig"
            },
            "poster": {
              "_id": "6339786bc22d011bb56b6ae7",
              "url": "https://st.kp.yandex.net/images/film_big/88173.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_88173.jpg"
            },
            "rating": {
              "kp": 7.235,
              "imdb": 7.3,
              "filmCritics": 6.1,
              "russianFilmCritics": 66.6667,
              "await": 89.98,
              "_id": "63e669cb68d824d6ca2a1a4e"
            },
            "votes": {
              "kp": 523449,
              "imdb": 273307,
              "filmCritics": 331,
              "russianFilmCritics": 12,
              "await": 34955,
              "_id": "63e669cb68d824d6ca2a1a4f"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e669cb68d824d6ca2a1a52"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/alita-battle-angel?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e669cb68d824d6ca2a1a51"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e669cb68d824d6ca2a1a54"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/138672?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e669cb68d824d6ca2a1a53"
                }
              ],
              "_id": "63e669cb68d824d6ca2a1a50"
            },
            "id": 88173,
            "type": "movie",
            "name": "Алита: Боевой ангел",
            "description": "Действие фильма происходит через 300 лет после Великой войны в XXVI веке. Доктор Идо находит останки женщины-киборга. После починки киборг ничего не помнит, но обнаруживает, что в состоянии пользоваться боевыми приемами киборгов. Начинаются поиски утерянных воспоминаний.",
            "year": 2019,
            "alternativeName": "Alita: Battle Angel",
            "enName": null,
            "movieLength": 121,
            "names": [
              {
                "_id": "6339786bc22d011bb56b6ae3",
                "name": "Алита: Боевой ангел"
              },
              {
                "_id": "6339786bc22d011bb56b6ae4",
                "name": "Alita: Battle Angel"
              }
            ],
            "shortDescription": "Девушка-киборг пытается раскрыть тайну своего происхождения. Боевик от Джеймса Кэмерона и Роберта Родригеса",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "421850ca845e9135ac336fff11e4fde1",
              "imdb": "tt3228774",
              "tmdb": 337404,
              "_id": "6376b9b77ad98299ff964134"
            },
            "logo": {
              "_id": "6336477b248263ce89ad9af8",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a0000017ede1851f4a06c1b30a7fce95038/orig"
            },
            "poster": {
              "_id": "63398823c22d011bb5ad8e7b",
              "url": "https://st.kp.yandex.net/images/film_big/804662.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_804662.jpg"
            },
            "rating": {
              "kp": 7.576,
              "imdb": 7.3,
              "filmCritics": 6.8,
              "russianFilmCritics": 68,
              "await": 94.88,
              "_id": "63e5bf3b68d824d6ca2f0a62"
            },
            "votes": {
              "kp": 519956,
              "imdb": 238222,
              "filmCritics": 409,
              "russianFilmCritics": 25,
              "await": 12423,
              "_id": "63e5bf3b68d824d6ca2f0a63"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e5bf3b68d824d6ca2f0a67"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/cruella?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e5bf3b68d824d6ca2f0a66"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e5bf3b68d824d6ca2f0a69"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/170649?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e5bf3b68d824d6ca2f0a68"
                }
              ],
              "_id": "63e5bf3b68d824d6ca2f0a65"
            },
            "movieLength": 134,
            "id": 804662,
            "type": "movie",
            "name": "Круэлла",
            "description": "Великобритания, 1960-е годы. Эстелла была необычным ребёнком, и особенно трудно ей было мириться со всякого рода несправедливостью. Вылетев из очередной школы, она с мамой отправляется в Лондон. По дороге они заезжают в особняк известной модельерши по имени Баронесса, где в результате ужасного несчастного случая мама погибает. Добравшись до Лондона, Эстелла знакомится с двумя мальчишками — уличными мошенниками Джаспером и Хорасом.\n\n10 лет спустя та же компания промышляет на улицах британской столицы мелким воровством, но Эстелла никак не может оставить мечту сделать карьеру в мире моды. Хитростью устроившись в фешенебельный универмаг, девушка привлекает внимание Баронессы, и та берёт её к себе в штат дизайнеров.",
            "year": 2021,
            "alternativeName": "Cruella",
            "enName": null,
            "names": [
              {
                "_id": "63398823c22d011bb5ad8e77",
                "name": "Круэлла"
              },
              {
                "_id": "63398823c22d011bb5ad8e78",
                "name": "Cruella"
              }
            ],
            "shortDescription": "Бунтарка покоряет модный мир Лондона. Предыстория злодейки из «101 далматинца» с «Оскаром» за костюмы",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4252f439b43045c2851192ec61d8f5d9",
              "imdb": "tt0433035",
              "tmdb": 39254,
              "_id": "6376b9b57ad98299ff961a2d"
            },
            "logo": {
              "_id": "62ebb724b252103987d334d8",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016ef3ab354044647313b60d3e4393/orig"
            },
            "poster": {
              "_id": "63398415c22d011bb59fb6b8",
              "url": "https://st.kp.yandex.net/images/film_big/88198.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_88198.jpg"
            },
            "rating": {
              "kp": 7.663,
              "imdb": 7,
              "filmCritics": 5.9,
              "russianFilmCritics": 71.4286,
              "await": 89.3,
              "_id": "63e7c9c568d824d6ca25a3f7"
            },
            "votes": {
              "kp": 513752,
              "imdb": 334892,
              "filmCritics": 235,
              "russianFilmCritics": 7,
              "await": 23952,
              "_id": "63e7c9c568d824d6ca25a3f8"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7c9c568d824d6ca25a3fd"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/real-steel?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7c9c568d824d6ca25a3fc"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7c9c568d824d6ca25a3ff"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/60435?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7c9c568d824d6ca25a3fe"
                }
              ],
              "_id": "63e7c9c568d824d6ca25a3fb"
            },
            "id": 88198,
            "alternativeName": "Real Steel",
            "color": "#0C1012",
            "description": "События фильма происходят в будущем, где бокс запрещен за негуманностью и заменен боями 2000-фунтовых роботов, управляемых людьми. Бывший боксер, а теперь промоутер, переметнувшийся в Робобокс, решает, что наконец нашел своего чемпиона, когда ему попадается выбракованный, но очень способный робот. Одновременно на жизненном пути героя возникает 11-летний парень, оказывающийся его сыном. И по мере того, как машина пробивает свой путь к вершине, обретшие друг друга отец и сын учатся дружить.",
            "enName": null,
            "movieLength": 127,
            "name": "Живая сталь",
            "names": [
              {
                "_id": "63398415c22d011bb59fb6b4",
                "name": "Живая сталь"
              },
              {
                "_id": "63398415c22d011bb59fb6b5",
                "name": "Real Steel"
              }
            ],
            "shortDescription": "Отец с сыном тренируют робота-боксера и строят отношения с нуля. Хью Джекман в зрелищном семейном экшене",
            "year": 2011,
            "type": "movie",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "49c681d107948f2ebdf7dd6b46f6ebca",
              "imdb": "tt0903747",
              "tmdb": 1396,
              "_id": "6376b9c47ad98299ff9727ac"
            },
            "logo": {
              "_id": "62f62313252c8469efb8edfc",
              "url": "https://avatars.mds.yandex.net/get-ott/200035/2a0000017802c0dff697971233b0e9def244/orig"
            },
            "poster": {
              "_id": "63397b1dc22d011bb5795454",
              "url": "https://st.kp.yandex.net/images/film_big/404900.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_404900.jpg"
            },
            "rating": {
              "kp": 8.879,
              "imdb": 9.5,
              "filmCritics": 0,
              "russianFilmCritics": 100,
              "await": 0,
              "_id": "63e800e468d824d6caccece3"
            },
            "votes": {
              "kp": 510930,
              "imdb": 1918733,
              "filmCritics": 0,
              "russianFilmCritics": 9,
              "await": 0,
              "_id": "63e800e468d824d6caccece4"
            },
            "watchability": {
              "items": null,
              "_id": "63aff48e6b290d775e16d9bc"
            },
            "id": 404900,
            "type": "tv-series",
            "name": "Во все тяжкие",
            "description": "Школьный учитель химии Уолтер Уайт узнаёт, что болен раком лёгких. Учитывая сложное финансовое состояние дел семьи, а также перспективы, Уолтер решает заняться изготовлением метамфетамина. Для этого он привлекает своего бывшего ученика Джесси Пинкмана, когда-то исключённого из школы при активном содействии Уайта. Пинкман сам занимался варкой мета, но накануне, в ходе рейда УБН, он лишился подельника и лаборатории.",
            "year": 2008,
            "alternativeName": "Breaking Bad",
            "enName": "Breaking Bad",
            "movieLength": 47,
            "names": [
              {
                "_id": "63397b1dc22d011bb5795450",
                "name": "Во все тяжкие"
              },
              {
                "_id": "63397b1dc22d011bb5795451",
                "name": "Breaking Bad"
              }
            ],
            "shortDescription": "Умирающий учитель химии начинает варить мет ради благополучия семьи. Выдающийся драматический сериал 2010-х",
            "releaseYears": [
              {
                "_id": "6359ae2b9f6a011dbf62878d",
                "start": 2008,
                "end": 2013
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "4cf7b076d9c3a56d85dce071cf0f6066",
              "imdb": "tt1884856",
              "tmdb": 46080,
              "_id": "6376b9b77ad98299ff964a25"
            },
            "logo": {
              "_id": "62f27af0252c8469efb431d8",
              "url": "https://avatars.mds.yandex.net/get-ott/2419418/2a00000180b9f24e2e7b13f6cd7e89ec5ed8/orig"
            },
            "poster": {
              "_id": "63397832c22d011bb56a571d",
              "url": "https://st.kp.yandex.net/images/film_big/478491.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_478491.jpg"
            },
            "rating": {
              "kp": 7.253,
              "imdb": 7.5,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e7e1c368d824d6ca44ea6d"
            },
            "votes": {
              "kp": 510871,
              "imdb": 3345,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 32,
              "_id": "63e7e1c368d824d6ca44ea6e"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7e1c368d824d6ca44ea74"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/serial/masha-i-medved?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7e1c368d824d6ca44ea73"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7e1c368d824d6ca44ea76"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/313807?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7e1c368d824d6ca44ea75"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/1a632675-0d99-4268-bd5e-d5f3dd800174/orig",
                    "_id": "63e7e1c368d824d6ca44ea78"
                  },
                  "name": "START",
                  "url": "https://start.ru/watch/masha-i-medved?utm_source=kinopoisk&utm_medium=feed_watch&utm_campaign=masha-i-medved",
                  "_id": "63e7e1c368d824d6ca44ea77"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e7e1c368d824d6ca44ea7a"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/serial/123363037/season/123363092/episode/123363099?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e7e1c368d824d6ca44ea79"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e7e1c368d824d6ca44ea7c"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/10984?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e7e1c368d824d6ca44ea7b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e7e1c368d824d6ca44ea7e"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/103015097?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e7e1c368d824d6ca44ea7d"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/74a3af87-2bfa-4cdc-bc16-32a21114665b/orig",
                    "_id": "63e7e1c368d824d6ca44ea80"
                  },
                  "name": "МегаФон ТВ",
                  "url": "https://megafon.tv/shows/MiM?utm_source=yandex&utm_medium=wizard&utm_campaign=MiM",
                  "_id": "63e7e1c368d824d6ca44ea7f"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2439731/17c7ebcf-41aa-48b6-9366-621a85f1307a/orig",
                    "_id": "63e7e1c368d824d6ca44ea82"
                  },
                  "name": "Большое ТВ",
                  "url": "https://bolshoe.tv/promo/web/movie/38007?segment=yandex_feed&group=peoples&utm_campaign=ya_feed&utm_medium=ya_feed",
                  "_id": "63e7e1c368d824d6ca44ea81"
                }
              ],
              "_id": "63e7e1c368d824d6ca44ea72"
            },
            "id": 478491,
            "type": "animated-series",
            "name": "Маша и Медведь",
            "description": "О дружбе и приключениях маленькой озорной девочки Маши и ее заботливого друга Медведя. Их дружба является олицетворением комичных взаимоотношений между ребенком, исследующим окружающий мир, и взрослым, поддерживающим его в этом увлекательном приключении.",
            "year": 2009,
            "alternativeName": null,
            "enName": null,
            "movieLength": 7,
            "names": [
              {
                "_id": "63397832c22d011bb56a571a",
                "name": "Маша и Медведь"
              }
            ],
            "shortDescription": "История дружбы озорной девчонки и добродушного лесного жителя. Энергичная анимация, популярная во всем мире\n",
            "releaseYears": [
              {
                "_id": "6359ae149f6a011dbf6269ee",
                "start": 2009,
                "end": null
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "4c5829108482e28985ca11a15b9c7049",
              "imdb": "tt0903624",
              "tmdb": 49051,
              "_id": "6376b9bd7ad98299ff96a41a"
            },
            "logo": {
              "_id": "62f7ae05252c8469ef099e51",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016e043b586890565729640d431cfc/orig"
            },
            "poster": {
              "_id": "63398180c22d011bb596cf21",
              "url": "https://st.kp.yandex.net/images/film_big/278522.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_278522.jpg"
            },
            "rating": {
              "kp": 8.096,
              "imdb": 7.8,
              "filmCritics": 6.6,
              "russianFilmCritics": 90,
              "await": 93.99,
              "_id": "63d9e6cae4f6884d38bef791"
            },
            "votes": {
              "kp": 509984,
              "imdb": 835235,
              "filmCritics": 307,
              "russianFilmCritics": 30,
              "await": 82823,
              "_id": "63e7b41968d824d6ca2a9bc9"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7b41968d824d6ca2a9bd1"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/the-hobbit-an-unexpected-journey?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7b41968d824d6ca2a9bd0"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7b41968d824d6ca2a9bd3"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/96085?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7b41968d824d6ca2a9bd2"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e7b41968d824d6ca2a9bd5"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/16016?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e7b41968d824d6ca2a9bd4"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1648503/97e3cbbd-40ee-4298-888d-ed2d0f022a69/orig",
                    "_id": "63e7b41968d824d6ca2a9bd7"
                  },
                  "name": "more.tv",
                  "url": "https://more.tv/hobbit_nezhdannoe_puteshestvie?utm_source=yandex-snippet&utm_medium=snippet&utm_campaign=hobbit_nezhdannoe_puteshestvie",
                  "_id": "63e7b41968d824d6ca2a9bd6"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e7b41968d824d6ca2a9bd9"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/54978844?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e7b41968d824d6ca2a9bd8"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/224348/8b10c84b-e1bb-4493-9bc4-6ee56554403a/orig",
                    "_id": "63e7b41968d824d6ca2a9bdb"
                  },
                  "name": "viju",
                  "url": "https://viju.ru/filmy/khobbit-nezhdannoe-puteshestvie?utm_campaign=yandex_content_integration&utm_medium=affiliate&utm_source=yandex",
                  "_id": "63e7b41968d824d6ca2a9bda"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e7b41968d824d6ca2a9bdd"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/618e055dbb003f90038998ce?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e7b41968d824d6ca2a9bdc"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2439731/17c7ebcf-41aa-48b6-9366-621a85f1307a/orig",
                    "_id": "63e7b41968d824d6ca2a9bdf"
                  },
                  "name": "Большое ТВ",
                  "url": "https://bolshoe.tv/promo/web/movie/6190?segment=yandex_feed&group=peoples&utm_campaign=ya_feed&utm_medium=ya_feed",
                  "_id": "63e7b41968d824d6ca2a9bde"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/223007/c6b9b3d8-3258-4394-9cae-c86fdb56a0c6/orig",
                    "_id": "63e7b41968d824d6ca2a9be1"
                  },
                  "name": "НТВ-ПЛЮС Онлайн ТВ",
                  "url": "https://ntvplus.tv/watch/16906-hobbit-nezhdannoe-puteshestvie?utm_source=kinopoisk",
                  "_id": "63e7b41968d824d6ca2a9be0"
                }
              ],
              "_id": "63e7b41968d824d6ca2a9bcf"
            },
            "movieLength": 169,
            "id": 278522,
            "type": "movie",
            "name": "Хоббит: Нежданное путешествие",
            "description": "Хоббит Бильбо Бэггинс пускается в грандиозный поход, целью которого является отвоевание утраченного королевства гномов Эребор у дракона Смауга. Совершенно неожиданно с хоббитом налаживает контакт волшебник Гэндальф Серый. Так Бильбо находит себя и присоединяется к компании тринадцати гномов, возглавляемых легендарным воином Торином Дубощитом. Их путешествие пройдёт через Дикий Край, предательские земли, населенные гоблинами и орками, смертоносными варгами, гигантскими пауками, меняющим шкуры народом и волшебниками.\n\nИ хотя их цель находится на Востоке, среди пустошей Одинокой Горы, сначала им придется выбраться из туннелей гоблинов, где Бильбо встретит существо, которое изменит его жизнь навсегда - Голлума.",
            "year": 2012,
            "alternativeName": "The Hobbit: An Unexpected Journey",
            "enName": null,
            "names": [
              {
                "_id": "63398180c22d011bb596cf1d",
                "name": "Хоббит: Нежданное путешествие"
              },
              {
                "_id": "63398180c22d011bb596cf1e",
                "name": "The Hobbit: An Unexpected Journey"
              }
            ],
            "shortDescription": "Бильбо идет в поход с гномами и знакомится с Голлумом. Эпичная экранизация повести Толкина",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "40a0771c6ba9f548aa9ddc69052ed008",
              "imdb": "tt1865718",
              "tmdb": 40075,
              "_id": "6376b9c57ad98299ff973cab"
            },
            "logo": {
              "_id": "62eafbceb2521039875ff5c7",
              "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a00000170cd8dc5cbb1908b56731c972792/orig"
            },
            "poster": {
              "_id": "63397ea0c22d011bb58bdf8e",
              "url": "https://st.kp.yandex.net/images/film_big/591929.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_591929.jpg"
            },
            "rating": {
              "kp": 8.963,
              "imdb": 8.9,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63ba1e4f0b7d940e835332ae"
            },
            "votes": {
              "kp": 506653,
              "imdb": 112697,
              "filmCritics": 0,
              "russianFilmCritics": 1,
              "await": 3,
              "_id": "63e7b06668d824d6caf5c09b"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7b06668d824d6caf5c09f"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/serial/gravity-falls?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7b06668d824d6caf5c09e"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7b06668d824d6caf5c0a1"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/graviti_folz?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7b06668d824d6caf5c0a0"
                }
              ],
              "_id": "63e7b06668d824d6caf5c09d"
            },
            "id": 591929,
            "type": "animated-series",
            "name": "Гравити Фолз",
            "description": "История рассказывает о приключениях близнецов, брата и сестры Диппера и Мэйбл Пайнс, чьи летние планы отправляются в чулан, когда родители оправляют их к дальнему родственнику в тихий городок Гравити Фолз. Но так ли прост этот город, родственник и жители, и какие тайны ждут своих первооткрывателей?",
            "year": 2012,
            "alternativeName": "Gravity Falls",
            "enName": "Gravity Falls",
            "movieLength": 22,
            "names": [
              {
                "_id": "63397ea0c22d011bb58bdf8a",
                "name": "Гравити Фолз"
              },
              {
                "_id": "63397ea0c22d011bb58bdf8b",
                "name": "Gravity Falls"
              }
            ],
            "shortDescription": "Близнецы проводят каникулы у странного прадядюшки. Тайны и аномалии в захватывающем мультсериале Алекса Хирша",
            "releaseYears": [
              {
                "_id": "6359ae039f6a011dbf625405",
                "start": 2012,
                "end": 2016
              }
            ]
          },
          {
            "externalId": {
              "kpHD": "41ed3fb933ffec588508c40b6297d6a4",
              "imdb": "tt0216434",
              "tmdb": 72215,
              "_id": "6376b9c17ad98299ff96f020"
            },
            "logo": {
              "_id": "62ee8ed00f5be41246ecc262",
              "url": "https://avatars.mds.yandex.net/get-ott/212840/2a000001771afbbd3a3348a0dca0adbf9945/orig"
            },
            "poster": {
              "_id": "63398408c22d011bb59f8c9f",
              "url": "https://st.kp.yandex.net/images/film_big/45319.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_45319.jpg"
            },
            "rating": {
              "_id": "63398408c22d011bb59f8c9d",
              "kp": 9.196,
              "imdb": 8.4,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0
            },
            "votes": {
              "kp": 506097,
              "imdb": 3785,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "63e8ea2768d824d6ca92dddf"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/0f86e907-9531-47e9-87bd-5101a08d4e30/orig",
                    "_id": "63e8ea2768d824d6ca92dde3"
                  },
                  "name": "PREMIER",
                  "url": "https://premier.one/show/11128?utm_source=yandex&utm_medium=yandex_feed_search&utm_campaign=yandex_feed",
                  "_id": "63e8ea2768d824d6ca92dde2"
                }
              ],
              "_id": "63e8ea2768d824d6ca92dde1"
            },
            "movieLength": 10,
            "id": 45319,
            "type": "cartoon",
            "name": "Жил-был пёс",
            "description": "Жил-был пёс. Верно служил, но выгнали его по старости. И решил он повеситься, да повстречал в лесу такого же старого волка...",
            "year": 1982,
            "alternativeName": null,
            "enName": null,
            "names": [
              {
                "_id": "63398408c22d011bb59f8c9c",
                "name": "Жил-был пёс"
              }
            ],
            "shortDescription": "Волк помогает старому псу вернуться к людям. Душевный мультфильм, подаривший народу крылатую фразу «Щас спою»",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "49b1e56630d3dd45bd2befd5a866c5bf",
              "imdb": "tt6723592",
              "tmdb": 577922,
              "_id": "6376b9b27ad98299ff95f18c"
            },
            "logo": {
              "_id": "62e4596a028619ccaf6a73a6",
              "url": "https://avatars.mds.yandex.net/get-ott/239697/2a000001806006ba05ae72483e16dd65706b/orig"
            },
            "poster": {
              "_id": "63397a60c22d011bb5754ff4",
              "url": "https://st.kp.yandex.net/images/film_big/1236063.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1236063.jpg"
            },
            "rating": {
              "kp": 7.529,
              "imdb": 7.3,
              "filmCritics": 6.9,
              "russianFilmCritics": 60,
              "await": 98.23,
              "_id": "63d2894357101ffd39220dcf"
            },
            "votes": {
              "kp": 502238,
              "imdb": 515296,
              "filmCritics": 371,
              "russianFilmCritics": 30,
              "await": 43255,
              "_id": "63e5f32868d824d6cab5d196"
            },
            "watchability": {
              "_id": "63397a60c22d011bb5755081",
              "items": null
            },
            "movieLength": 150,
            "id": 1236063,
            "type": "movie",
            "name": "Довод",
            "description": "После теракта в киевском оперном театре агент ЦРУ объединяется с британской разведкой, чтобы противостоять русскому олигарху, который сколотил состояние на торговле оружием. Для этого агенты используют инверсию времени — технологию будущего, позволяющую времени идти вспять.",
            "year": 2020,
            "alternativeName": "Tenet",
            "enName": null,
            "names": [
              {
                "_id": "63397a60c22d011bb5754ff0",
                "name": "Довод"
              },
              {
                "_id": "63397a60c22d011bb5754ff1",
                "name": "Tenet"
              }
            ],
            "color": "#000000",
            "shortDescription": "Протагонист пытается обезвредить террориста с помощью уникальной технологии. Блокбастер-пазл Кристофера Нолана",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4fabed06d035b5e1b87b75607927c8e5",
              "imdb": "tt3460252",
              "tmdb": 273248,
              "_id": "6376b9b67ad98299ff963622"
            },
            "logo": {
              "_id": "62e9b4dfb2521039879942bd",
              "url": "https://avatars.mds.yandex.net/get-ott/223007/2a0000016e4b04a98f5dd75ad1f6ce2902a7/orig"
            },
            "poster": {
              "_id": "633982c2c22d011bb59b1c34",
              "url": "https://st.kp.yandex.net/images/film_big/819101.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_819101.jpg"
            },
            "rating": {
              "kp": 7.961,
              "imdb": 7.8,
              "filmCritics": 7.3,
              "russianFilmCritics": 87.0968,
              "await": 98.7,
              "_id": "63e746ac68d824d6ca9f1d5e"
            },
            "votes": {
              "kp": 498913,
              "imdb": 611115,
              "filmCritics": 337,
              "russianFilmCritics": 31,
              "await": 29849,
              "_id": "63e746ac68d824d6ca9f1d5f"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e746ac68d824d6ca9f1d62"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/136338?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e746ac68d824d6ca9f1d61"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e746ac68d824d6ca9f1d64"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/omerzitelnaya-vosmyerka-2015/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e746ac68d824d6ca9f1d63"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e746ac68d824d6ca9f1d66"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/94478188?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e746ac68d824d6ca9f1d65"
                }
              ],
              "_id": "63e746ac68d824d6ca9f1d60"
            },
            "id": 819101,
            "type": "movie",
            "name": "Омерзительная восьмерка",
            "description": "США после Гражданской войны. Легендарный охотник за головами Джон Рут по кличке Вешатель конвоирует заключенную. По пути к ним прибиваются еще несколько путешественников. Снежная буря вынуждает компанию искать укрытие в лавке на отшибе, где уже расположилось весьма пёстрое общество: генерал конфедератов, мексиканец, ковбой… И один из них — не тот, за кого себя выдает.",
            "year": 2015,
            "alternativeName": "The Hateful Eight",
            "enName": null,
            "names": [
              {
                "_id": "633982c2c22d011bb59b1c30",
                "name": "Омерзительная восьмерка"
              },
              {
                "_id": "633982c2c22d011bb59b1c31",
                "name": "The Hateful Eight"
              }
            ],
            "movieLength": 168,
            "shortDescription": "Снег и несколько ублюдков на Диком Западе. Эффектная сатира на американские ценности от Квентина Тарантино",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4726854ee2be6d928a2d852281fa18f9",
              "imdb": "tt0245429",
              "tmdb": 129,
              "_id": "6376b9b87ad98299ff9651a3"
            },
            "logo": {
              "_id": "62f051b90f5be412460547a1",
              "url": "https://avatars.mds.yandex.net/get-ott/1531675/2a00000173947e70f5a7e9d4ab80cf554ade/orig"
            },
            "poster": {
              "_id": "6339eb5d89ae969da213dafa",
              "url": "https://st.kp.yandex.net/images/film_big/370.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_370.jpg"
            },
            "rating": {
              "kp": 8.476,
              "imdb": 8.6,
              "filmCritics": 8.6,
              "russianFilmCritics": 100,
              "await": 0,
              "_id": "63e8739d68d824d6ca68ec04"
            },
            "votes": {
              "kp": 498101,
              "imdb": 771960,
              "filmCritics": 195,
              "russianFilmCritics": 5,
              "await": 0,
              "_id": "63e8739d68d824d6ca68ec05"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e8739d68d824d6ca68ec08"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/sen-to-chihiro-no-kamikakushi?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e8739d68d824d6ca68ec07"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8739d68d824d6ca68ec0a"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/100076?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8739d68d824d6ca68ec09"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/daeb142e-3ecc-4bb2-9bff-4827996643ab/orig",
                    "_id": "63e8739d68d824d6ca68ec0c"
                  },
                  "name": "KION",
                  "url": "https://kion.ru/video/movie/601879570?utm_source=yandex&utm_medium=organic&utm_campaign=wizard",
                  "_id": "63e8739d68d824d6ca68ec0b"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e8739d68d824d6ca68ec0e"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/146708518?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e8739d68d824d6ca68ec0d"
                }
              ],
              "_id": "63e8739d68d824d6ca68ec06"
            },
            "movieLength": 125,
            "id": 370,
            "type": "anime",
            "name": "Унесённые призраками",
            "description": "Тихиро с мамой и папой переезжает в новый дом. Заблудившись по дороге, они оказываются в странном пустынном городе, где их ждет великолепный пир. Родители с жадностью набрасываются на еду и к ужасу девочки превращаются в свиней, став пленниками злой колдуньи Юбабы. Теперь, оказавшись одна среди волшебных существ и загадочных видений, Тихиро должна придумать, как избавить своих родителей от чар коварной старухи.",
            "year": 2001,
            "alternativeName": "Sen to Chihiro no kamikakushi",
            "enName": null,
            "names": [
              {
                "_id": "6339eb5d89ae969da213daf6",
                "name": "Унесённые призраками"
              },
              {
                "_id": "6339eb5d89ae969da213daf7",
                "name": "Sen to Chihiro no kamikakushi"
              }
            ],
            "shortDescription": "Девочка должна спасти своих родителей в мире духов. Шедевр Хаяо Миядзаки, фаворит анимационных рейтингов мира",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "45fff9f9f42d6637a39fe31f02fdd494",
              "imdb": "tt2294629",
              "tmdb": 109445,
              "_id": "6376b9c07ad98299ff96e526"
            },
            "logo": {
              "_id": "62e9d97eb252103987b07f88",
              "url": "https://avatars.mds.yandex.net/get-ott/1672343/2a00000178cacc77085815bb14101aeb940b/orig"
            },
            "poster": {
              "_id": "63398207c22d011bb598a8ac",
              "url": "https://st.kp.yandex.net/images/film_big/493208.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_493208.jpg"
            },
            "rating": {
              "kp": 7.868,
              "imdb": 7.4,
              "filmCritics": 7.7,
              "russianFilmCritics": 100,
              "await": 89.38,
              "_id": "63e7952d68d824d6cacabd83"
            },
            "votes": {
              "kp": 495644,
              "imdb": 631631,
              "filmCritics": 251,
              "russianFilmCritics": 6,
              "await": 6445,
              "_id": "63e7952d68d824d6cacabd84"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e7952d68d824d6cacabd8a"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/frozen-51604?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e7952d68d824d6cacabd89"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e7952d68d824d6cacabd8c"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/103296?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e7952d68d824d6cacabd8b"
                }
              ],
              "_id": "63e7952d68d824d6cacabd88"
            },
            "movieLength": 102,
            "id": 493208,
            "type": "cartoon",
            "name": "Холодное сердце",
            "description": "Когда сбывается древнее предсказание, и королевство погружается в объятия вечной зимы, трое бесстрашных героев - принцесса Анна, отважный Кристофф и его верный олень Свен - отправляются в горы, чтобы найти сестру Анны, Эльзу, которая может снять со страны леденящее заклятие. По пути их ждет множество увлекательных сюрпризов и захватывающих приключений: встреча с мистическими троллями, знакомство с очаровательным снеговиком по имени Олаф, горные вершины покруче Эвереста и магия в каждой снежинке. Анне и Кристоффу предстоит сплотиться и противостоять могучей стихии, чтобы спасти королевство и тех, кто им дорог.",
            "year": 2013,
            "alternativeName": "Frozen",
            "enName": null,
            "names": [
              {
                "_id": "63398207c22d011bb598a8a8",
                "name": "Холодное сердце"
              },
              {
                "_id": "63398207c22d011bb598a8a9",
                "name": "Frozen"
              }
            ],
            "shortDescription": "Анна и Эльза — родные сестры, которые ищут путь к сердцам друг друга. Мюзикл о любви, способной растопить лед\n",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "412f4dca0a68bb8ba83ea6792d599686",
              "imdb": "tt1631867",
              "tmdb": 137113,
              "_id": "6376b9ba7ad98299ff966897"
            },
            "logo": {
              "_id": "62e34c0e028619ccaffde670",
              "url": "https://avatars.mds.yandex.net/get-ott/2419418/2a000001720d137bcfe7183697e7076adcb1/orig"
            },
            "poster": {
              "_id": "63397aa8c22d011bb576ea6b",
              "url": "https://st.kp.yandex.net/images/film_big/505851.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_505851.jpg"
            },
            "rating": {
              "_id": "63397aa8c22d011bb576ea69",
              "kp": 7.941,
              "imdb": 7.9,
              "filmCritics": 7.5,
              "russianFilmCritics": 95,
              "await": 94.34
            },
            "votes": {
              "kp": 494075,
              "imdb": 686763,
              "filmCritics": 336,
              "russianFilmCritics": 20,
              "await": 33381,
              "_id": "63e7799668d824d6cabf97fb"
            },
            "watchability": {
              "items": null,
              "_id": "63bb94fb0b7d940e834f7dd6"
            },
            "movieLength": 113,
            "id": 505851,
            "type": "movie",
            "name": "Грань будущего",
            "description": "В недалёком будущем раса инопланетян вторгается на Землю. Никакая армия в мире не может противостоять им. Майор Уильям Кейдж умирает в бою, но случается невозможное — он оказывается во временной петле. Раз за разом он попадает в один и тот же бой, сражается и умирает снова и снова. И каждое повторяющееся сражение приближает его к разгадке того, как победить врага.",
            "year": 2014,
            "alternativeName": "Edge of Tomorrow",
            "enName": null,
            "names": [
              {
                "_id": "63397aa8c22d011bb576ea67",
                "name": "Грань будущего"
              },
              {
                "_id": "63397aa8c22d011bb576ea68",
                "name": "Edge of Tomorrow"
              }
            ],
            "shortDescription": "Том Круз гибнет в бою с пришельцами, но это только начало. Красивый экшен по популярному японскому роману",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "47cf35a5d38ad7b5aaf5e51fbb1e7867",
              "imdb": "tt0208092",
              "tmdb": 107,
              "_id": "6376b9bb7ad98299ff967237"
            },
            "logo": {
              "_id": "62ecb33fb2521039876f8945",
              "url": "https://avatars.mds.yandex.net/get-ott/224348/2a000001721944c81e7747c38b282ab0880e/orig"
            },
            "poster": {
              "_id": "633977a2c22d011bb564b5c2",
              "url": "https://st.kp.yandex.net/images/film_big/526.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_526.jpg"
            },
            "rating": {
              "kp": 8.548,
              "imdb": 8.2,
              "filmCritics": 6.4,
              "russianFilmCritics": 100,
              "await": 0,
              "_id": "63c5efff2b1609d669162c81"
            },
            "votes": {
              "kp": 493419,
              "imdb": 862903,
              "filmCritics": 143,
              "russianFilmCritics": 3,
              "await": 0,
              "_id": "63e891d968d824d6ca912168"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e891d968d824d6ca9121d8"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/2109718?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e891d968d824d6ca9121d7"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/236744/c88e652e-2eb1-472d-b636-a266364dbf58/orig",
                    "_id": "63e891d968d824d6ca9121da"
                  },
                  "name": "Смотрёшка",
                  "url": "https://smotreshka.tv/vod/vipplay/6308630cb51ecafaef03f6e6?utm_source=yandex_search&utm_campaign=yandex_feed&utm_term=viju&utm_content=Viju",
                  "_id": "63e891d968d824d6ca9121d9"
                }
              ],
              "_id": "63e891d968d824d6ca9121d6"
            },
            "movieLength": 104,
            "id": 526,
            "type": "movie",
            "name": "Большой куш",
            "description": "Фрэнки Четыре Пальца должен был переправить краденый алмаз из Англии в США своему боссу Эви, но, сделав ставку на подпольный боксерский поединок, он попал в круговорот весьма нежелательных событий. Вокруг него и его груза разворачивается сложная интрига с участием множества колоритных персонажей лондонского дна — русского гангстера, троих незадачливых грабителей, хитрого боксера и угрюмого громилы грозного мафиози. Каждый норовит в одиночку сорвать большой куш.",
            "year": 2000,
            "alternativeName": "Snatch",
            "enName": null,
            "names": [
              {
                "_id": "633977a2c22d011bb564b5be",
                "name": "Большой куш"
              },
              {
                "_id": "633977a2c22d011bb564b5bf",
                "name": "Snatch"
              }
            ],
            "shortDescription": "На охоту за крупным алмазом выходят цыгане, евреи и местные головорезы. Криминальная Англия глазами Гая Ричи",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4153f645576f5c70b4af1d3e2138b873",
              "imdb": "tt3501632",
              "tmdb": 284053,
              "_id": "6376b9bf7ad98299ff96c358"
            },
            "logo": {
              "_id": "62f76429252c8469effaa2bf",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a0000016e043c0cd75eae4fa0239db7e887/orig"
            },
            "poster": {
              "_id": "633980d1c22d011bb59487e8",
              "url": "https://st.kp.yandex.net/images/film_big/822709.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_822709.jpg"
            },
            "rating": {
              "kp": 7.713,
              "imdb": 7.9,
              "filmCritics": 7.6,
              "russianFilmCritics": 90.4762,
              "await": 92.9,
              "_id": "63e6eebf68d824d6cabbadb4"
            },
            "votes": {
              "kp": 492027,
              "imdb": 760958,
              "filmCritics": 440,
              "russianFilmCritics": 21,
              "await": 72482,
              "_id": "63e6eebf68d824d6cabbadb5"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/7713e586-17d1-42d1-ac62-53e9ef1e70c3/orig",
                    "_id": "63e6eebf68d824d6cabbadbc"
                  },
                  "name": "Okko",
                  "url": "https://okko.tv/movie/thor-ragnarok?utm_medium=referral&utm_source=yandex_search&utm_campaign=new_search_feed",
                  "_id": "63e6eebf68d824d6cabbadbb"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e6eebf68d824d6cabbadbe"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/131252?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e6eebf68d824d6cabbadbd"
                }
              ],
              "_id": "63e6eebf68d824d6cabbadba"
            },
            "movieLength": 130,
            "id": 822709,
            "type": "movie",
            "name": "Тор: Рагнарёк",
            "description": "Вернувшись в Асгард в поисках таинственного врага, ведущего охоту на Камни Бесконечности, Тор обнаруживает, что действия его брата Локи, захватившего трон Асгарда, привели к приближению наиболее страшного события - Рагнарёка. По легенде это ознаменует последнюю битву Асгарда, последствием которой станет его полное уничтожение. В попытке предотвратить это событие Тору предстоит прибегнуть к помощи своего товарища из Мстителей - Халка. Вместе им предстоит столкнуться лицом к лицу со злейшим врагом всех девяти миров - огненным демоном Суртуром, целью которого является исполнение пророчества о Рагнарёке и уничтожение девяти миров.",
            "year": 2017,
            "alternativeName": "Thor: Ragnarok",
            "enName": null,
            "names": [
              {
                "_id": "633980d1c22d011bb59487e4",
                "name": "Тор: Рагнарёк"
              },
              {
                "_id": "633980d1c22d011bb59487e5",
                "name": "Thor: Ragnarok"
              }
            ],
            "shortDescription": "Сын Одина возвращает свой молот, чтобы остановить гибель мира. Третий фильм о богах Асгарда от Тайки Вайтити",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "46020c592c198b0c95b955a396fb7b25",
              "imdb": "tt7601480",
              "tmdb": 529106,
              "_id": "6376b9cd7ad98299ff97c73b"
            },
            "logo": {
              "_id": "63364692248263ce89ad6538",
              "url": "https://avatars.mds.yandex.net/get-ott/1534341/2a000001793caaff19d3480238d6fdc8d20b/orig"
            },
            "poster": {
              "_id": "633977a2c22d011bb564bf77",
              "url": "https://st.kp.yandex.net/images/film_big/1109271.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_1109271.jpg"
            },
            "rating": {
              "kp": 7.181,
              "imdb": 6.3,
              "filmCritics": 0,
              "russianFilmCritics": 69.4444,
              "await": 91.13,
              "_id": "63e5bdf368d824d6ca1b10d1"
            },
            "votes": {
              "kp": 486632,
              "imdb": 12674,
              "filmCritics": 0,
              "russianFilmCritics": 36,
              "await": 21082,
              "_id": "63e5bdf368d824d6ca1b10d2"
            },
            "watchability": {
              "_id": "633977a2c22d011bb564bfc5",
              "items": null
            },
            "movieLength": 136,
            "id": 1109271,
            "type": "movie",
            "name": "Майор Гром: Чумной Доктор",
            "description": "Майор полиции Игорь Гром известен всему Санкт-Петербургу пробивным характером и непримиримой позицией по отношению к преступникам всех мастей. Неимоверная сила, аналитический склад ума и неподкупность — всё это делает майора Грома идеальным полицейским. Но всё резко меняется с появлением человека в маске Чумного Доктора. Заявив, что его город «болен чумой беззакония», он принимается за «лечение», убивая людей, которые в своё время избежали наказания при помощи денег и влияния. Общество взбудоражено. Полиция бессильна. Игорь впервые сталкивается с трудностями в расследовании, от итогов которого может зависеть судьба всего города.",
            "year": 2021,
            "alternativeName": null,
            "enName": null,
            "names": [
              {
                "_id": "633977a2c22d011bb564bf74",
                "name": "Майор Гром: Чумной Доктор"
              }
            ],
            "color": "#201010",
            "shortDescription": "Честный полицейский ловит мстителя в маске, убивающего коррупционеров. Супергеройское кино по комиксу Bubble",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "4b6cb2aed31a095ab8e862ec76108f21",
              "imdb": "tt0120735",
              "tmdb": 100,
              "_id": "6376b9c37ad98299ff9717a7"
            },
            "logo": {
              "_id": "62f0edcb0f5be41246654df2",
              "url": "https://avatars.mds.yandex.net/get-ott/2385704/2a000001703f66c445bb1a49e630887e02c7/orig"
            },
            "poster": {
              "_id": "6339803bc22d011bb5928caa",
              "url": "https://st.kp.yandex.net/images/film_big/522.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_522.jpg"
            },
            "rating": {
              "kp": 8.557,
              "imdb": 8.2,
              "filmCritics": 6.7,
              "russianFilmCritics": 0,
              "await": 0,
              "_id": "638a5617ead58d1db7e435fa"
            },
            "votes": {
              "kp": 484862,
              "imdb": 587473,
              "filmCritics": 67,
              "russianFilmCritics": 1,
              "await": 0,
              "_id": "63e8a3cd68d824d6cad60b51"
            },
            "watchability": {
              "items": [
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/2419418/0dfd1724-848f-4725-9160-abc571f41c11/orig",
                    "_id": "63e8a3cd68d824d6cad60b56"
                  },
                  "name": "Иви",
                  "url": "https://www.ivi.ru/watch/59519?utm_source=yandex&utm_medium=wizard",
                  "_id": "63e8a3cd68d824d6cad60b55"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/239697/947e777c-2f73-4cbc-b09d-6bfa3966ba13/orig",
                    "_id": "63e8a3cd68d824d6cad60b58"
                  },
                  "name": "Триколор Кино и ТВ",
                  "url": "https://kino.tricolor.tv/watch/karty-dengi-dva-stvola-1998/?utm_source=yandex&utm_medium=feed",
                  "_id": "63e8a3cd68d824d6cad60b57"
                },
                {
                  "logo": {
                    "url": "https://avatars.mds.yandex.net/get-ott/1672343/54096cbe-cc3b-41c9-8e44-990ebbca8d61/orig",
                    "_id": "63e8a3cd68d824d6cad60b5a"
                  },
                  "name": "Wink",
                  "url": "https://wink.ru/media_items/111310278?utm_source=yandex&utm_medium=koldunschick&utm_content=name",
                  "_id": "63e8a3cd68d824d6cad60b59"
                }
              ],
              "_id": "63e8a3cd68d824d6cad60b54"
            },
            "movieLength": 107,
            "id": 522,
            "type": "movie",
            "name": "Карты, деньги, два ствола",
            "description": "Четверо молодых парней накопили каждый по 25 тысяч фунтов, чтобы один из них мог сыграть в карты с опытным шулером и матерым преступником, известным по кличке Гарри-Топор. Парень в итоге проиграл 500 тысяч, на уплату долга ему дали неделю.\n\nВ противном случае и ему и его «спонсорам» каждый день будут отрубать по пальцу, а потом... Чтобы выйти из положения, ребята решили ограбить бандитов, решивших ограбить трех «ботаников», выращивающих марихуану для местного наркобарона. Но на этом приключения четверки не заканчиваются...",
            "year": 1998,
            "alternativeName": "Lock, Stock and Two Smoking Barrels",
            "enName": null,
            "names": [
              {
                "_id": "6339803bc22d011bb5928ca6",
                "name": "Карты, деньги, два ствола"
              },
              {
                "_id": "6339803bc22d011bb5928ca7",
                "name": "Lock, Stock and Two Smoking Barrels"
              }
            ],
            "shortDescription": "Четверке друзей из Лондона нужно где-то найти 500 000 фунтов. Культовая черная комедия, дебют Гая Ричи",
            "releaseYears": []
          },
          {
            "externalId": {
              "kpHD": "d11ae60c565b463c9974b4c39b38b3e8",
              "_id": "6363aa6b08cbd3f03749cc68"
            },
            "poster": {
              "url": "https://st.kp.yandex.net/images/film_big/5078983.jpg",
              "previewUrl": "https://st.kp.yandex.net/images/film_iphone/iphone360_5078983.jpg",
              "_id": "6363aa6b08cbd3f03749cc6c"
            },
            "rating": {
              "kp": 7.064,
              "imdb": 0,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 94.54,
              "_id": "63e5862868d824d6cadf520d"
            },
            "votes": {
              "kp": 484242,
              "imdb": 0,
              "filmCritics": 0,
              "russianFilmCritics": 0,
              "await": 42648,
              "_id": "63e5862868d824d6cadf520e"
            },
            "watchability": {
              "items": null,
              "_id": "6363aa6b08cbd3f03749cc8c"
            },
            "id": 5078983,
            "name": "Мажор в Сочи",
            "alternativeName": null,
            "enName": null,
            "names": [
              {
                "name": "Мажор в Сочи",
                "_id": "6363aa6b08cbd3f03749cc69"
              }
            ],
            "type": "movie",
            "description": "Московские массивные здания и оживлённые дороги Мажор сменит на живописные курортные виды, домик в горах и извилистые серпантины. Туда он перебирается вместе с дочерью Соней, где у них появился свой семейный бизнес — эко-отель. Но ещё до открытия всё идёт наперекосяк. Вначале в гостинице устраивают погром, затем Соколовский наткнётся на местного мажора и перейдёт дорогу сочинскому воротиле, который планирует снести целый жилой квартал, чтобы построить на его месте винодельню.",
            "shortDescription": "Как изменить жизнь и защитить ребенка, если привык решать проблемы силой? Душевный экшен с Павлом Прилучным",
            "releaseYears": [],
            "year": 2022,
            "movieLength": 109
          }
        ],
        "total": 21299,
        "limit": 100,
        "page": 1,
        "pages": 213
      }
      this.films = this.data.docs;
    },
    getRandomFilmId() {
       return getRandomInt(this.films.length)
    }
  }
})
