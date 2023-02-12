export default {
    imageContainer: {
        visibility: ['hidden', 'visible', 'visible'],
    },
    mainContainer: {
        dimentions: ['100%', '100%', '45%'],
        padding: ['1rem', '2rem', '5rem'],
        textAlign: ['center', 'center', 'left'],
    },
    appHeaderContainer: {
        mainHeading: ['2xl', '2xl', '2xl'],
        secondaryTextDimentions: ["80%", "100%", "100%"],
        secondaryHeading: ['2xl', '2xl', '2xl'],
        secondaryText: ['lg', '2xl', '2xl'],
        fontWeight: ['medium', 'black', 'black']
    },
    buttonContainer: {
        dimentions: ['80%', '100%', '100%'],
        buttons: {
            width: ['80%', '80%', '80%'],
            borderRadius: ['10px', '10px', '10px'],
            padding: ['1rem', '1rem', '1rem'],
            fontWeight: ['semibold', 'semibold', 'semibold'],
            cursor: "pointer"
        }
    },
    form: {
        wrapper: {
        dimentions: ['80%', '50vh', '55vh'],
        height: ['50%', '60vh', '70vh']
        }
    },
    usersOnly: {
        container: {
            dimentions: ['80%', '50%', '50%'],
            flexDirection: ['column', 'row', 'row'],
        }, 
        authInfo: {
            borders: ["0px, 0px, 0px, 0px","0 15px 15px 0", "0 15px 15px 0"],
            dimentions: ['100%', '50%', '50%']
        }
    }
} as any