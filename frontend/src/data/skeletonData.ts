import { BoneStructureData } from "../types/anatomy";

export const SKELETON_DATA: BoneStructureData[] = [
  {
    "slug": "skull",
    "name": "Cranium & Facial Skeleton",
    "latin_name": "Cranium",
    "region": "axial",
    "category": "flat",
    "description": "Complex protective bony vault composed of 22 bones (8 cranial neurocranium bones and 14 splanchnocranium facial bones) joined by immovable fibrous sutures (coronal, sagittal, lambdoid, squamous).",
    "primary_function": "Encases and protects the brain, sensory organs of sight, hearing, and balance, and anchors muscles of mastication and facial expression.",
    "articulations": [
      "Atlas (C1 vertebra via occipital condyles)",
      "Mandible (temporomandibular joint)"
    ],
    "landmarks": [
      "Foramen Magnum",
      "Orbit",
      "External Acoustic Meatus",
      "Sella Turcica",
      "Zygomatic Arch"
    ],
    "clinical_notes": "Basilar skull fractures may cause raccoon eyes, Battle sign (mastoid ecchymosis), and CSF rhinorrhea/otorrhea.",
    "id": 1
  },
  {
    "slug": "mandible",
    "name": "Mandible (Lower Jaw)",
    "latin_name": "Mandibula",
    "region": "axial",
    "category": "irregular",
    "description": "The largest, strongest bone of the human face and the only mobile bone of the skull, consisting of a horizontal body and two ascending rami.",
    "primary_function": "Houses the lower dental arch and provides attachments for mastication muscles (temporalis, masseter, pterygoids).",
    "articulations": [
      "Temporal bones via bilateral Temporomandibular Joints (TMJ)"
    ],
    "landmarks": [
      "Coronoid Process",
      "Condylar Process",
      "Mental Foramen",
      "Mandibular Angle"
    ],
    "clinical_notes": "TMJ dysfunction syndrome causes joint clicking, facial pain, and impaired jaw range of motion.",
    "id": 2
  },
  {
    "slug": "vertebral_column",
    "name": "Vertebral Column (Spine)",
    "latin_name": "Columna vertebralis",
    "region": "axial",
    "category": "irregular",
    "description": "Flexible bony column of 33 vertebrae (7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral, 4 fused coccygeal) separated by fibrocartilaginous intervertebral discs.",
    "primary_function": "Protects the spinal cord, transmits body weight to the pelvis, and enables multi-axial trunk movement.",
    "articulations": [
      "Occipital bone",
      "Ribs (costovertebral joints)",
      "Pelvic ilium (sacroiliac joint)"
    ],
    "landmarks": [
      "Vertebral Foramen",
      "Spinous Process",
      "Transverse Process",
      "Intervertebral Foramen"
    ],
    "clinical_notes": "Intervertebral disc herniation compressing nerve roots leads to radiculopathy and sciatica.",
    "id": 3
  },
  {
    "slug": "thoracic_cage",
    "name": "Sternum & Ribs",
    "latin_name": "Cavea thoracis",
    "region": "axial",
    "category": "flat",
    "description": "Comprises the sternum (manubrium, body, xiphoid) and 12 pairs of ribs (1-7 true, 8-10 false, 11-12 floating) linked by costal cartilages.",
    "primary_function": "Shields thoracic viscera (heart and lungs) and contracts/relaxes to facilitate respiratory pump mechanics.",
    "articulations": [
      "Thoracic vertebrae (T1-T12)",
      "Clavicles (sternoclavicular joints)"
    ],
    "landmarks": [
      "Sternal Angle (Angle of Louis)",
      "Costal Margin",
      "Xiphoid Process"
    ],
    "clinical_notes": "Flail chest occurs when multiple adjacent rib fractures lead to paradoxical breathing.",
    "id": 4
  },
  {
    "slug": "pelvis",
    "name": "Pelvic Girdle",
    "latin_name": "Pelvis",
    "region": "appendicular",
    "category": "irregular",
    "description": "Robust basin formed by paired hip bones (os coxae: fused ilium, ischium, and pubis) uniting anteriorly at the pubic symphysis and posteriorly with the sacrum.",
    "primary_function": "Transfers axial weight to lower extremities, anchors powerful pelvic floor and locomotory muscles, and protects pelvic viscera.",
    "articulations": [
      "Sacrum (sacroiliac joints)",
      "Femur heads (acetabular hip joints)"
    ],
    "landmarks": [
      "Iliac Crest",
      "Acetabulum",
      "Ischial Tuberosity",
      "Pubic Symphysis",
      "Obturator Foramen"
    ],
    "clinical_notes": "Pelvic ring fractures are high-energy emergencies associated with life-threatening retroperitoneal hemorrhage.",
    "id": 5
  },
  {
    "slug": "femur",
    "name": "Femur (Thigh Bone)",
    "latin_name": "Os femoris",
    "region": "appendicular",
    "category": "long",
    "description": "The longest, heaviest, and strongest tubular bone in the human body, extending from the acetabulum of the pelvis down to the knee joint.",
    "primary_function": "Transmits whole-body loads during walking, running, and jumping, resisting up to 30 times body weight.",
    "articulations": [
      "Acetabulum of pelvis (hip joint)",
      "Tibia and patella (knee joint)"
    ],
    "landmarks": [
      "Femoral Head",
      "Femoral Neck",
      "Greater Trochanter",
      "Lesser Trochanter",
      "Medial/Lateral Condyles"
    ],
    "clinical_notes": "Femoral neck fractures in elderly osteoporotic individuals frequently disrupt retinacular blood supply, causing avascular necrosis.",
    "id": 6
  },
  {
    "slug": "tibia_fibula",
    "name": "Tibia & Fibula (Leg Bones)",
    "latin_name": "Tibia et Fibula",
    "region": "appendicular",
    "category": "long",
    "description": "Paired lower leg bones: the medial tibia is the primary weight-bearing bone, while the slender lateral fibula serves primarily for muscle attachment.",
    "primary_function": "Transmits vertical loads from the knee down to the talus of the ankle foot complex.",
    "articulations": [
      "Femur (tibiofemoral knee joint)",
      "Patella",
      "Talus (ankle mortise)"
    ],
    "landmarks": [
      "Tibial Tuberosity",
      "Medial Malleolus",
      "Lateral Malleolus",
      "Fibular Head"
    ],
    "clinical_notes": "Tibial shaft fractures are the most common long-bone fractures, susceptible to compartment syndrome.",
    "id": 7
  },
  {
    "slug": "humerus",
    "name": "Humerus (Arm Bone)",
    "latin_name": "Humerus",
    "region": "appendicular",
    "category": "long",
    "description": "Major long bone of the upper limb connecting the scapula at the shoulder to the radius and ulna at the elbow.",
    "primary_function": "Provides wide arc of mobility for forearm positioning and manual dexterity.",
    "articulations": [
      "Glenoid cavity of scapula (glenohumeral joint)",
      "Radius (capitulum)",
      "Ulna (trochlea)"
    ],
    "landmarks": [
      "Humeral Head",
      "Greater/Lesser Tubercle",
      "Deltoid Tuberosity",
      "Medial/Lateral Epicondyle"
    ],
    "clinical_notes": "Mid-shaft humeral fractures may injure the radial nerve running in the spiral radial groove, causing wrist drop.",
    "id": 8
  }
];
