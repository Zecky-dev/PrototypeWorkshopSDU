function getFirebaseAuthErrorMessage(errorCode) {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Geçersiz e-posta adresi.';
      case 'auth/user-disabled':
        return 'Kullanıcı hesabı devre dışı bırakıldı.';
      case 'auth/user-not-found':
        return 'Kullanıcı hesabı bulunamadı.';
      case 'auth/wrong-password':
        return 'Hatalı şifre.';
      case 'auth/email-already-in-use':
        return 'Bu e-posta adresi zaten kullanımda.';
      case 'auth/operation-not-allowed':
        return 'Bu işlem henüz etkin değil.';
      case 'auth/weak-password':
        return 'Zayıf şifre. Şifre en az 6 karakter uzunluğunda olmalıdır.';
      case 'auth/missing-verification-code':
        return 'Doğrulama kodu eksik.';
      case 'auth/invalid-verification-code':
        return 'Geçersiz doğrulama kodu.';
      case 'auth/code-expired':
        return 'Doğrulama kodu süresi doldu. Lütfen yeni bir kod isteyin.';
      case 'auth/popup-closed-by-user':
        return 'İşlem kullanıcı tarafından iptal edildi.';
      case 'auth/network-request-failed':
        return 'İnternet bağlantınızda bir sorun var. Lütfen bağlantınızı kontrol edin.';
      default:
        return 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
    }
}
function sortRooms(rooms) {
    rooms.sort(function(a, b) {
      var titleA = a.title.toUpperCase();
      var titleB = b.title.toUpperCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    return rooms;
}

export {getFirebaseAuthErrorMessage};
export {
    sortRooms
}