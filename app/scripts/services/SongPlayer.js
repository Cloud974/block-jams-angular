(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
          /**
          * @desc Obtains album info
          * @type {Object}
          */
          var currentAlbum = Fixtures.getAlbum();

          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
          /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
          var setSong = function(song) {
              if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
              }

              currentBuzzObject = new buzz.sound(song.audioUrl, {
                  formats: ['mp3'],
                  preload: true
              });

              SongPlayer.currentSong = song;
          };
          /**
           * @function playSong
           * @desc plays current buzz object and sets playing attr to true
           * @param {Object} song
           */
          var playSong = function(song) {
              currentBuzzObject.play();
              song.playing = true;
          };
          /**
          * @function stopSong
          * @desc stops current buzz object and sets playing attr to null
          * @param {Object} song
          */
          var stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = false;

          };
          /**
          *@function getSongIndex
          *@desc obtains index of song
          *@param {object} song
          */
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          }

          /**
          * @desc currently loaded audio file
          * @type {Object}
          */
          SongPlayer.currentSong = null;

          /**
          * @function play
          * @desc Play current or new song
          * @param {Object} song
          */
          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);
              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                    playSong(song);
                  }
              }

          };

          /**
          * @function pause
          * @desc Pause current song
          * @param {Object} song
          */
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              stopSong();
          };
          /**
          *@function previous
          *@desc Set currentSong to previous
          */
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex --;

              if (currentSongIndex < 0) {
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };
          /**
          *@function next
          *@desc Set currentSong to next
          */
          SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex ++;

              if (currentSongIndex > currentAlbum.songs.length) {
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
