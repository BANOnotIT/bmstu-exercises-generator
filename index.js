function getMapping() {
    return fetch('./exercises.md', {mode: 'no-cors'})
        .then(res => res.text())
        .then(text => {
            const lines = text.split('\n')

            let currentHeader = null

            let resultMap = {}
            for (let line of lines) {
                line = line.trim()
                if (line.startsWith('#')) {
                    // убираем # из заголовка
                    currentHeader = line.slice(1)
                    resultMap[currentHeader] = []
                } else if (line) {
                    resultMap[currentHeader].push(line)
                }
            }

            return resultMap
        })
}

function choseRandomElement(array) {
    const randomIdx = Math.floor(Math.random() * array.length);
    return array[randomIdx]
}

function fillRandomExercises() {

    getMapping()
        .then((map) => {
            const fields = Array.from(document.querySelectorAll('.js-exercise-container'))

            for (const fieldElement of fields) {
                const exerciseType = fieldElement.dataset.exerciseType
                if (map.hasOwnProperty(exerciseType)) {
                    fieldElement.innerText = choseRandomElement(map[exerciseType])
                }
            }
        })
}

document.addEventListener('DOMContentLoaded', fillRandomExercises)
document.getElementById('js-renew-btn').onclick = fillRandomExercises