# 🔷 Quaternionic Signal Processing (QSP)

**Status:** Active development · Production-ready architecture

> **Apply quaternion mathematics to real-world signal processing.**

QSP is a quaternion-native signal processing framework built on `qsp-core`. It provides FFT, filtering, modulation, and orientation estimation through a unified API that treats signals as quaternion-valued sequences.

---

## Stack Architecture

<div style="border: 2px solid var(--md-primary-fg-color); border-radius: 10px; overflow: hidden; text-align: center; font-family: var(--md-code-font); max-width: 640px; margin: 1.5rem auto;">
  <div style="background: var(--md-primary-fg-color); color: var(--md-primary-bg-color); padding: 14px 16px; font-weight: bold; font-size: 1.05em; letter-spacing: 0.04em;">
    qsp-stack
  </div>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); border-top: 2px solid var(--md-primary-fg-color);">
    <div style="padding: 12px 8px; border-right: 1px solid var(--md-primary-fg-color); font-size: 0.9em;">
      <strong>qsp-fft</strong>
    </div>
    <div style="padding: 12px 8px; border-right: 1px solid var(--md-primary-fg-color); font-size: 0.9em;">
      <strong>qsp-filter</strong>
    </div>
    <div style="padding: 12px 8px; border-right: 1px solid var(--md-primary-fg-color); font-size: 0.9em;">
      <strong>qsp-modulation</strong>
    </div>
    <div style="padding: 12px 8px; font-size: 0.9em;">
      <strong>qsp-orient</strong>
    </div>
  </div>
  <div style="background: var(--md-primary-fg-color--light, #e8eaf6); color: var(--md-primary-fg-color); padding: 14px 16px; border-top: 2px solid var(--md-primary-fg-color); font-weight: bold; font-size: 1.05em; letter-spacing: 0.04em;">
    qsp-core
  </div>
</div>

---

## Package Roles

<div class="grid cards" markdown>

-   **`qsp-core`** — Foundation

    ---

    Defines the quaternion-valued signal primitives, number types, and shared utilities that every other `qsp-*` package depends on.

    - Single source of truth for quaternion arithmetic
    - No external signal-processing dependencies
    - Designed for numerical correctness and testability

-   **`qsp-fft`** — Quaternionic FFT

    ---

    Implements the quaternion Fourier transform and its inverse, enabling frequency-domain analysis of quaternion-valued signals.

    - Quaternion FFT (QQFT) and inverse
    - Spectral analysis for multi-channel signals
    - Depends on `qsp-core`

-   **`qsp-filter`** — Signal Filtering

    ---

    Provides FIR and IIR filter designs that operate natively on quaternion signals, preserving inter-channel phase relationships.

    - Quaternion FIR and IIR filters
    - Hilbert-transform-based analytic signals
    - Depends on `qsp-core`

-   **`qsp-modulation`** — Modulation & Demodulation

    ---

    Encodes and decodes information using quaternion phase-shift keying and amplitude modulation schemes.

    - Quaternion phase-shift keying (QPSK extensions)
    - Amplitude and phase modulation
    - Depends on `qsp-core`

-   **`qsp-orient`** — Orientation Estimation

    ---

    Estimates rigid-body orientation from inertial or multi-antenna sensor streams using quaternion-domain filtering.

    - Attitude estimation from IMU data
    - Quaternion Kalman and complementary filters
    - Depends on `qsp-core`

-   **`qsp-stack`** — Umbrella Package

    ---

    A convenience meta-package that installs the complete QSP ecosystem in a single step.

    ```bash
    pip install qsp-stack
    ```

</div>

---

🌐 **Website:** [https://rqmtechnologies.com](https://rqmtechnologies.com)
