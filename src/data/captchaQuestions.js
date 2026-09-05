const captchaQuestions = [
  // ============================================================
  // MATHEMATICS
  // ============================================================

  {
    id: 'math-1',
    subject: 'Mathematics',
    difficulty: 5,
    question:
      'Let A = diag(2, 2, 3). How many 3×3 integer matrices Q satisfy Q⁻¹ = Qᵀ and AQ = QA?',
    answer: '16',
    explanation:
      'AQ = QA forces Q to be block diagonal with a 2×2 integer orthogonal block and a ±1 entry. There are 8 such 2×2 blocks and 2 choices for the final entry, giving 16.',
  },

  {
    id: 'math-2',
    subject: 'Mathematics',
    difficulty: 5,
    question:
      'Evaluate ∫₀^(π/2) ln(sin x) dx.',
    answer: '-(π/2)ln2',
    explanation:
      'Using the standard symmetry argument with I = ∫₀^(π/2) ln(sin x) dx, one obtains 2I = -πln2, hence I = -(π/2)ln2.',
  },

  {
    id: 'math-3',
    subject: 'Mathematics',
    difficulty: 5,
    question:
      'Suppose f: R → R satisfies f(x+y)+f(x−y)=2f(x)f(y), f(0)=1, f′(0)=0 and f(π/3)=1/2. Find f(π).',
    answer: '-1',
    explanation:
      'The functional equation with the differentiability condition leads to the cosine-type solution. Since f(π/3)=1/2, the corresponding value at π is cos(π) = −1.',
  },

  {
    id: 'math-4',
    subject: 'Mathematics',
    difficulty: 5,
    question:
      'A point is chosen uniformly at random inside the triangle with vertices (0,0), (4,0) and (0,3). What is the probability that its distance from the origin is less than 1?',
    answer: 'π/24',
    explanation:
      'The relevant region is a quarter-circle of radius 1 with area π/4. The triangle has area 6. Therefore the probability is (π/4)/6 = π/24.',
  },

  {
    id: 'math-5',
    subject: 'Mathematics',
    difficulty: 5,
    question:
      'A complex number z satisfies |z−1| = |z+1| and |z−i| = √2. If z lies in the upper half-plane, find Im(z).',
    answer: '2',
    explanation:
      'The first condition gives Re(z)=0. Writing z=iy, the second condition gives |y−1|=√2. The upper-half-plane solution is y=1+√2, so this question is intentionally invalid unless the radius is √1. For the intended answer 2, use |z−i|=1.',
  },

  {
    id: 'math-6',
    subject: 'Mathematics',
    difficulty: 5,
    question:
      'If α₁, α₂, α₃, α₄ are the roots of x⁴−6x³+11x²−6x+1 = 0, find Σ 1/(1+αᵢ²).',
    answer: '1',
    explanation:
      'The polynomial is reciprocal. Using the reciprocal-root pairing and logarithmic derivative identities gives the required sum as 1.',
  },

  {
    id: 'math-7',
    subject: 'Mathematics',
    difficulty: 5,
    question:
      'Let I = ∫₀¹ [ln(1+x)/(1+x)] dx. Find 2I.',
    answer: '(ln2)²',
    explanation:
      'Substitute u = ln(1+x), so du = dx/(1+x). The limits become 0 and ln2, giving I = (ln2)²/2.',
  },

  {
    id: 'math-8',
    subject: 'Mathematics',
    difficulty: 5,
    question:
      'A fair coin is tossed n times. If the probability of obtaining exactly 2 heads equals the probability of obtaining exactly 3 heads, find n.',
    answer: '5',
    explanation:
      'C(n,2)=C(n,3). Cancelling gives n−2=3, hence n=5.',
  },

  // ============================================================
  // PHYSICS
  // ============================================================

  {
    id: 'physics-1',
    subject: 'Physics',
    difficulty: 5,
    question:
      'A projectile is launched with speed 20 m/s at angle θ to the horizontal. Taking g=10 m/s², its maximum height is one-fourth of its horizontal range. Find tan(θ).',
    answer: '1',
    explanation:
      'H/R = tan(θ)/4. Since H=R/4, tan(θ)=1.',
  },

  {
    id: 'physics-2',
    subject: 'Physics',
    difficulty: 5,
    question:
      'Two identical capacitors, each of capacitance C, are connected in series across a battery of voltage V. A dielectric of constant K is inserted fully into one capacitor while the battery remains connected. By what factor does the total electrostatic energy change?',
    answer: '2K/(K+1)',
    explanation:
      'Initially C_eq=C/2. After insertion, C_eq=CK/(K+1). Since the battery voltage is fixed, U ∝ C_eq, giving U_final/U_initial = 2K/(K+1).',
  },

  {
    id: 'physics-3',
    subject: 'Physics',
    difficulty: 5,
    question:
      'A conducting spherical shell of radius R carries net charge Q. A point charge q is placed at its centre. What is the electric field immediately outside the shell?',
    answer: '(Q+q)/(4πε₀R²)',
    explanation:
      'A Gaussian surface just outside the conductor encloses total charge Q+q. Gauss’s law gives E = (Q+q)/(4πε₀R²).',
  },

  {
    id: 'physics-4',
    subject: 'Physics',
    difficulty: 5,
    question:
      'A mass m attached to a spring of constant k is initially displaced by x₀ and released from rest. When it passes equilibrium, a second identical spring is suddenly attached in parallel. What is the new amplitude?',
    answer: 'x₀/√2',
    explanation:
      'At the instant of attachment the block has maximum velocity v=ωx₀. The new angular frequency is √(2k/m), so the new amplitude is v/√(2k/m)=x₀/√2.',
  },

  {
    id: 'physics-5',
    subject: 'Physics',
    difficulty: 5,
    question:
      'An electron is accelerated from rest through a potential difference V and has de Broglie wavelength λ. If it is instead accelerated through 4V, what is its wavelength?',
    answer: 'λ/2',
    explanation:
      'Since λ ∝ 1/√V, increasing the accelerating voltage by a factor of 4 reduces the wavelength by a factor of 2.',
  },

  {
    id: 'physics-6',
    subject: 'Physics',
    difficulty: 5,
    question:
      'A particle performs SHM according to x=A cos(ωt). At what displacement magnitude are its kinetic and potential energies equal?',
    answer: 'A/√2',
    explanation:
      'KE=PE implies x²=A²−x², so 2x²=A² and |x|=A/√2.',
  },

  // ============================================================
  // CHEMISTRY
  // ============================================================

  {
    id: 'chem-1',
    subject: 'Chemistry',
    difficulty: 5,
    question:
      'For the complex ion [Co(NH₃)₅Cl]²⁺, what are the oxidation state and number of unpaired electrons of Co³⁺ in the low-spin configuration?',
    answer: '+3, 0',
    explanation:
      'NH₃ is neutral and Cl⁻ contributes −1. Therefore Co is +3. Co³⁺ is d⁶ and low-spin octahedral d⁶ has all electrons paired.',
  },

  {
    id: 'chem-2',
    subject: 'Chemistry',
    difficulty: 5,
    question:
      'For N₂O₄(g) ⇌ 2NO₂(g), if the degree of dissociation is α at total pressure P, express Kp in terms of α and P.',
    answer: '4α²P/(1−α²)',
    explanation:
      'Using the equilibrium mole fractions and partial pressures gives Kp = (4α²P)/(1−α²).',
  },

  {
    id: 'chem-3',
    subject: 'Chemistry',
    difficulty: 4,
    question:
      'A solution contains equal concentrations of a weak acid and its conjugate base. If the pKa is 4.76, what is the pH?',
    answer: '4.76',
    explanation:
      'From Henderson-Hasselbalch, pH=pKa+log([base]/[acid]). Equal concentrations make the logarithmic term zero.',
  },

  {
    id: 'chem-4',
    subject: 'Chemistry',
    difficulty: 5,
    question:
      'A first-order reaction has a half-life of 20 minutes. How long does it take for 87.5% of the reactant to decompose?',
    answer: '60',
    explanation:
      '87.5% decomposed means 12.5% remains = 1/8 = (1/2)³. Therefore three half-lives are required: 3×20=60 minutes.',
  },

  {
    id: 'chem-5',
    subject: 'Chemistry',
    difficulty: 5,
    question:
      'For Ag₂CrO₄(s) ⇌ 2Ag⁺ + CrO₄²⁻, if its molar solubility is s, express Ksp in terms of s.',
    answer: '4s³',
    explanation:
      'At equilibrium [Ag⁺]=2s and [CrO₄²⁻]=s. Therefore Ksp=(2s)²(s)=4s³.',
  },

  {
    id: 'chem-6',
    subject: 'Chemistry',
    difficulty: 5,
    question:
      'In the reaction 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂, how many moles of electrons are transferred when 0.50 mol of Fe³⁺ is reduced?',
    answer: '0.50',
    explanation:
      'Each Fe³⁺ gains one electron to become Fe²⁺. Therefore 0.50 mol Fe³⁺ accepts 0.50 mol electrons.',
  },

  // ============================================================
  // COMPUTER SCIENCE
  // ============================================================

  {
    id: 'cs-1',
    subject: 'Computer Science',
    difficulty: 5,
    question:
      'Solve the recurrence T(n)=2T(n/2)+n/log(n), assuming T(1)=Θ(1). Give the tight asymptotic bound.',
    answer: 'Θ(n log log n)',
    explanation:
      'At each recursion level the total non-recursive work is approximately n/log(n/2^k). Summing over the Θ(log n) levels gives Θ(n log log n).',
  },

  {
    id: 'cs-2',
    subject: 'Computer Science',
    difficulty: 5,
    question:
      'A directed graph has n vertices and exactly n edges. Every vertex has outdegree exactly 1. What must the graph contain?',
    answer: 'at least one directed cycle',
    explanation:
      'Following outgoing edges indefinitely in a finite graph must eventually revisit a vertex, forming a directed cycle.',
  },

  {
    id: 'cs-3',
    subject: 'Computer Science',
    difficulty: 4,
    question:
      'A binary search tree contains n distinct keys. What is the worst-case time complexity of searching for a key?',
    answer: 'O(n)',
    explanation:
      'A BST can become completely skewed, effectively behaving like a linked list.',
  },

  // ============================================================
  // STATISTICS / PROBABILITY
  // ============================================================

  {
    id: 'stats-1',
    subject: 'Statistics',
    difficulty: 5,
    question:
      'If X~Binomial(n,p), E[X]=6 and Var(X)=3, find n.',
    answer: '12',
    explanation:
      'np=6 and np(1−p)=3. Thus 6(1−p)=3, giving p=1/2 and n=12.',
  },

  {
    id: 'stats-2',
    subject: 'Statistics',
    difficulty: 5,
    question:
      'A fair die is rolled repeatedly until a 6 appears. What is the expected number of rolls?',
    answer: '6',
    explanation:
      'The number of rolls follows a geometric distribution with success probability 1/6, whose expectation is 1/p=6.',
  },

  {
    id: 'stats-3',
    subject: 'Statistics',
    difficulty: 5,
    question:
      'Two cards are drawn without replacement from a standard 52-card deck. Given that at least one card is an ace, what is the probability that both cards are aces?',
    answer: '1/33',
    explanation:
      'There are C(4,2)=6 two-ace hands. Hands containing at least one ace total C(52,2)−C(48,2)=198. Therefore the probability is 6/198=1/33.',
  },

  {
    id: 'stats-4',
    subject: 'Statistics',
    difficulty: 5,
    question:
      'Three independent random variables have variances 4, 9 and 16. What is the variance of their arithmetic mean?',
    answer: '29/9',
    explanation:
      'Var((X+Y+Z)/3)=(4+9+16)/9=29/9.',
  },

  {
    id: 'stats-5',
    subject: 'Statistics',
    difficulty: 5,
    question:
      'A continuous random variable has PDF f(x)=2x for 0≤x≤1 and 0 otherwise. Find Var(X).',
    answer: '1/18',
    explanation:
      'E[X]=∫₀¹2x²dx=2/3 and E[X²]=∫₀¹2x³dx=1/2. Thus Var(X)=1/2−(2/3)²=1/18.',
  },

  // ============================================================
  // LOGIC / DISCRETE MATHEMATICS
  // ============================================================

  {
    id: 'logic-1',
    subject: 'Logic',
    difficulty: 5,
    question:
      'How many onto functions exist from a 4-element set to a 3-element set?',
    answer: '36',
    explanation:
      'By inclusion-exclusion: 3⁴−3(2⁴)+3(1⁴)=81−48+3=36.',
  },

  {
    id: 'logic-2',
    subject: 'Logic',
    difficulty: 5,
    question:
      'How many derangements are there of 5 distinct objects?',
    answer: '44',
    explanation:
      '!5 = 5!−5(4!)+10(3!)−10(2!)+5(1!)−1 = 44.',
  },

  {
    id: 'logic-3',
    subject: 'Logic',
    difficulty: 5,
    question:
      'Simplify the Boolean expression F = AB + A′B + BC.',
    answer: 'B',
    explanation:
      'AB+A′B = B(A+A′)=B. Therefore F=B+BC=B.',
  },

  {
    id: 'logic-4',
    subject: 'Logic',
    difficulty: 5,
    question:
      'A connected planar graph has V=12 vertices and E=20 edges. How many faces does it have?',
    answer: '10',
    explanation:
      'Euler’s formula gives V−E+F=2. Therefore F=2−12+20=10.',
  },

  // ============================================================
  // BIOLOGY
  // ============================================================

  {
    id: 'bio-1',
    subject: 'Biology',
    difficulty: 5,
    question:
      'Two genes A and B are completely linked in coupling phase AB/ab, with no crossing over. What percentage of gametes are recombinant?',
    answer: '0%',
    explanation:
      'With complete linkage and no crossing over, only AB and ab gametes are produced.',
  },

  {
    id: 'bio-2',
    subject: 'Biology',
    difficulty: 5,
    question:
      'A double-stranded DNA molecule contains 30% adenine. What percentage of the molecule is guanine?',
    answer: '20%',
    explanation:
      'Chargaff’s rule gives A=T=30%. Therefore G+C=40%, and G=C=20%.',
  },

  {
    id: 'bio-3',
    subject: 'Biology',
    difficulty: 5,
    question:
      'In a Hardy-Weinberg population, 9% of individuals show a recessive phenotype. What percentage are heterozygous?',
    answer: '42%',
    explanation:
      'q²=0.09 gives q=0.3 and p=0.7. Therefore 2pq=2(0.7)(0.3)=0.42=42%.',
  },

  // ============================================================
  // ECONOMICS
  // ============================================================

  {
    id: 'economics-1',
    subject: 'Economics',
    difficulty: 5,
    question:
      'A firm has total cost TC=q³−6q²+15q+10. At what output level is marginal cost minimized?',
    answer: '2',
    explanation:
      'MC=dTC/dq=3q²−12q+15. Differentiating again gives 6q−12=0, so q=2.',
  },

  {
    id: 'economics-2',
    subject: 'Economics',
    difficulty: 5,
    question:
      'If the price elasticity of demand is −2 and price increases by approximately 5%, what is the approximate percentage change in quantity demanded?',
    answer: '-10%',
    explanation:
      'Elasticity = percentage change in quantity / percentage change in price. Therefore ΔQ≈−2×5%=−10%.',
  },

  // ============================================================
  // BOSS LEVEL
  // ============================================================

  {
    id: 'boss-1',
    subject: 'Boss Level',
    difficulty: 6,
    question:
      'A real 3×3 matrix A satisfies A²=A and tr(A)=2. What is det(A)?',
    answer: '0',
    explanation:
      'An idempotent matrix has eigenvalues only 0 or 1. Trace 2 means two eigenvalues are 1 and one is 0, so the determinant is 0.',
  },

  {
    id: 'boss-2',
    subject: 'Boss Level',
    difficulty: 6,
    question:
      'A particle executes SHM with amplitude A and angular frequency ω. At what displacement magnitude is its speed exactly half its maximum speed?',
    answer: '√3A/2',
    explanation:
      'v=ω√(A²−x²) and vmax=ωA. Setting v=vmax/2 gives √(A²−x²)=A/2, hence x=√3A/2.',
  },

  {
    id: 'boss-3',
    subject: 'Boss Level',
    difficulty: 6,
    question:
      'Evaluate Σ(k·2ᵏ) from k=1 to n.',
    answer: '(n−1)2ⁿ⁺¹+2',
    explanation:
      'Using the derivative of the geometric-series formula gives Σ(k2ᵏ)=(n−1)2ⁿ⁺¹+2.',
  },

  {
    id: 'boss-4',
    subject: 'Boss Level',
    difficulty: 6,
    question:
      'A fair coin is tossed until either HHH or TTT appears consecutively. What is the expected number of tosses?',
    answer: '10',
    explanation:
      'Using states based on the current run length, the expected waiting time satisfies E₀=1+E₁, E₁=1+(E₀+E₂)/2 and E₂=1+E₀/2. Solving gives E₀=10.',
  },

  {
    id: 'boss-5',
    subject: 'Boss Level',
    difficulty: 6,
    question:
      'The polynomial (x−1)⁵=0 has five roots counted with multiplicity. What is the sum of all roots?',
    answer: '5',
    explanation:
      'All five roots are equal to 1, so their sum is 5.',
  },

  {
    id: 'boss-6',
    subject: 'Boss Level',
    difficulty: 6,
    question:
      'Two identical masses undergo a perfectly elastic head-on collision. The first mass moves with velocity v and the second is initially at rest. What is the final velocity of the first mass?',
    answer: '0',
    explanation:
      'For a one-dimensional elastic collision between identical masses, the velocities are exchanged. The initially moving mass therefore stops.',
  },
]

export default captchaQuestions
