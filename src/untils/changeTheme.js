export const changeThemes = (mode) => {
    console.log(mode)
    if (mode === 'green') {
        document.documentElement.style.setProperty('--text_color', 'green')
        document.documentElement.style.setProperty('--bg_color', 'yellow')
    } else if (mode === 'red') {
        document.documentElement.style.setProperty('--text_color', 'red')
        document.documentElement.style.setProperty('--bg_color', 'white')
    }
    localStorage.setItem('mode', mode)
}