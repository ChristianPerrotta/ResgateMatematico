const all_nav = ["pratica", "teoria", "provas"]

function open_nav(nav) {
    if (document.getElementById("nav_" + nav).style.display == "block") {
        close_nav(nav);
    } else {
        close_all_nav();
        document.getElementById("nav_" + nav).style.display = "block";
        document.getElementById("navbtn_" + nav).classList.add("selected-nav");
        document.getElementById("navbtn_" + nav + "_hid").classList.add("selected-nav");        
    }
}

function close_all_nav() {
    for (let n in all_nav) {
        close_nav(all_nav[n])
    }
}

function close_nav(nav) {
    document.getElementById("nav_" + nav).style.display = "none";
    document.getElementById("navbtn_" + nav).classList.remove("selected-nav");
    document.getElementById("navbtn_" + nav + "_hid").classList.remove("selected-nav");
}

function show_menu() {
    if (document.getElementById("hidden-menu").style.display == "flex") {
        document.getElementById("hidden-menu").style.display = "none"
        document.getElementById("navbtn_bars").classList.remove("selected-hidden")
        close_all_nav()
    } else {
        document.getElementById("hidden-menu").style.display = "flex"
        document.getElementById("navbtn_bars").classList.add("selected-hidden")
    }

}