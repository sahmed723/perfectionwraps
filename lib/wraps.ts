export type FinishKind = "gloss" | "matte" | "satin" | "chrome" | "shift";

export type Wrap = {
  id: string;
  label: string;
  code: string;
  hex: string;
  kind: FinishKind;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  hueShift?: boolean;
};

export const wraps: Wrap[] = [
  {
    id: "giallo",
    label: "Giallo Orion",
    code: "3M 2080-G15",
    hex: "#FFCB05",
    kind: "gloss",
    metalness: 0.55,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.025,
  },
  {
    id: "verde",
    label: "Verde Mantis",
    code: "3M 1080-M26",
    hex: "#243f24",
    kind: "matte",
    metalness: 0.05,
    roughness: 0.85,
    clearcoat: 0.15,
    clearcoatRoughness: 0.6,
  },
  {
    id: "nero",
    label: "Nero Aldebaran",
    code: "3M 2080-G12",
    hex: "#050505",
    kind: "gloss",
    metalness: 0.65,
    roughness: 0.14,
    clearcoat: 1.0,
    clearcoatRoughness: 0.018,
  },
  {
    id: "arancio",
    label: "Arancio Borealis",
    code: "3M 2080-G14",
    hex: "#ff5400",
    kind: "gloss",
    metalness: 0.5,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  },
  {
    id: "bianco",
    label: "Bianco Icarus",
    code: "3M 2080-SP10",
    hex: "#e9e6dd",
    kind: "satin",
    metalness: 0.25,
    roughness: 0.5,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
  },
  {
    id: "rosso",
    label: "Rosso Mars",
    code: "Avery SW900-462",
    hex: "#a0001a",
    kind: "gloss",
    metalness: 0.7,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  },
  {
    id: "blu",
    label: "Blu Eleos",
    code: "3M 2080-G217",
    hex: "#0a2a8a",
    kind: "gloss",
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
  },
  {
    id: "chrome",
    label: "Chrome Liquid",
    code: "Avery SF100",
    hex: "#dcdcdc",
    kind: "chrome",
    metalness: 1.0,
    roughness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.015,
  },
  {
    id: "shift",
    label: "Shift Cyan-Purple",
    code: "Inozetek MPB",
    hex: "#5a2bd8",
    kind: "shift",
    metalness: 0.7,
    roughness: 0.22,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    hueShift: true,
  },
];

export type CameraPreset = {
  id: "front" | "three-quarter" | "side" | "rear";
  label: string;
  position: [number, number, number];
  target: [number, number, number];
};

export const cameraPresets: CameraPreset[] = [
  {
    id: "three-quarter",
    label: "3/4",
    position: [4.25, 1.4, -4.5],
    target: [0, 0.5, 0],
  },
  {
    id: "front",
    label: "FRONT",
    position: [0.1, 1.15, -5.6],
    target: [0, 0.55, 0],
  },
  {
    id: "side",
    label: "SIDE",
    position: [5.6, 1.05, 0.05],
    target: [0, 0.5, 0],
  },
  {
    id: "rear",
    label: "REAR",
    position: [-0.1, 1.4, 5.4],
    target: [0, 0.55, 0],
  },
];
