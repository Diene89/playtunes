### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'publisher.sh' fornecido
## pela Trybe.

[[ $# == 1 ]] && \ 
[[ $1 == "trybe-security-parameter" ]] && \ 
git filter-repo \
  --path .trybe \
  --path .github \
  --path trybe.yml \
  --path trybe-filter-repo.sh \
  --path only-image.png \
  --path skip-image.png \
  --path images \
  --path src/tests/01.BrowserRouter.test.js \
  --path src/tests/02.LoginPage.test.js \
  --path src/tests/03.HeaderComponent.test.js \
  --path src/tests/04.NavigationLinks.test.js \
  --path src/tests/05.SearchPage.test.js \
  --path src/tests/06.SearchFetch.test.js \
  --path src/tests/07.AlbumPage.test.js \
  --path src/tests/08.AddFavoritesSongs.test.js \
  --path src/tests/09.GetFavoriteSongs.test.js \
  --path src/tests/10.UpdateFavoriteSongsList.test.js \
  --path src/tests/11.RemoveFavoritesSongs.test.js \
  --path src/tests/12.FavoriteSongsPage.test.js \
  --path src/tests/13.ProfilePage.test.js \
  --path src/tests/14.EditProfilePage.test.js \
  --path src/tests/helpers \
  --path src/tests/mocks \
  --path README.md \
  --invert-paths --force
