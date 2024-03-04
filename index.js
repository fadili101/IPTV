function parseM3U(data) {
  const lines = data.split('\n');
  let currentCategory = null;
  const parsedData = {
    categories: {},
    channels: [],
    movies: [],
    series: [],
  };

  for (const line of lines) {
    if (line.startsWith('#EXTINF:-1')) {
      console.log("avant",line);
      const entry = parseEntry(line);

      console.log('Entry:', entry);

      if (entry.category) {
        currentCategory = entry.category;

        if (!parsedData.categories[currentCategory]) {
          parsedData.categories[currentCategory] = [];
        }
      }

      if (entry.url) {
        const entryData = {
          name: entry.name,
          logo: entry.logo,
          url: entry.url,
          category: currentCategory,
        };

        //console.log('Adding entry:', entryData);

        if (entry.category && entry.url.includes('/movie/')) {
          parsedData.movies.push(entryData);
        } else if (entry.category && entry.url.includes('/series/')) {
          parsedData.series.push(entryData);
        } else if (entry.category) {
          parsedData.channels.push(entryData);
        }
      }
    }
  }

  return parsedData;
}

function parseEntry(line) {
  const match = line.match(/#EXTINF:-1 tvg-id="([^"]*)" tvg-name="([^"]+)" tvg-logo="([^"]+)" group-title="([^"]+)",([^]+)$/);

  if (match) {
    const urlMatches = match[5].match(/(http[^\s]+)/);
    const url = urlMatches ? urlMatches[1] : null;

    return {
      category: match[4].trim(),
      name: match[2].trim(),
      logo: match[3].trim(),
      url: url,
    };
  }

  return {};
}

function getChannelNames(data) {
  const parsedData = parseM3U(data);
  const channelNames = parsedData.channels.map(channel => channel.name);
  return channelNames;
}



// Example usage:
const m3uData = `#EXTM3U
#EXTINF:-1 tvg-id="#.No.Channel.#" tvg-name="✺ FR ★ GENERALE FHD ✺" tvg-logo="http://lg.mygolden.xyz:8080/logo/EUROPE/FRANCE/flag_france.png" group-title="FR ❖ GENERALE",✺ FR ★ GENERALE FHD ✺ http://arigaty.com:80/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/2586
#EXTINF:-1 tvg-id="tf1.fr" tvg-name="FR ★ TF1 FHD ◉" tvg-logo="http://lg.mygolden.xyz:8080/logo/EUROPE/FRANCE/TF1.png" group-title="FR ❖ GENERALE",FR ★ TF1 FHD ◉ http://arigaty.com:80/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/2587
#EXTINF:-1 tvg-id="" tvg-name="FR ★ TF1 PLUS 1 FHD" tvg-logo="http://lg.mygolden.xyz:8080/logo/EUROPE/FRANCE/tf1-plus-1(1).png" group-title="FR ❖ GENERALE",FR ★ TF1 PLUS 1 FHD http://arigaty.com:80/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/75432
#EXTINF:-1 tvg-id="france2.fr" tvg-name="FR ★ FRANCE 2 FHD ◉" tvg-logo="http://lg.mygolden.xyz:8080/logo/EUROPE/FRANCE/FRANCE2FHD.png" group-title="FR ❖ GENERALE",FR ★ FRANCE 2 FHD ◉ http://arigaty.com:80/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/2588
#EXTINF:-1 tvg-id="france3.fr" tvg-name="FR ★ FRANCE 3 FHD ◉" tvg-logo="http://lg.mygolden.xyz:8080/logo/EUROPE/FRANCE/FRANCE3FHD.png" group-title="FR ❖ GENERALE",FR ★ FRANCE 3 FHD ◉ http://arigaty.com:80/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/2589
#EXTINF:-1 tvg-id="" tvg-name="FR ★ The Mad Womens Ball - 2021" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/o9xtEAlNb0wWql0EnT2SmaLZ1qa.jpg" group-title="✪ FR 4K MOVIES",FR ★ The Mad Womens Ball - 2021 http://arigaty.com:80/movie/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/391451.mkv
#EXTINF:-1 tvg-id="" tvg-name="FR ★ The Swarm - 2020" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/n3yVHGtvnGTPMdGLrcOhFxXPRD7.jpg" group-title="✪ FR 4K MOVIES",FR ★ The Swarm - 2020 http://arigaty.com:80/movie/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/391453.mkv
#EXTINF:-1 tvg-id="" tvg-name="FR ★ The Takedown - 2022" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/onjNaw9ef5JsA9674mPzqV7tGYf.jpg" group-title="✪ FR 4K MOVIES",FR ★ The Takedown - 2022 http://arigaty.com:80/movie/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/391455.mkv
#EXTINF:-1 tvg-id="" tvg-name="FR ★ The Visitor From The Future - 2022" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/rIAERhSuA0gIACMJ5ABgCwq2lEA.jpg" group-title="✪ FR 4K MOVIES",FR ★ The Visitor From The Future - 2022 http://arigaty.com:80/movie/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/391457.mkv
#EXTINF:-1 tvg-id="" tvg-name="FR ★ Noël à Candy Cane Lane - 2023 [4K]" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/8qfOQ7YPtvN2ATM50iUk58hZsNf.jpg" group-title="✪ FR 4K MOVIES",FR ★ Noël à Candy Cane Lane - 2023 [4K] http://arigaty.com:80/movie/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/467071.mkv
#EXTINF:-1 tvg-id="" tvg-name="FR ★ Un Lutin pour Noël - 2023 [4K]" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/oeO9xeBsWLDoM6GPJr3MgK4iuX0.jpg" group-title="✪ FR 4K MOVIES",FR ★ Un Lutin pour Noël - 2023 [4K] http://arigaty.com:80/movie/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/467073.mkv
#EXTINF:-1 tvg-id="" tvg-name="EN ★ Red Queen [Multi Sub] S01 E02" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/l2HGtMPCPxsVq3CmNLhuNwxjKT9.jpg" group-title="◉ EN PRIME VIDEO",EN ★ Red Queen [Multi Sub] S01 E02 http://arigaty.com:80/series/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/509091.mkv
#EXTINF:-1 tvg-id="" tvg-name="EN ★ Red Queen [Multi Sub] S01 E03" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/l2HGtMPCPxsVq3CmNLhuNwxjKT9.jpg" group-title="◉ EN PRIME VIDEO",EN ★ Red Queen [Multi Sub] S01 E03 http://arigaty.com:80/series/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/509093.mkv
#EXTINF:-1 tvg-id="" tvg-name="EN ★ Red Queen [Multi Sub] S01 E04" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/l2HGtMPCPxsVq3CmNLhuNwxjKT9.jpg" group-title="◉ EN PRIME VIDEO",EN ★ Red Queen [Multi Sub] S01 E04 http://arigaty.com:80/series/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/509095.mkv
#EXTINF:-1 tvg-id="" tvg-name="EN ★ Red Queen [Multi Sub] S01 E05" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/l2HGtMPCPxsVq3CmNLhuNwxjKT9.jpg" group-title="◉ EN PRIME VIDEO",EN ★ Red Queen [Multi Sub] S01 E05 http://arigaty.com:80/series/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/509097.mkv
#EXTINF:-1 tvg-id="" tvg-name="EN ★ Red Queen [Multi Sub] S01 E06" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/l2HGtMPCPxsVq3CmNLhuNwxjKT9.jpg" group-title="◉ EN PRIME VIDEO",EN ★ Red Queen [Multi Sub] S01 E06 http://arigaty.com:80/series/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/509099.mkv
#EXTINF:-1 tvg-id="" tvg-name="EN ★ Red Queen [Multi Sub] S01 E07" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/l2HGtMPCPxsVq3CmNLhuNwxjKT9.jpg" group-title="◉ EN PRIME VIDEO",EN ★ Red Queen [Multi Sub] S01 E07 http://arigaty.com:80/series/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/509101.mk
#EXTINF:-1 tvg-id="" tvg-name="EAR ★ La Brea S02 E08" tvg-logo="https://image.tmdb.org/t/p/w600_and_h900_bestv2/gzQeosDQC7TxVm3OQUVMx2ZbzF2.jpg" group-title="◉ AR اجنبي",EAR ★ La Brea S02 E08 http://arigaty.com:80/series/C34V73N18K27S1/EXGAJS7J3ZOPMA9D/508515.mkv`; // Votre chaîne M3U complète ici
const result = parseM3U(m3uData);
//console.log(result);
function getCategories(data) {
  const lines = data.split('\n');
  const channelCategories = new Set();
  const movieCategories = new Set();
  const serieCategories = new Set();

  for (const line of lines) {
    if (line.startsWith('#EXTINF:-1')) {
      const entry = parseEntry(line);

      if (entry.category) {
        if (line.includes("movie")) movieCategories.add(entry.category);
        else if (line.includes("serie")) serieCategories.add(entry.category);
        else channelCategories.add(entry.category);
      }
    }
  }

  return {
    channels: Array.from(channelCategories),
    movies: Array.from(movieCategories),
    series: Array.from(serieCategories),
  };
}

/*const uniqueCategories = getCategories(m3uData);
console.log('Unique Channel Categories:', uniqueCategories.channels);
console.log('Unique Movie Categories:', uniqueCategories.movies);
console.log('Unique Serie Categories:', uniqueCategories.series);*/
function getChannelsByCategory(data, category) {
  const lines = data.split('\n');
  const channels = [];

  for (const line of lines) {
    if (line.startsWith('#EXTINF:-1')) {
      const entry = parseEntry(line);

      if (entry.category && entry.category === category && entry.url) {
        channels.push({
          name: entry.name,
          logo: entry.logo,
          url: entry.url,
        });
      }
    }
  }

  return channels;
}

// Utilisation de la fonction pour récupérer toutes les chaînes d'une catégorie spécifique
function getTotalChannels(data) {
  const lines = data.split('\n');
  let totalChannels = 0;

  for (const line of lines) {
    if (line.startsWith('#EXTINF:-1') && !line.includes('/movie/') && !line.includes('/series/')) {
      const entry = parseEntry(line);

      if (entry.url) {
        totalChannels++;
      }
    }
  }

  return totalChannels;
}

// Utilisation de la fonction pour obtenir le nombre total de chaînes
const totalChannels = getTotalChannels(m3uData);
console.log('Total Channels:', totalChannels);

function getTotalMovies(data) {
  const lines = data.split('\n');
  let totalMovies = 0;

  for (const line of lines) {
    if (line.startsWith('#EXTINF:-1') && line.includes('/movie/')) {
      const entry = parseEntry(line);

      if (entry.url) {
        totalMovies++;
      }
    }
  }

  return totalMovies;
}

// Utilisation de la fonction pour obtenir le nombre total de films
const totalMovies = getTotalMovies(m3uData);
console.log('Total Movies:', totalMovies);
function getTotalSeries(data) {
  const lines = data.split('\n');
  let totalSeries = 0;

  for (const line of lines) {
    if (line.startsWith('#EXTINF:-1') && line.includes('/series/')) {
      const entry = parseEntry(line);

      if (entry.url) {
        totalSeries++;
      }
    }
  }

  return totalSeries;
}

// Utilisation de la fonction pour obtenir le nombre total de séries
const totalSeries = getTotalSeries(m3uData);
console.log('Total Series:', totalSeries);

function getTotalByCategory(data, targetCategory) {
  const lines = data.split('\n');
  let channelCount = 0;

  for (const line of lines) {
    if (line.startsWith('#EXTINF:-1')) {
      const entry = parseEntry(line);

      if (entry.category === targetCategory ) {
        channelCount++;
      }
    }
  }

  return channelCount;
}

// Utilisation de la fonction pour obtenir le nombre total de chaînes pour une catégorie donnée
const targetCategory = '◉ AR اجنبي'; // Remplacez par la catégorie souhaitée
const totalForCategory = getTotalByCategory(m3uData, targetCategory);
console.log(`Total Channels for Category "${targetCategory}":`, totalForCategory);

function getChannelByName(data, targetChannelName) {
  const lines = data.split('\n');

  for (const line of lines) {
    if (line.startsWith('#EXTINF:-1')) {
      const entry = parseEntry(line);

      if (entry.name.includes( targetChannelName) && ) {
        return {
          name: entry.name,
          logo: entry.logo,
          url: entry.url,
          category: entry.category,
        };
      }
    }
  }

  return null; // Retourne null si la chaîne n'est pas trouvée
}

// Utilisation de la fonction pour obtenir les informations d'une chaîne recherchée
const targetChannelName = 'TF1'; // Remplacez par le nom de la chaîne souhaitée
const channelInfo = getChannelByName(m3uData, targetChannelName);

if (channelInfo) {
  console.log(`Informations for Channel "${targetChannelName}":`, channelInfo);
} else {
  console.log(`Channel "${targetChannelName}" not found.`);
}





