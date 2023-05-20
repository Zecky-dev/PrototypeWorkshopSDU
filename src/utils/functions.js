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

export {
    sortRooms
}