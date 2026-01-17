# EnfCalc

EnfCalc is a small nursing support web app (React + Vite) that calculates three common clinical scores used in inpatient settings:

- MEWS (Modified Early Warning Score) — physiological early warning score for clinical deterioration.
- Braden Scale — predicts pressure ulcer risk based on sensory perception, moisture, activity, mobility, nutrition and friction/shear.
- Morse Fall Scale — assesses fall risk.

## Run locally

1. Install dependencies

```
npm install
```

2. Start dev server

```
npm run dev
```

Open http://localhost:5173 (or the port shown by Vite).

## How it works

- Each calculator has its own responsive form component under `src/components/Forms`.
- Calculation logic lives in `src/utils/calculators.js` and clinical aggregation in `src/utils/assessments.js`.
- Results show a risk level, recommended actions and a short diagnostic note in a modal.

## Scales and scoring (summary)

### MEWS (Modified Early Warning Score)
Inputs: respiratory rate, oxygen saturation, supplemental oxygen (yes/no), systolic blood pressure, heart rate, temperature, level of consciousness (AVPU)

Scoring: each parameter is scored 0–3 (see `src/utils/calculators.js` for exact thresholds). Scores sum to a total MEWS.

Interpretation (defaults used in app):
- 0–2: Low risk — continue routine monitoring.
- 3–4: Medium risk — increase monitoring and notify nursing team.
- 5+: High risk — escalate to rapid response / physician evaluation per local protocol.

### Braden Scale
Six subscales: Sensory perception, Moisture, Activity, Mobility, Nutrition, Friction & Shear.

- Subscale scores: 1 (worst) to 4 (best) for most items; Friction & Shear is 1–3.
- Total score range: 6–23.

Interpretation (defaults used in app):
- 15–18: Mild risk — implement preventative skin care.
- 13–14: Moderate risk — increase preventive measures.
- 10–12: High risk — intensive preventive care.
- 6–9: Very high risk — aggressive prevention and specialist referral.

See `src/utils/calculators.js` for exact scoring logic and `src/utils/assessments.js` for guidance text.

### Morse Fall Scale
Components: history of falling, secondary diagnosis, ambulatory aid, IV/heparin lock, gait, mental status. Points assigned per item and summed.

Interpretation (defaults used in app):
- 0–24: Low risk
- 25–44: Moderate risk
- 45+: High risk

## Disclaimer
This tool is educational and should not replace clinical judgment or local protocols. Validate thresholds and actions with institutional guidelines before clinical use.
