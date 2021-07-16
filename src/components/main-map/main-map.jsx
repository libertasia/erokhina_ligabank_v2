import React from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import desktopmap1xpng from '../../img/map-desktop@1x.png';
import desktopmap2xpng from '../../img/map-desktop@2x.png';
import desktopmap1xwebp from '../../img/map-desktop@1x.webp';
import desktopmap2xwebp from '../../img/map-desktop@2x.webp';
import tabletmap1xwebp from '../../img/map-tablet@1x.webp';
import tabletmap2xwebp from '../../img/map-tablet@2x.webp';
import mobilemap1xwebp from '../../img/map-mobile@1x.webp';
import mobilemap2xwebp from '../../img/map-mobile@2x.webp';
import location from '../../img/location.svg';


const MAP_COORDINATES = [59.968137, 30.316272];

const MainMap = () => {
  return (
    <section className="map container">
      <h2 className="map__title">Отделения Лига Банка</h2>
      <YMaps>
        <Map className="map__yandex"
          defaultState={{
            center: MAP_COORDINATES,
            zoom: 15
          }}
          width={1170}
          height={462}>
          <Placemark
            geometry={MAP_COORDINATES}
            options={{
              iconLayout: `default#image`,
              iconImageHref: location
            }}
          />
        </Map>
        <picture>
          <source type="image/webp" media="(max-width: 767px)" srcSet={`${mobilemap1xwebp} 1x, ${mobilemap2xwebp} 2x`} />
          <source type="image/webp" media="(max-width: 1023px)" srcSet={`${tabletmap1xwebp} 1x, ${tabletmap2xwebp} 2x`} />
          <source type="image/webp" media="(min-width: 1024px)" srcSet={`${desktopmap1xwebp} 1x, ${desktopmap2xwebp} 2x`} />
          <img className="map__image" src={desktopmap1xpng} srcSet={`${desktopmap2xpng} 2x`} width={1170} height={462} alt="Карта отделений Лига Банка" />
        </picture>
      </YMaps>
    </section>
  );
};

export default MainMap;
