var base_url = "https://api.football-data.org/";

function getapi(url){
    var data = fetch(url, {
        method: "GET",
        headers: {
            // 'Content-Type': 'application/json',
            'X-Auth-Token' : 'e2753c7a223245798e956eb6c8ba5bb2'
        },
    }).then(status).then(json).then(function(data) {
        return data;
    })

    return data
}

function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      // Method reject() akan membuat blok catch terpanggil
      return Promise.reject(new Error(response.statusText));
    } else {
      // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
      return Promise.resolve(response);
    }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

function getData() {
    if ('caches' in window) {
        caches.match(base_url + "v2/competitions/2021/standings").then(function(result) {
            if(result) {
                result.json().then(function(datas){
                    var data = datas.standings[0];
                    var dataTeam = "";
                    for(i = 0; i<20; i++){
                        dataTeam += `
                                    <tr onclick="detail(${data.table[i].team.id})">
                                        <td>${data.table[i].position}</td>
                                        <td>${data.table[i].team.name}</td>
                                        <td>${data.table[i].playedGames}</td>
                                        <td>${data.table[i].won}</td>
                                        <td>${data.table[i].draw}</td>
                                        <td>${data.table[i].lost}</td>
                                        <td>${data.table[i].points}</td>
                                    </tr>
                        `;
                    }
                    document.getElementById("kelasemen").innerHTML = dataTeam;
                })
            }
        });
    } 

    var result = getapi(base_url + "v2/competitions/2021/standings")
    // console.log(data)
    if(result) {
        result.then(function(datas){
            var data = datas.standings[0];
            var dataTeam = "";
            for(i = 0; i<20; i++){
                dataTeam += `
                            <tr onclick="detail(${data.table[i].team.id})">
                                <td>${data.table[i].position}</td>
                                <td>${data.table[i].team.name}</td>
                                <td>${data.table[i].playedGames}</td>
                                <td>${data.table[i].won}</td>
                                <td>${data.table[i].draw}</td>
                                <td>${data.table[i].lost}</td>
                                <td>${data.table[i].points}</td>
                            </tr>
                `;
            }
            document.getElementById("kelasemen").innerHTML = dataTeam;
        })
    }
}

function detail(id) {
    $('#body-content').load("pages/detail.html");
    if ('caches' in window) {
        caches.match(base_url + "v2/teams/"+id).then(function(result) {
            if(result) {
                result.json().then(function(data){
                    var squad = data.squad;
                    var coach = squad.find(({role}) => role == "COACH");
                    if(coach == undefined){
                        coach = "-";
                    } else {
                        coach = coach.name;
                    }
        
                    var url = data.crestUrl;
                    url = url.replace(/^http:\/\//i, 'https://');
        
                    $("#coach").text(coach);
                    $("#team").text(data.name);
                    $("#logo").attr("src",(url));
                    $("#venue").text(data.venue);
                    $("#jersey").text(data.clubColors);
                    $("#website").text(data.website);
                    $('#btn-jadwal').replaceWith('<button class="center-align waves-effect waves-light btn deep-purple darken-4" onclick="jadwal('+id+',`'+data.name+'`)" id="btn-jadwal'+id+'">Jadwal</button>')
                    var dataPlayer = "";
                    var jumlahsquad = Object.keys(squad).length - 1 ;
                    for(i = 0; i<jumlahsquad; i++){
                        dataPlayer += `
                                    <li class="collection-item avatar">
                                        <img src="${data.crestUrl}" alt="Logo" class="circle">
                                        <span id="nama-player${data.squad[i].id}" class="title">${data.squad[i].name}</span>
                                        <p id="kota${data.squad[i].id}">${data.squad[i].countryOfBirth}</p>
                                        <p id="negara${data.squad[i].id}">${data.squad[i].nationality}</p>
                                        <span href="#" id="posisi${data.squad[i].id}" class="secondary-content">${data.squad[i].position}</span>
                                    </li>
                        `;
                    }
                    document.getElementById("daftar-pemain").innerHTML = dataPlayer;
                })
            }
        });
    }
    var result = getapi(base_url + "v2/teams/"+id)
    // console.log(data)
    if(result) {
        result.then(function(data){
            var squad = data.squad;
            var coach = squad.find(({role}) => role == "COACH");
            if(coach == undefined){
                coach = "-";
            } else {
                coach = coach.name;
            }

            var url = data.crestUrl;
            url = url.replace(/^http:\/\//i, 'https://');

            $("#coach").text(coach);
            $("#team").text(data.name);
            $("#logo").attr("src",(url));
            $("#venue").text(data.venue);
            $("#jersey").text(data.clubColors);
            $("#website").text(data.website);
            $('#btn-jadwal').replaceWith('<button class="center-align waves-effect waves-light btn deep-purple darken-4" onclick="jadwal('+id+',`'+data.name+'`)" id="btn-jadwal'+id+'">Jadwal</button>')
            var dataPlayer = "";
            var jumlahsquad = Object.keys(squad).length - 1 ;
            for(i = 0; i<jumlahsquad; i++){
                dataPlayer += `
                            <li class="collection-item avatar">
                                <img src="${data.crestUrl}" alt="Logo" class="circle">
                                <span id="nama-player${data.squad[i].id}" class="title">${data.squad[i].name}</span>
                                <p id="kota${data.squad[i].id}">${data.squad[i].countryOfBirth}</p>
                                <p id="negara${data.squad[i].id}">${data.squad[i].nationality}</p>
                                <span href="#" id="posisi${data.squad[i].id}" class="secondary-content">${data.squad[i].position}</span>
                            </li>
                `;
            }
            document.getElementById("daftar-pemain").innerHTML = dataPlayer;
        })
    }
}

function jadwal(id,team_name) {
    $('#body-content').load("pages/jadwal.html");
    if ('caches' in window) {
        caches.match(base_url + "v2/teams/"+id+"/matches?status=SCHEDULED").then(function(result) {
            if(result) {
                result.json().then(function(datas){
                    var data = datas;
                    $('#team_name').append("Jadwal Pertandingan <br> "+team_name);
                    var jadwal = "";
                    for(i = 0; i<data.count; i++){
                        jadwal += `
                                    <li class="collection-item">
                                        <span id="matchday${data.matches[i].id}" class="title">Matchday ${data.matches[i].matchday}</span>
                                        <p id="match${data.matches[i].id}">${data.matches[i].homeTeam.name} Vs ${data.matches[i].awayTeam.name}</p>
                                        <p id="date${data.matches[i].id}">${new Date(data.matches[i].utcDate)}</p>
                                    </li>
                        `;
                    }
                    document.getElementById("jadwal-team").innerHTML = jadwal;
                })
            }
        });
    };
    var result = getapi(base_url + "v2/teams/"+id+"/matches?status=SCHEDULED")
    // console.log(data)
    if(result) {
        result.then(function(datas){
            var data = datas;
            $('#team_name').append("Jadwal Pertandingan <br> "+team_name);
            var jadwal = "";
            for(i = 0; i<data.count; i++){
                jadwal += `
                            <li class="collection-item">
                                <span id="matchday${data.matches[i].id}" class="title">Matchday ${data.matches[i].matchday}</span>
                                <p id="match${data.matches[i].id}">${data.matches[i].homeTeam.name} Vs ${data.matches[i].awayTeam.name}</p>
                                <p id="date${data.matches[i].id}">${new Date(data.matches[i].utcDate)}</p>
                            </li>
                `;
            }
            document.getElementById("jadwal-team").innerHTML = jadwal;
        })
    }
}

async function insert_timfav(id) {
    var db_tim = idb.open("db_bolaEPL", 1);
    var nama_tim = ""; 

    if ('caches' in window) {
        await caches.match(base_url + "v2/teams/"+id).then(function(result) {
            if(result) {
                result.json().then(function(datas){
                    return nama_tim = datas.name;
                })
            }
        });
    }

    var result = getapi(base_url + "v2/teams/"+id)
    // console.log(data)
    if(result) {
        await result.then(function(datas){
            nama_tim = datas.name;
        })
    }

    // console.log(nama_tim)
    db_tim.then(function(db) {
        var tx = db.transaction('tim_fav', 'readwrite');
        var store = tx.objectStore('tim_fav');
        var item = {
            id: id,
            name: nama_tim,
            created: new Date().getTime()
        };
        store.add(item);
        return tx.complete;
    }).then(function() {
        M.toast({html: 'Tim favorit berhasil disimpan.'})
        selection_user_on_timfav();
    }).catch(function() {
        M.toast({html: 'Tim favorit gagal disimpan.'})
    })
}
function selection_user_on_timfav() {
    var db_tim = idb.open("db_bolaEPL", 1);
    db_tim.then(function(db) {
        var tx = db.transaction('tim_fav', 'readonly');
        var store = tx.objectStore('tim_fav');
        return store.getAll();
    }).then(function(items) {
        if ('caches' in window) {
            caches.match(base_url + "v2/competitions/2021/standings").then(function(result) {
                if(result) {
                    result.json().then(function(datas){
                        var data = datas.standings[0];
                        var dataTeam = `<option value="" disabled selected>TEAM EPL</option>`;
                        for(i = 0; i<20; i++){
                            // console.log(data[0].table[i].team.name);
                            dataTeam += `
                                <option value="${data.table[i].team.id}">${data.table[i].team.name}</option>
                            `;
                        }
                        document.getElementById("select-team").innerHTML = dataTeam;

                    })
                }
            });
        } 

        var result = getapi(base_url + "v2/competitions/2021/standings")
        // console.log(data)
        if(result) {
            result.then(function(datas){
                var data = datas.standings[0];
                var dataTeam = `<option value="" disabled selected>TEAM EPL</option>`;
                for(i = 0; i<20; i++){
                    // console.log(data[0].table[i].team.name);
                    dataTeam += `
                        <option value="${data.table[i].team.id}">${data.table[i].team.name}</option>
                    `;
                }
                document.getElementById("select-team").innerHTML = dataTeam;
            })
        }
        
        var jumlah = Object.keys(items).length ;
        // console.log(items)
        // console.log(jumlah)
        if (jumlah == 0) {
            
            // console.log("cek")
            document.getElementById("daftar_tim_fav").innerHTML = '<li>Belum ada tim favorit</li>'
        } else {
            already_have(items);
        }
    });
}

function save_tim() {
    if($('#select-team').val() == null) {
        M.toast({html: 'Harap memilih tim terlebih dahulu'})
    } else {
        insert_timfav($('#select-team').val());
    }
}

function delete_timfav(id) {
    var db_tim = idb.open("db_bolaEPL", 1);

    db_tim.then(function(db) {
        var tx = db.transaction('tim_fav', 'readwrite');
        var store = tx.objectStore('tim_fav');
        // console.log(id)
        store.delete(""+id);
        return tx.complete;
      }).then(function() {
        M.toast({html: 'Tim favorit berhasil dihapus.'})
        selection_user_on_timfav();
        // console.log('Item deleted');
      });
}

function already_have(tim) {
    var jumlah = Object.keys(tim).length ;
    var dataTim = ""
    var id = ""
    var name = ""
    var url_img = ""
    console.log(jumlah)
    
    for(j = 0; j<jumlah; j++){
            
        if ('caches' in window) {
            caches.match(base_url + "v2/teams/"+tim[j].id).then(function(result) {
                // console.log(result)
                if(result) {
                    result.json().then(function(data){
                        // console.log(data)
                        id = data.id
                        name = data.name
                        url_img = data.crestUrl
                        url_img = url_img.replace(/^http:\/\//i, 'https://');
                        dataTim += `
                                    <li class="collection-item avatar">
                                        <img src="${url_img}" alt="Logo" class="circle">
                                        <span id="${id}" class="title">${name}</span>
                                        <button class="center-align waves-effect waves-light btn red darken-3 secondary-content" onclick="delete_timfav(${id})" id="btn-remove${id}">Remove</button>
                                    </li>
                        `;
                        console.log(dataTim)

                        document.getElementById("daftar_tim_fav").innerHTML = dataTim;
                    })
                } 
            });
        }

        // var result = getapi(base_url + "v2/teams/"+tim[j].id)
        // // console.log(data)
        // if(result) {
        //     result.then(function(data){
        //         id = data.id
        //         name = data.name
        //         url_img = data.crestUrl
        //         url_img = url_img.replace(/^http:\/\//i, 'https://');
        //         dataTim += `
        //                     <li class="collection-item avatar">
        //                         <img src="${url_img}" alt="Logo" class="circle">
        //                         <span id="${id}" class="title">${name}</span>
        //                         <button class="center-align waves-effect waves-light btn red darken-3 secondary-content" onclick="delete_timfav(${id})" id="btn-remove${id}">Remove</button>
        //                     </li>
        //         `;
        //         console.log(dataTim)

        //         document.getElementById("daftar_tim_fav").innerHTML = dataTim;
        //     })
        // }
        
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

$(document).ready(function() {
    getData();

    // create db and table
    idb.open("db_bolaEPL", 1, function(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains("tim_fav")) {
            upgradeDb.createObjectStore("tim_fav", {keyPath:"id"});
        }
    });

    Notification.requestPermission(status => {
        console.log('Notification permission status:', status);
    });

    if (('PushManager' in window)) {
        navigator.serviceWorker.getRegistration().then(function(registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BJaovh7rSY1I-Fl6pFJhz2ittRW8H1DP2_vVG84YU5BuRNBvWEusn71CZ84krEsPHBU4FarASTJFL91HzPYp5yM")
            }).then(function(subscribe) {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(function(e) {
                console.error('Tidak dapat melakukan subscribe ', e.message);
            });
        });
    }
});