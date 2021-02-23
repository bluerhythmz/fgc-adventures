const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-btns')

//keeps track of character items and influences the route
let state = {}

//starts game
const startGame = () => {
    state = {}
    showTextNode(1)
}

//displays part of story/options
const showTextNode = (textNodeIndex) => {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

const showOption = (option) => {
    return option.requiredState == null || option.requiredState(state)
}

//called when selecting an option which takes the selected option as parameter
const selectOption = (option) => {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'One day you wake up with your fight stick on your lap. How should you proceed?',
        options: [
            {
                text: 'Hop on some Marvel 2',
                nextText: 2.1
            },
            {
                text: 'Turn on SFV',
                setState: { trash: true },
                nextText: 2.2
            },
            {
                text: 'Hop on discord to run some KOF 13',
                setState: { alone: true},
                nextText: 2.3
            },
            {
                text: 'Fighting games suck. Time to speedrun Nioh 2',
                setState: { hero: true },
                nextText: 6.2
            }
        ]
    },
    {
        id: 2.1,
        text: 'This game is heat. But do I wanna lab or fight niggas?',
        options: [
            {
                text: 'I need to work on this new schmix',
                setState: { labMonster: true },
                nextText: 3.1
            },
            {
                text: 'Time to hit up the Marvel 2 community for matches',
                setState: { worldWarrior: true },
                nextText: 4.1
            },
            {
                text: 'Fighting games suck. Time to speedrun Nioh 2',
                setState: { hero: true },
                nextText: 6.2
            }
        ]
    },
    {
        id: 2.2,
        text: 'Are you sure about this?',
        options: [
            {
                text: 'Umm....y-yeah',
                requiredState: (currentState) => currentState.trash,
                setState: { trash: false, megaTrash: true },
                nextText: 3.2
            },
            {
                text: 'On second thought...nah that shits ass. Will play a different fighter',
                requiredState: (currentState) => currentState.trash,
                setState: { trash: false },
                nextText: 1
            }
        ]
    },
    {
        id: 2.3,
        text: 'You requested games an hour ago...keep waiting?',
        options: [
            {
                text: 'Hm. Guess ppl at work or school. Keep waiting...',
                requiredState: (currentState) => currentState.alone,
                setState: { alone: true },
                nextText: 2.3
            },
            {
                text: 'On second thought...fuck discord fighters. Play a game with an actual playerbase',
                requiredState: (currentState) => currentState.alone,
                setState: { alone: false },
                nextText: 1
            }
        ]
    },
    {
        id: 3.1,
        text: 'Aight you been in the lab for 5 hours. Now what?',
        options: [
            {
                text: 'Time to hit up the actually active marvel 2 discord for games',
                requiredState: (currentState) => currentState.labMonster,
                setState: { labMonster: false,  worldWarrior: true },
                nextText: 4.1
            },
            {
                text: 'hmm...not enough labbing...I should actually work on neutral now',
                requiredState: (currentState) => currentState.labMonster,
                setState: { labmonster: true },
                nextText: 4.12
            },
            {
                text: 'Fuck it...TIME TO CHALLENGE IFC YIPES',
                requiredState: (currentState) => currentState.labMonster,
                setState: { labMonster: false,  dumbNigga: true },
                nextText: 4.13
            },
            {
                text: 'Fighting games suck. Time to speedrun Nioh 2',
                setState: { hero: true },
                nextText: 6.2
            }
        ]
    },
    {
        id: 3.2,
        text: 'Are you REALLY sure about this?',
        options: [
            {
                text: 'Umm....I mean like...some parts of the game are fun...',
                requiredState: (currentState) => currentState.megaTrash,
                setState: { trash: false, megaTrash: true },
                nextText: 4.2
            },
            {
                text: 'Nah I know for a fact ima get bored or salty af. Fuck this.',
                requiredState: (currentState) => currentState.megaTrash,
                setState: { trash: false },
                nextText: 1
            }
        ]
    },
    {
        id: 4.1,
        text: 'Just about everyone in the discord are 20 year veterans...Do you fight them anyway?',
        options: [
            {
                text: 'Fuck it the only way to get better is to get washed',
                requiredState: (currentState) => currentState.worldWarrior,
                setState: { worldWarrior: false, realNigga: true },
                nextText: 5.1
            },
            {
                text: 'Fuck it...TIME TO CHALLENGE IFC YIPES',
                requiredState: (currentState) => currentState.worldWarrior,
                setState: { worldWarrior: false,  dumbNigga: true },
                nextText: 4.13
            },
            {
                text: 'Fighting games suck. Time to speedrun Nioh 2',
                setState: { hero: true },
                nextText: 6.2
            }
        ]
    },
    {
        id: 4.12,
        text: 'You ACTUALLY practiced neutral for once...And for another 5 hours of labbing! Now what?',
        options: [
            {
                text: 'Time to hit up the actually active marvel 2 discord for games',
                requiredState: (currentState) => currentState.labMonster,
                setState: { labMonster: false,  worldWarrior: true },
                nextText: 4.1
            },
            {
                text: 'Fuck it...TIME TO CHALLENGE IFC YIPES',
                requiredState: (currentState) => currentState.labMonster,
                setState: { labMonster: false,  dumbNigga: true },
                nextText: 4.13
            },
            {
                text: 'Fighting games suck. Time to speedrun Nioh 2',
                setState: { hero: true },
                nextText: 6.2
            }
        ]
    },
    {
        id: 4.13,
        text: 'GAME OVER. IFC Yipes sent your soul to shadow realm. ',
        options: [
            {
                text: 'nigga...play somethin else forreal...',
                requiredState: (currentState) => currentState.dumbNigga,
                nextText: -1
            },
        ]
    },
    {
        id: 4.2,
        text: 'This is your final warning...',
        options: [
            {
                text: 'I...I really like Ed...and...Juri feet...and Menat is best girl...',
                requiredState: (currentState) => currentState.megaTrash,
                setState: { megaTrash: false, megaTrash: true },
                nextText: 5.2
            },
            {
                text: 'This game literally gave me high blood pressure and 5 broken fight sticks. Nah son fuck that',
                requiredState: (currentState) => currentState.megaTrash,
                setState: { megaTrash: false },
                nextText: 6.2
            }
        ]
    },
    {
        id: 5.1,
        text: 'You got your ass beat. Really fucking bad...BUT you found out they some cool niggas and you made a couple buddies. How should you continue your night?',
        options: [
            {
                text: 'Fuck it...TIME TO CHALLENGE IFC YIPES',
                requiredState: (currentState) => currentState.realNigga,
                setState: { labMonster: false,  dumbNigga: true },
                nextText: 4.13
            },
            {
                text: 'I mean...do you even have to ask?',
                requiredState: (currentState) => currentState.realNigga,
                setState: { labMonster: false,  dumbNigga: true },
                nextText: 7
            },
            {
                text: 'Fighting games suck. Time to speedrun Nioh 2',
                setState: { hero: true },
                nextText: 6.2
            }
        ]
    },
    {
        id: 5.2,
        text: 'GAME OVER. Get that shit the fuck outta here nigga you better than that.',
        options: [
            {
                text: 'maaaan gtfo my game cuz',
                nextText: -1
            }
        ]
    },
    {
        id: 6.2,
        text: 'CONGRATULATIONS! You have proven you can resist temptation and live a healthy life!',
        options: [
            {
                text: 'Run this shit back',
                nextText: -1
            }
        ]
    },
    {
        id: 7,
        text: 'CONGRATULATIONS! You grab some Neutrogena, Kleenex, and hit up hanime.tv...it was a pleasant end to a pleasant day...',
        options: [
            {
                text: 'Ahhh...cant wait to start the next day...',
                nextText: -1 
            }
        ]
    },
    
]

startGame()