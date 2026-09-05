import { useEffect, useState } from 'react'
import captchaQuestions from '../data/captchaQuestions'
import MemeExplosion from './MemeExplosion'

function normalizeAnswer(answer) {
  return answer
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function getRandomQuestions() {
  const shuffled = [...captchaQuestions].sort(
    () => Math.random() - 0.5,
  )

  const subjects = []

  for (const question of shuffled) {
    if (!subjects.includes(question.subject)) {
      subjects.push(question.subject)
    }

    if (subjects.length === 3) {
      break
    }
  }

  return subjects.map((subject) => {
    const subjectQuestions = shuffled.filter(
      (question) => question.subject === subject,
    )

    return subjectQuestions[0]
  })
}

/*
 * UselessMart™ Emotional Support Department
 *
 * Every answer is handled with maximum positivity
 * and minimum concern for academic correctness.
 */

const wrongMessages = [
  '🎉 INCREDIBLE. You were given a question and somehow chose the one answer that makes the least sense.',
  '🧠 YOUR BRAIN HAS OFFICIALLY LEFT THE CHAT. We checked. It is not coming back.',
  '💀 THAT WASN’T AN ANSWER. That was a cry for help disguised as mathematics.',
  '📉 CONGRATULATIONS! Your intellectual stock has reached an all-time low.',
  '😭 WE WAITED. WE HOPED. WE BELIEVED. Then you submitted THAT.',
  '🪦 MOMENT OF SILENCE. Another perfectly good brain cell has been lost today.',
  '🤡 YOU HAD ONE JOB. Somehow, you found a completely new way to fail it.',
  '🧠 NEURAL ACTIVITY DETECTED. Unfortunately, it appears to be mostly static.',
  '💔 WE ARE DEEPLY DISAPPOINTED. Not angry. Just... profoundly disappointed.',
  '🚨 BRAIN CAPACITY WARNING: Your remaining 3 neurons are currently arguing over the answer.',
  '📉 EVEN YOUR WRONG ANSWER IS CONFUSED ABOUT HOW WRONG IT IS.',
  '💀 THAT ANSWER WAS SO BAD, THE QUESTION IS CONSIDERING RETIRING.',
  '🧪 SCIENTISTS HAVE REVIEWED YOUR ANSWER. They have requested that you stop.',
  '🎓 SOMEWHERE, A TEACHER JUST FELT A DISTURBANCE IN THE FORCE.',
  '🫥 YOUR EXISTENCE HAS CONTRIBUTED NOTHING TO THE CORRECT ANSWER.',
  '🥀 ANOTHER QUESTION. ANOTHER TRAGEDY. At this point, accuracy is clearly not your thing.',
  '📡 WE SCANNED YOUR BRAIN FOR THE CORRECT ANSWER. SIGNAL LOST.',
  '💀 YOUR LAST BRAIN CELL JUST CLOCKED OUT. Honestly, fair.',
  '🤦 THAT WASN’T EVEN CLOSE. You didn’t miss the target — you missed the entire concept of targets.',
  '🧠 YOUR BRAIN GENERATED AN ANSWER. We use the term "generated" extremely loosely.',
  '📜 FUTURE HISTORIANS WILL STUDY THIS ANSWER AS A WARNING.',
  '🚮 WE HAVE MOVED YOUR ANSWER TO THE RECYCLING BIN. Even it deserves another chance.',
  '🥲 YOU TRIED. That is genuinely the nicest thing we can say about this situation.',
  '⚰️ THE CORRECT ANSWER WAS RIGHT THERE. You walked past it with confidence.',
  '💔 WE BELIEVED IN YOU. That was our first mistake.',
  '🐒 A CHIMPANZEE WAS GIVEN THE SAME QUESTION. We owe the chimpanzee an apology.',
  '🔥 ABSOLUTELY DEVASTATING. Your answer has achieved a level of wrongness previously thought impossible.',
  '🧠 PLEASE CHECK YOUR BRAIN CONNECTION. It appears to be running on dial-up.',
  '💀 YOU HAVE SUCCESSFULLY PROVEN THAT CONFIDENCE AND COMPETENCE ARE NOT THE SAME THING.',
  '🏆 CONGRATULATIONS! You have unlocked: **THE WORST POSSIBLE ANSWER.**',
]

function AcademicCaptcha({ onSuccess, onFailure }) {
  const [questions, setQuestions] = useState(() =>
    getRandomQuestions(),
  )

  const [answers, setAnswers] = useState(() =>
    new Array(3).fill(''),
  )

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(90)
  const [attempt, setAttempt] = useState(1)

  const [status, setStatus] = useState('active')
  const [error, setError] = useState('')

  // Forces MemeExplosion to remount every time a wrong answer is submitted.
  const [explosionKey, setExplosionKey] = useState(0)

  // Secret bypass phrase.
  const [secretPhrase, setSecretPhrase] = useState('')

  /*
   * CAPTCHA TIMER
   */

  useEffect(() => {
    if (status !== 'active') {
      return undefined
    }

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timer)
          setStatus('failed')

          onFailure?.()

          return 0
        }

        return time - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [status, onFailure])

  if (!questions.length) {
    return null
  }

  const question = questions[currentQuestion]

  /*
   * NORMAL CAPTCHA ANSWER
   */

  const handleAnswerChange = (event) => {
    const updatedAnswers = [...answers]

    updatedAnswers[currentQuestion] =
      event.target.value

    setAnswers(updatedAnswers)
    setError('')
  }

  const handleSubmit = () => {
    const userAnswer = normalizeAnswer(
      answers[currentQuestion],
    )

    const correctAnswer = normalizeAnswer(
      question.answer,
    )

    /*
     * WRONG ANSWER
     */

    if (userAnswer !== correctAnswer) {
      const message =
        wrongMessages[
          Math.floor(
            Math.random() * wrongMessages.length,
          )
        ]

      setError(message)

      setExplosionKey((prev) => prev + 1)

      if (attempt >= 3) {
        setStatus('failed')
        onFailure?.()
      } else {
        setAttempt((value) => value + 1)
      }

      return
    }

    /*
     * CORRECT ANSWER
     */

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (value) => value + 1,
      )

      setError('')
      setAttempt(1)

      return
    }

    setStatus('success')
  }

  /*
   * SECRET BYPASS
   *
   * Typing "I am Useless" immediately
   * bypasses the academic assessment.
   */

  const handleSecretPhraseChange = (event) => {
    const value = event.target.value

    setSecretPhrase(value)

    if (
      normalizeAnswer(value) ===
      'i am useless'
    ) {
      setError('')
      onSuccess?.()
    }
  }

  /*
   * RESTART CAPTCHA
   */

  const restart = () => {
    const selected = getRandomQuestions()

    setQuestions(selected)
    setAnswers(
      new Array(selected.length).fill(''),
    )

    setCurrentQuestion(0)
    setTimeLeft(90)
    setAttempt(1)
    setStatus('active')
    setError('')
    setSecretPhrase('')
    setExplosionKey(0)
  }

  /*
   * SUCCESS
   */

  if (status === 'success') {
    return (
      <div className="captcha-box captcha-success">

        <div className="captcha-icon">
          ✓
        </div>

        <div className="captcha-label">
          EVOLUTIONARY ASSESSMENT COMPLETE
        </div>

        <h2>
          YOU DID IT! 🎉
        </h2>

        <p>
          Congratulations, Homo sapiens!
        </p>

        <p>
          You have successfully demonstrated
          enough cognitive activity to purchase
          completely unnecessary merchandise.
        </p>

        <p>
          We are incredibly proud of you.
        </p>

        <p>
          Seriously. We weren't sure this
          would happen.
        </p>

        <p className="captcha-small-text">
          Your ancestors would be moderately
          proud. Probably.
        </p>

        <button onClick={onSuccess}>
          BE PROUD AND BUY YOUR PRICE
        </button>

      </div>
    )
  }

  /*
   * FAILURE
   */

  if (status === 'failed') {
    return (
      <>
        {explosionKey > 0 && (
          <MemeExplosion
            key={explosionKey}
            onDone={() =>
              setExplosionKey(0)
            }
          />
        )}

        <div className="captcha-box captcha-failed">

          <div className="captcha-icon">
            🎉
          </div>

          <div className="captcha-label">
            EVOLUTIONARY ASSESSMENT COMPLETE
          </div>

          <h2>
            GREAT NEWS! 🌟
          </h2>

          <p>
            YOU TRIED! 🎊
          </p>

          <p>
            And honestly, that is what really
            matters.
          </p>

          <p>
            Unfortunately, your answers suggest
            that your evolutionary journey may
            require additional time.
          </p>

          <p>
            Please don't be discouraged.
            The Quantum Rock™ believes in you.
          </p>

          <p>
            Unfortunately, the Quantum Rock™ is
            also inanimate, so its opinion may not
            be legally meaningful.
          </p>

          <p className="captcha-small-text">
            Classification: temporarily ape.
            Potential for greatness: under
            investigation.
          </p>

          <button onClick={restart}>
            TRY AGAIN! 🌟
          </button>

        </div>
      </>
    )
  }

  /*
   * ACTIVE CAPTCHA
   */

  return (
    <>
      {explosionKey > 0 && (
        <MemeExplosion
          key={explosionKey}
          onDone={() =>
            setExplosionKey(0)
          }
        />
      )}

      <div className="captcha-box">

        {/* CAPTCHA HEADER */}

        <div className="captcha-header">

          <div>

            <span className="captcha-label">
              ✨ MANDATORY EVOLUTIONARY
              SCREENING ✨
            </span>

            <h2>
              Are You Worthy?™
            </h2>

            <p className="captcha-subtitle">
              We're so excited to see how far
              you've evolved!
            </p>

          </div>

          <div className="captcha-timer">
            {timeLeft}s
          </div>

        </div>

        {/* CAPTCHA META */}

        <div className="captcha-meta">

          <span>
            🌱 evolutionary checkpoint{" "}
            {currentQuestion + 1}
          </span>

          <span>
            💖 attempts remaining:{" "}
            {4 - attempt}
          </span>

        </div>

        {/* QUESTION */}

        <div className="captcha-question">

          <div className="captcha-subject">
            {question.subject}
          </div>

          <h3>
            {question.question}
          </h3>

          <input
            type="text"
            value={
              answers[currentQuestion]
            }
            onChange={
              handleAnswerChange
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit()
              }
            }}
            placeholder="We believe in you! Type your answer here 💕"
          />

          {error && (
            <div className="captcha-error">

              <strong>
                🎉 GREAT ATTEMPT!
              </strong>

              <br />

              {error}

            </div>
          )}

        </div>

        {/* SUBMIT */}

        <button
          className="captcha-submit"
          onClick={handleSubmit}
        >
          {currentQuestion ===
          questions.length - 1
            ? 'SUBMIT & MAKE US PROUD 🌟'
            : 'I BELIEVE I CAN DO THIS! →'}
        </button>

        {/* WARNING */}

        <p className="captcha-warning">
          💚 Remember: every wrong answer is
          an opportunity to discover something
          new about yourself.
        </p>

        {/* SECRET BYPASS */}

        <div className="secret-bypass">

          <span>
            Know a shortcut?
          </span>

          <input
            type="text"
            value={secretPhrase}
            onChange={
              handleSecretPhraseChange
            }
            placeholder="Enter secret phrase..."
          />

        </div>

        {/* FOOTER */}

        <p className="captcha-tiny">
          UselessMart™ believes in you.
          <br />
          We are legally obligated to say this.
        </p>

      </div>
    </>
  )
}

export default AcademicCaptcha
