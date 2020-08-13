const base_url = 'https://api.football-data.org/v2'
const api_token = '2063c65c66b142289c246f09ab6c779f'

const fetchingAPI = url => {
    return fetch(url, {
      headers: {
        'X-Auth-Token': api_token
      }
    })
    .then(res => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
  };


const getStandings = () => {    
    fetchingAPI(`${base_url}/competitions/2021/standings`)
    .then(data => {
      // console.log(data);
        let standingsHTML = ''
        data = data.standings[0].table

        data.forEach(dataTeam => {
            let urlTeamImage = dataTeam.team.crestUrl
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
            standingsHTML +=
            `
            <tr>
            <td>${dataTeam.position}</td>
            <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
            <td>${dataTeam.team.name}</td>
            <td>${dataTeam.playedGames}</td>
            <td>${dataTeam.won}</td>
            <td>${dataTeam.draw}</td>
            <td>${dataTeam.lost}</td>
            <td>${dataTeam.goalsFor}</td>
            <td>${dataTeam.goalsAgainst}</td>
            <td>${dataTeam.goalDifference}</td>
            <td>${dataTeam.points}</td>
            </tr>
            `
        })
        document.getElementById('progress').style.display = 'none'
        document.getElementById('standings').innerHTML = standingsHTML
    })
    .catch(err => console.log(err))
}

const getTeams = () => {
    fetchingAPI(`${base_url}/teams`)
    .then(data => {
      console.log(data);
        let teamsHTML = ''
        data.teams.forEach(team => {
          let urlTeamImage = (team.crestUrl!==null)?team.crestUrl.replace(/^http:\/\//i, 'https://'):"/img/logo.png";
            teamsHTML  +=
            `
            <div class="col s12">
            <div class="card">
            <div class="card-content row valign-wrapper">
            <div class="col s4" class="logo-team">
            <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="80%" >
            </div>
            <div class="col s8 information-team">
            <span class="badge-blue"><strong>${team.name}</strong></span>
            <span  class="badge-gray">${team.venue}</span>
            </div>
            </div>
            <div class="card-action center-align">
            <a href="${team.website}" target="_blank" class="website-action white-text btn blue accent-3">WEBSITE</a>
            <button onclick="addTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="waves-effect waves-light btn red accent-3"> (+) Favorit </button>
            </div>
            </div>
            </div>
            `
        })
        document.getElementById('progress').style.display = 'none'
        document.getElementById('teams').innerHTML = teamsHTML
    })
    .catch(err => console.log(err))
}

const getSaveTeams = () =>{
    dbgetTeam().then(data =>{
         let teamsHTML = ''
        data.forEach(team => {
          let urlTeamImage = (team.logo!==null)?team.logo.replace(/^http:\/\//i, 'https://'):"/img/logo.png";
            teamsHTML  +=
            `
            <div class="col s12">
            <div class="card">
            <div class="card-content row valign-wrapper">
            <div class="col s4" class="logo-team">
            <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="80%" >
            </div>
            <div class="col s8 information-team">
            <span class="badge-blue"><strong>${team.name}</strong></span>
            <span  class="badge-gray">${team.venue}</span>
            </div>
            </div>
            <div class="card-action center-align">
            <a href="${team.website}" target="_blank" class="website-action white-text btn blue accent-3">WEBSITE</a>
            <button onclick="deleteTeam(${team.id})" class="waves-effect waves-light btn red accent-3"> (-) Favorit </button>
            </div>
            </div>
            </div>
            `
        })
        document.getElementById('progress').style.display = 'none'
        document.getElementById('favorite').innerHTML = teamsHTML
    })
}