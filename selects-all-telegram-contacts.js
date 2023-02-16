// @name         Selector of all Telegram contacts
// @description  Script to select all Telegram contacts automatically and quickly.
// @homepage     https://github.com/NabiKAZ/selects-all-telegram-contacts
// @version      0.1.0
// @author       Nabi KAZ <nabikaz@gmail.com> <www.nabi.ir>
// @license:     MIT License

(async() => {

    // Sets the variables
    var sleep_user_select = 50;
    var sleep_pagination = 800;

    var i = 0;
    while (true) {

        // Checks users in the loop
        var elements = document.querySelectorAll('.Picker .ListItem-button');
        var users = [];
        for (index in elements) {
            var el = elements[index];
            if (el.nodeType === Node.ELEMENT_NODE) {
                var fullName = el.querySelector('.fullName').innerText;
                users.push(fullName);
                if (el.querySelector('input[type=checkbox]').checked == false) {
                    el.dispatchEvent(new MouseEvent('mousedown', {
                            bubbles: true,
                            cancelable: true,
                            bubbles: true
                        }));
                    await sleep(sleep_user_select);
                    var selected = document.querySelectorAll('.Picker .picker-header .PickerSelectedItem ').length;
                    console.log('Selected (' + selected + ') #' + (Number(index) + 1) + ' > ' + fullName);
                }
            }
        };

        // Checks if it is the end of the list
        if (typeof oldUsers !== 'undefined' && JSON.stringify(oldUsers) === JSON.stringify(users)) {
            break;
        }
        var oldUsers = users;

        // The list scrolls down
        console.log('Scroll #' + ++i);
        var list = document.querySelector('.Picker .picker-list');
        list.scroll({
            top: list.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });

        // The header scrolls down the list
        var header = document.querySelector('.Picker .picker-header');
        header.scroll({
            top: header.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });

        // A little late
        await sleep(sleep_pagination);
    }

    // Done!
    console.log('Done.');

    // Sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})();