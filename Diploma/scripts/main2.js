'use strict';

// BLOCK AVATAR WITH REG START

// Объявляем всё,что нам нужно для работы
// с лайв-фото при регистрации
const app = document.querySelector('.app');
const imgGallery = document.querySelector('.list');
const fieldMessageError = document.querySelector('#error-message');
const btnCreatePhoto = document.querySelector('#take-photo');
const canvas = document.createElement('canvas');
const cameraAudioClick = document.createElement('audio');
cameraAudioClick.src = 'https://raw.githubusercontent.com/netology-code/hj-homeworks/master/media/photo-booth/audio/click.mp3';

let livePhotoIsAvailable = true;
let streamWithCamera;


function createAndOutputVideo(stream) {
    // Выводим видео-поток на экран
    const tagVideo = app.querySelector('video');
    const tagVideoProfile = document.querySelector('.videoProfile'); // также сразу выводим в профиле

    tagVideo.src = URL.createObjectURL(stream);
    tagVideoProfile.src = URL.createObjectURL(stream);

    streamWithCamera = stream;

    document.querySelector('.user-profile').classList.remove('camera-off');
}

function outputMessageError(fieldMessageError, error) {
    fieldMessageError.innerText = 'Камера недоступна,мы не можем ничего поделать';
    fieldMessageError.style.display = 'block';
    closeLivePhotoBoxs();
    livePhotoIsAvailable = false;

    document.querySelector('.user-profile').classList.add('camera-off');
    console.log(error)
}

function closeLivePhotoBoxs() {
    // скрываем радио-кнопки с выбором
    // лайв-фото
    // => лайв-фото выбрать невозможно
    document.querySelector('.livePhotoBoxRadioProfile').classList.add('hidden');
    document.querySelector('.livePhotoBoxRadioReg').classList.add('hidden');
}

btnCreatePhoto.addEventListener('click', createLivePhoto.bind(null, app, imgGallery));
imgGallery.addEventListener('click', actionImg);

function createLivePhoto(app, imgGallery) {
    // Создаем фото
    const video = app.querySelector('video');
    const ctx = canvas.getContext('2d');
    const [width, height] = [video.clientWidth, video.clientHeight];

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(video, 0, 0, width, height);
    createPhotoInGallery(canvas.toDataURL('image/jpeg', 1.0), imgGallery);
    cameraAudioClick.play();
}

function createPhotoInGallery(url, imgGallery) {
    // Добавляем фото в галлерею
    const template = document.querySelector('#templateImgGallery').cloneNode(true);
    const figure = template.content.querySelector('figure');
    const img = figure.querySelector('img');
    const aDownload = figure.querySelector('.file_down');

    img.src = url;
    aDownload.href = url;

    imgGallery.appendChild(figure);
}


// Объявляем всё,что нам нужно для работы
// с загрузкой аватарки при регистрации

const inpAvatarBox = document.querySelector('.inpAvatarBox');
const inpAvatar = document.querySelector('.inpAvatar');
const livePhotoBox = document.querySelector('.photo-box');
const spanPrev = document.querySelector('.span-prev');
const imgPrev = document.querySelector('.img-prev');

function getImgFileWithReader(e) {
    // Получаем картинку,отдаем её в done
    return new Promise((done) => {
        const fileImg = e.target.files[0];
        const reader  = new FileReader();

        reader.onloadend = function () {
            done(reader.result)
        };
        if (fileImg) reader.readAsDataURL(fileImg);
    })
}

inpAvatar.addEventListener('change', (e) => {
    // запоминаем выбор аватарки
    // потом при регистрации будем использовать ее
    getImgFileWithReader(e)
    .then((res) => {
        sessionStorage.AVATAR = res;
        previewAvatar();
    })
});
document.querySelectorAll('.form-check-input').forEach(el => el.addEventListener('change', changeStateVersionAvatar));


function changeStateVersionAvatar(e) {
    // В зависимости от выбора радио-кнопки
    // меняем тип выбора аватарки
    if (e.target.value === 'no-avatar') {
        sessionStorage.removeItem('AVATAR');
        inpAvatarBox.classList.add('hidden');
        livePhotoBox.classList.add('hidden');
        streamWithCamera.stop();
        previewAvatar(false);
    } else if (e.target.value === 'down-comp') {
        inpAvatarBox.classList.remove('hidden');
        livePhotoBox.classList.add('hidden');
        streamWithCamera.stop();
    } else if (e.target.value === 'live') {
        inpAvatarBox.classList.add('hidden');
        livePhotoBox.classList.remove('hidden');
        streamWithCamera.start();
    }
}


function actionImg(e) {
    // У фото в галлерее есть 3 кнопки
    // Нажатие на каждую мы тут и обрабатываем
    if (e.target.innerText === 'file_download') {
        e.target.parentNode.remove();
    }
    else if (e.target.innerText === 'check_box') {
        sessionStorage.AVATAR = e.target.parentNode.nextElementSibling.href;
        e.target.parentNode.remove();
        previewAvatar();
    }
    else if (e.target.innerText === 'delete') {
        e.target.parentNode.parentNode.parentNode.remove();
        Array.from(imgGallery).shift();
    }
}

function previewAvatar(open = true) {
    // показываем / скрываем превью
    if (open) {
        spanPrev.classList.remove('hidden');
        imgPrev.classList.remove('hidden');
        imgPrev.src = sessionStorage.AVATAR;
    } else {
        spanPrev.classList.add('hidden');
        imgPrev.classList.add('hidden');
    }
}

// BLOCK AVATAR WITH REG END



// BLOCK AUTH.JS START

// Кнопки,по которым будем переключать окна авторизации
const  btnSign = document.querySelector('.btn-open-sign');
const  btnReg = document.querySelector('.btn-open-reg');

btnSign.addEventListener('click', openWindowSign);
btnReg.addEventListener('click', openWindowReg);

// разметка окон
const frameAuthReg = document.querySelector('.authReg');
const frameAuthSign = document.querySelector('.authSign');
const containerAuth = document.querySelector('.content');

function openWindowReg() {
    // Закрываем одно окно,открываем другое
    containerAuth.classList.add('status-reg');
    containerAuth.classList.remove('status-sign');

    window.navigator.mediaDevices
    // Запрашиваем доступ к камере
    .getUserMedia({video:true, audio: false})
    .then(stream => createAndOutputVideo(stream))
    .catch(error => outputMessageError(fieldMessageError, error));

}

function openWindowSign() {
    document.querySelector('.default-choose').checked = true;
    frameAuthReg.querySelector('.photo-box').classList.add('hidden');

    containerAuth.classList.remove('status-reg');
    containerAuth.classList.add('status-sign');

}

const formReg = frameAuthReg.querySelector('.main-auth__form');
const formSign = frameAuthSign.querySelector('.main-auth__form');

formReg.addEventListener('submit', regAccount);
formSign.addEventListener('submit', signIn);

function regAccount(e) {
    e.preventDefault();
    const fieldLog = frameAuthReg.querySelector('.login');
    const fieldPass = frameAuthReg.querySelector('.password');
    if (fieldLog.value && fieldPass.value) {
        // Регистрируем аккаунт в firebase
        // Если всё норм,то открываем окно со входом
        // Создаем заметку с дефолтными настройками юзера
        firebase.auth().createUserWithEmailAndPassword(fieldLog.value, fieldPass.value)
        .then((response) => {
            openWindowSign();
            document.querySelector('.alert-after-reg').classList.remove('hidden'); // баннер успешной регистарции
            const avatar = sessionStorage.AVATAR !== undefined ? sessionStorage.AVATAR : 'https://www.appointbetterboards.co.nz/Custom/Appoint/img/avatar-large.png';
            const settings = {
                avatar
            };
            const uidUser = response.uid;
            firebase.database().ref(uidUser + '/' + 'settProfile').set(settings);

            formReg.reset();

        })
        .catch((error) => {
            frameAuthReg.querySelector('.alert-danger').classList.remove('hidden');
            frameAuthReg.querySelector('.alert-danger').innerText = error.message;
        })
    }
}

function signIn(e) {
    e.preventDefault();
    const fieldLog = frameAuthSign.querySelector('.login');
    const fieldPass = frameAuthSign.querySelector('.password');

    if (fieldLog.value && fieldPass.value) {
        firebase.auth().signInWithEmailAndPassword(fieldLog.value, fieldPass.value)
        .then((response) => {
            // при успешном входе сохраняем данные пользователя в сессию
            // трансформируем приложение
            sessionStorage.setItem('SIGN', true);
            sessionStorage.setItem('EMAIL', response.email);
            sessionStorage.setItem('UID', response.uid);
            setAppStatus('status-member');
            runApp();
            imgGallery.innerHTML = ''; // очищаем галлерею live-photo

            formSign.reset();
        })
        .catch((error) => {
            frameAuthSign.querySelector('.alert-danger').classList.remove('hidden');
            frameAuthSign.querySelector('.alert-danger').innerText = error.message;
        })
    }
}


// BLOCK AUTH.JS END

// BLOCK CONTROLLER APP START

const mainAppContainer = document.querySelector('.mainApp');

function setAppStatus(mode) {
    // Закрываем всё, что связано с авторизацией
    // "Открываем" само приложение

    if (mode === 'status-member') {
        mainAppContainer.classList.remove('status-guest');
        mainAppContainer.classList.add(mode);
    } else {
        mainAppContainer.classList.add(mode);
        mainAppContainer.classList.remove('status-member');
    }

}

// BLOCK CONTROLLER APP END


// BLOCK APP LOGICK

// Объявляем всё, что нужно для работы самого приложения
const formCreateCard = document.querySelector('.formCreateCard');
const fieldAnswerCard = document.querySelector('.answer-card');
const fieldQuestionCard = document.querySelector('.question-card');
const boxContentCard = document.querySelector('.content-cards');
const btnOutAcc = document.querySelector('.btn-out');


formCreateCard.addEventListener('submit', createNewCard);
boxContentCard.addEventListener('click', toggleAnswerCard);
btnOutAcc.addEventListener('click', outAcc);

function createNewCard(e) {
    e.preventDefault();

    let textAnswer = fieldAnswerCard.value;
    let textQuestion = fieldQuestionCard.value;

    saveCardWithServer(textQuestion, textAnswer);
    collectCard({Question: textQuestion, Answer: textAnswer});

    formCreateCard.reset();
}

function collectCard(cardData) {
    // создаем разметку карточки
    // через копирование template в html
    // изменяем,подставляя данные
    // добавляем карточку в разметку
    const template = document.querySelector('#templateCard').cloneNode(true);
    const wrap = template.content.querySelector('.card');
    const title = wrap.querySelector('.card-title');
    const answer = wrap.querySelector('.card-text');
    const btnToggle = wrap.querySelector('.btn-toggle');

    title.innerText = cardData.Question;
    answer.innerText = cardData.Answer;
    btnToggle.dataset.actionToggle = 'btn-toggle';

    answer.classList.add('hidden');
    boxContentCard.appendChild(wrap);
}


function saveCardWithServer() {
    // Сохраняем карточку на firebase
    const timeStamp = new Date().getTime();
    const card = {
        Question: fieldQuestionCard.value,
        Answer: fieldAnswerCard.value,
        timeStamp
    };
    const uidUser = sessionStorage.UID;

    firebase.database().ref(uidUser + '/Content/' + timeStamp).set(card)
}


function toggleAnswerCard(e) {
    // hidden / show элемента с ответом карточки
    // Проверчем,клик был на кнопке или же на тексте в ней,если так,то ищем тело карточки
    // и переключаем классы у нужных элементов
    if (e.target.dataset.actionToggle === 'btn-toggle') {
        let cardBody = e.target;
        let cycleProtect = 0;

        while (!cardBody.classList.contains('card-body') && cycleProtect <= 50) {
            cardBody = cardBody.parentElement;
            cycleProtect++;
        }

        const textCard = cardBody.querySelector('.card-text');
        const btn = cardBody.querySelector('.btn-toggle');

        textCard.classList.toggle('hidden');

        btn.innerText = textCard.classList.contains('hidden') ? btn.dataset.text1 : btn.dataset.text2;
    }
}


function outAcc() {
    // Выходим с аккаунта
    // обнуляем данные,приводим в первоначальный вид
    sessionStorage.clear();
    setAppStatus('status-guest');
    imgAvatar.src = 'https://www.appointbetterboards.co.nz/Custom/Appoint/img/avatar-large.png';
}


// BLOCK AVATAR PROFILE


// Объявляем всё,что связано
// с выбором аватарки уже у профиля
const app2 = document.querySelector('.app2');
const imgGallery2 = document.querySelector('.list2');
const btnCreatePhoto2 = document.querySelector('#take-photo2');
imgGallery2.innerHTML = ''; // очищаем галлерею от прошлых аккаунтов

const imgAvatar = document.querySelector('.avatarProfile');
const inpAvatarProfile = document.querySelector('.inpAvatarProfile');
const radioDownloadPhoto = document.querySelector('.radio-down-photo');
const radioLivePhoto = document.querySelector('.radio-live-photo');
const boxInputAvatarProfile = document.querySelector('.box-inp-avatar-profile');
const boxLivePhoto2 = document.querySelector('.photo-box2');
const btnSwitchAvatar = document.querySelector('.toggleVersionAvatar');

inpAvatarProfile.addEventListener('change', setAvatar);
btnSwitchAvatar.addEventListener('click', toggleVersionAvatar);
radioDownloadPhoto.addEventListener('change', switchVersionChoosAvatar);
radioLivePhoto.addEventListener('change', switchVersionChoosAvatar);

imgGallery2.addEventListener('click', actionImgProfile);
btnCreatePhoto2.addEventListener('click', createLivePhoto.bind(null, app2, imgGallery2));


function setAvatar(e) {
    // при смене аватара
    // обновляем бд
    getImgFileWithReader(e)
    .then((res) => {
        imgAvatar.src = res;
        firebase.database().ref().child('/' + sessionStorage.UID + '/settProfile')
        .update({ avatar: res});
    })
}

let firstCallSwitсhAvatar = true;

function toggleVersionAvatar() {
    // используем флаг,чтобы
    // не вызывать функцию каждый раз
    if (firstCallSwitсhAvatar) {
        window.navigator.mediaDevices
        .getUserMedia({video:true, audio: false})
        .then(stream => createAndOutputVideo(stream))
        .catch(error => outputMessageError(fieldMessageError, error));
    }

    firstCallSwitсhAvatar = false;

    document.querySelector('.downPhotoBoxProfile').classList.toggle('hidden');
    if (livePhotoIsAvailable) document.querySelector('.livePhotoBoxRadioProfile').classList.toggle('hidden');
    if (document.querySelector('.livePhotoBoxRadioProfile').contains('hidden')) {
        streamWithCamera.start();
    } else {
        streamWithCamera.stop();
    }
}


function switchVersionChoosAvatar(e) {
    if (e.target.value === 'down-comp') {
        boxInputAvatarProfile.classList.remove('hidden');
        boxLivePhoto2.classList.add('hidden');
    } else if (e.target.value === 'live') {
        imgGallery.innerHTML = '';
        boxInputAvatarProfile.classList.add('hidden');
        boxLivePhoto2.classList.remove('hidden');
    }
}


function actionImgProfile(e) {
    // У фото в галлерее есть 3 кнопки
    // Нажатие на каждую мы тут и обрабатываем
    if (e.target.innerText === 'file_download') {
        e.target.parentNode.remove();
    }
    else if (e.target.innerText === 'check_box') {
        imgAvatar.src = e.target.parentNode.nextElementSibling.href;
        firebase.database().ref().child('/' + sessionStorage.UID + '/settProfile')
        .update({ avatar: imgAvatar.src});

        e.target.parentNode.remove();
    }
    else if (e.target.innerText === 'delete') {
        e.target.parentNode.parentNode.parentNode. remove();
        Array.from(imgGallery).shift();
    }
}


function runApp() {
    // делаем первоначальный вид
    radioDownloadPhoto.checked = true;
    document.querySelector('.user-profile').classList.add('camera-off');
    document.querySelector('.downPhotoBoxProfile').classList.add('hidden');
    document.querySelector('.livePhotoBoxRadioProfile').classList.add('hidden');
    boxInputAvatarProfile.classList.remove('hidden');


    // Функция, которая инициализирует наше приложение
    function initState() {
        // Проверяем,вошел ли пользователь
        // Если да,то получаем все карточки данного пользователя
        // При этом заранее очистим контейнер с карточками

        boxContentCard.innerHTML = '';
        if (sessionStorage.SIGN !== undefined) {
            getContentCards();
            showDataProfile();
        }

        function showDataProfile() {
            showName();
            showAvatar();

        }

        function showName() {
            document.querySelector('.nickname').innerText = sessionStorage.EMAIL;
        }

        function showAvatar() {
            firebase.database().ref('/' + sessionStorage.UID + '/settProfile').once('value').then((snapshot) => {
                getSett(snapshot.val());

                function getSett(sett) {
                    document.querySelector('.avatarProfile').src = sett.avatar;
                }
            });
        }

    }

    initState();

    function getContentCards() {
        // Запрашиваем все карточки

        let listNotes = [];
        const UID = sessionStorage.UID;
        firebase.database().ref('/' + UID + '/Content/').once('value').then((snapshot) => {
            getCard(snapshot.val())
        });

        function getCard(card) {
            // Обрабатываем карточку,затем каждую вставляем в контейнер
            for (let key in card) listNotes.push({
                Question: card[key].Question,
                Answer: card[key].Answer,
            })

            listNotes.forEach((card) => {
                collectCard(card);
            })
        }
    }

}



(function () {
    // сохраняем состояние приложение
    // даже при обновлении вкладки браузера
    if (sessionStorage.SIGN !== undefined) {
        setAppStatus('status-member');
        runApp();
        // запрашиваем еще раз доступ к камере
        // это поможет избежать бага
        window.navigator.mediaDevices
        .getUserMedia({video:true, audio: false})
        .then(stream => createAndOutputVideo(stream))
        .catch(error => outputMessageError(fieldMessageError, error));
    }
})();