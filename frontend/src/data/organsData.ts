import { OrganData } from "../types/anatomy";

export const ORGANS_DATA: OrganData[] = [
  {
    "slug": "heart",
    "name": "Human Heart",
    "latin_name": "Cor humanum",
    "system_slug": "cardiovascular",
    "description": "The human heart is a four-chambered, hollow muscular organ situated in the middle mediastinum of the thorax, between the lungs and slightly to the left of the midline. Functioning as a dual coordinated suction-and-pressure pump, it beats approximately 100,000 times each day, propelling about 7,500 liters of blood through more than 96,000 kilometers of blood vessels.",
    "location": "Middle mediastinum of the thoracic cavity, posterior to the sternum, between the pleural cavities of the lungs, extending from the second to fifth intercostal spaces.",
    "primary_function": "Pumps deoxygenated blood to the lungs for gas exchange (pulmonary circulation) and oxygen-rich blood throughout the body tissues (systemic circulation).",
    "physiology": "The cardiac cycle comprises ventricular systole (contraction and blood ejection) and diastole (relaxation and ventricular filling). Intrinsic electrical excitation originates in the sinoatrial (SA) pacemaker node at the junction of the superior vena cava and right atrium. The impulse propagates through atrial myocardium to the atrioventricular (AV) node, enters the bundle of His, bifurcates into right and left bundle branches, and spreads through subendocardial Purkinje fibers to trigger coordinated apex-to-base ventricular contraction.",
    "clinical_relevance": "Myocardial infarction occurs when coronary artery thrombosis occludes regional myocardial perfusion, leading to ischemic necrosis of cardiac myocytes. Valvular stenosis or insufficiency alters intracardiac hemodynamics, triggering compensatory hypertrophy or heart failure.",
    "blood_supply": "Right and left coronary arteries arising immediately superior to the aortic valve cusps from the ascending aorta.",
    "innervation": "Autonomic cardiac plexus: sympathetic acceleration via postganglionic fibers from cervical and upper thoracic ganglia; parasympathetic slowing via vagus nerve (CN X).",
    "weight_desc": "280 - 340 grams in adult males; 230 - 280 grams in adult females",
    "dimensions_desc": "Approximately 12 cm long, 8.5 cm wide, and 6 cm in anterior-posterior depth (roughly the size of a clenched fist)",
    "subcomponents": [
      {
        "id": "right_atrium",
        "name": "Right Atrium",
        "latinName": "Atrium dextrum",
        "description": "Thin-walled right upper cardiac chamber receiving deoxygenated systemic venous return.",
        "function": "Collects venous blood from superior vena cava, inferior vena cava, and coronary sinus; pumps it through the tricuspid valve into the right ventricle during atrial systole.",
        "explosionDir": [
          1.2,
          0.4,
          0.3
        ],
        "color": "#3b82f6",
        "internal": false
      },
      {
        "id": "right_ventricle",
        "name": "Right Ventricle",
        "latinName": "Ventriculus dexter",
        "description": "Crescent-shaped, lower anterior chamber with muscular trabeculae carneae.",
        "function": "Pumps deoxygenated blood under moderate pressure (25/10 mmHg) through the pulmonary semilunar valve into the pulmonary trunk.",
        "explosionDir": [
          0.9,
          -0.6,
          0.8
        ],
        "color": "#2563eb",
        "internal": false
      },
      {
        "id": "left_atrium",
        "name": "Left Atrium",
        "latinName": "Atrium sinistrum",
        "description": "Posterior-most cardiac chamber receiving newly oxygenated blood directly from the lungs.",
        "function": "Receives oxygenated blood from the four pulmonary veins and conveys it across the mitral (bicuspid) valve into the left ventricle.",
        "explosionDir": [
          -1.1,
          0.6,
          -0.7
        ],
        "color": "#ef4444",
        "internal": false
      },
      {
        "id": "left_ventricle",
        "name": "Left Ventricle",
        "latinName": "Ventriculus sinister",
        "description": "Thick-walled, high-pressure conical chamber forming the apex of the heart.",
        "function": "Generates systemic systolic pressure (120 mmHg) to pump oxygenated blood through the aortic valve into the ascending aorta and systemic circulation.",
        "explosionDir": [
          -1.0,
          -0.7,
          0.6
        ],
        "color": "#dc2626",
        "internal": false
      },
      {
        "id": "aorta",
        "name": "Ascending Aorta & Arch",
        "latinName": "Aorta ascendens et Arcus aortae",
        "description": "The largest systemic elastic artery, arching superiorly and posteriorly over the pulmonary trunk.",
        "function": "Distributes high-pressure oxygenated blood to the brachiocephalic trunk, left carotid, left subclavian, and descending systemic arterial tree.",
        "explosionDir": [
          -0.2,
          1.4,
          -0.2
        ],
        "color": "#b91c1c",
        "internal": false
      },
      {
        "id": "superior_vena_cava",
        "name": "Superior Vena Cava",
        "latinName": "Vena cava superior",
        "description": "Large systemic venous trunk descending vertically into the posterosuperior aspect of the right atrium.",
        "function": "Returns deoxygenated blood from the head, neck, upper limbs, and thoracic wall to the right atrium.",
        "explosionDir": [
          0.8,
          1.2,
          -0.4
        ],
        "color": "#1d4ed8",
        "internal": false
      },
      {
        "id": "inferior_vena_cava",
        "name": "Inferior Vena Cava",
        "latinName": "Vena cava inferior",
        "description": "The largest vein in the human body, piercing the central tendon of the diaphragm.",
        "function": "Returns deoxygenated venous blood from abdominal viscera, pelvis, and lower extremities to the inferior aspect of the right atrium.",
        "explosionDir": [
          0.7,
          -1.3,
          -0.5
        ],
        "color": "#1e40af",
        "internal": false
      },
      {
        "id": "pulmonary_trunk",
        "name": "Pulmonary Trunk & Arteries",
        "latinName": "Truncus pulmonalis",
        "description": "Arterial trunk emerging from the right ventricle conus arteriosus and bifurcating into left and right pulmonary arteries.",
        "function": "Carries deoxygenated blood from the right ventricle into the left and right lung capillary beds for re-oxygenation.",
        "explosionDir": [
          0.1,
          1.1,
          0.9
        ],
        "color": "#60a5fa",
        "internal": false
      },
      {
        "id": "pulmonary_veins",
        "name": "Pulmonary Veins (4 Vessels)",
        "latinName": "Venae pulmonales",
        "description": "Four vessels (two left, two right) emerging from lung hila and entering the posterolateral left atrium.",
        "function": "Carry oxygen-saturated blood from alveolar capillary networks back to the left atrium.",
        "explosionDir": [
          -1.2,
          0.2,
          -1.1
        ],
        "color": "#f87171",
        "internal": false
      },
      {
        "id": "coronary_arteries",
        "name": "Coronary Arteries & Veins",
        "latinName": "Arteriae et Venae coronariae",
        "description": "Vascular network encircling the coronary sulcus and anterior/posterior interventricular grooves.",
        "function": "Supplies oxygen and glucose to contracting cardiomyocytes; drains venous return into the coronary sinus.",
        "explosionDir": [
          0.0,
          -0.1,
          1.3
        ],
        "color": "#f43f5e",
        "internal": false
      },
      {
        "id": "tricuspid_valve",
        "name": "Tricuspid Valve",
        "latinName": "Valva tricuspidalis",
        "description": "Atrioventricular valve between right atrium and right ventricle featuring anterior, posterior, and septal cusps.",
        "function": "Prevents retrograde regurgitation of blood from right ventricle into right atrium during ventricular systole.",
        "explosionDir": [
          0.6,
          0.1,
          0.2
        ],
        "color": "#93c5fd",
        "internal": true
      },
      {
        "id": "mitral_valve",
        "name": "Mitral (Bicuspid) Valve",
        "latinName": "Valva bicuspidalis / mitralis",
        "description": "Dual-cusp atrioventricular valve separating left atrium from left ventricle, reinforced by fibrous annulus.",
        "function": "Withstands high systolic pressure to prevent backflow into the left atrium during left ventricular contraction.",
        "explosionDir": [
          -0.6,
          0.2,
          0.1
        ],
        "color": "#fca5a5",
        "internal": true
      },
      {
        "id": "aortic_valve",
        "name": "Aortic Semilunar Valve",
        "latinName": "Valva aortae",
        "description": "Three pocket-like semilunar cusps (right, left, and posterior) guarding the aortic orifice.",
        "function": "Prevents arterial backflow from ascending aorta into left ventricle during ventricular diastole.",
        "explosionDir": [
          -0.1,
          0.4,
          0.1
        ],
        "color": "#fb7185",
        "internal": true
      },
      {
        "id": "pulmonary_valve",
        "name": "Pulmonary Semilunar Valve",
        "latinName": "Valva trunci pulmonalis",
        "description": "Semilunar valve at the junction of the conus arteriosus and pulmonary trunk.",
        "function": "Prevents reflux from the pulmonary artery into the right ventricle during diastole.",
        "explosionDir": [
          0.2,
          0.5,
          0.4
        ],
        "color": "#93c5fd",
        "internal": true
      },
      {
        "id": "interventricular_septum",
        "name": "Interventricular Septum",
        "latinName": "Septum interventriculare",
        "description": "Stout muscular partition separating right and left ventricular cavities.",
        "function": "Contributes to ventricular pumping mechanics and houses the atrioventricular bundle branches.",
        "explosionDir": [
          0.0,
          -0.2,
          0.0
        ],
        "color": "#e11d48",
        "internal": true
      },
      {
        "id": "papillary_muscles",
        "name": "Papillary Muscles & Chordae Tendineae",
        "latinName": "Musculi papillares et Chordae tendineae",
        "description": "Muscular projections from ventricular walls tethered to AV valve cusps via collagenous cord-like tendons.",
        "function": "Tense prior to systole to prevent prolapse and eversion of tricuspid and mitral valves into the atria.",
        "explosionDir": [
          -0.4,
          -0.6,
          0.2
        ],
        "color": "#fda4af",
        "internal": true
      }
    ],
    "internal_structures": [
      {
        "name": "Left Ventricular Muscular Wall",
        "thickness": "12 - 15 mm (3x thicker than right ventricle)",
        "description": "Thick concentric myocardium designed to overcome high systemic vascular resistance (Afterload: ~80-120 mmHg)."
      },
      {
        "name": "Fossa Ovalis",
        "thickness": "Thin membranous depression",
        "description": "Fibrous remnant of the fetal foramen ovale located on the interatrial septum, which bypassed non-ventilated fetal lungs."
      },
      {
        "name": "Trabeculae Carneae",
        "thickness": "3 - 5 mm muscular ridges",
        "description": "Muscular columns lining ventricular endocardium that reduce hydrodynamic drag and prevent suction effects during emptying."
      },
      {
        "name": "Conduction Bundle of His",
        "thickness": "Subendocardial specialized tract",
        "description": "Passes through the fibrous cardiac skeleton to transmit depolarizing action potentials from AV node to apex."
      }
    ],
    "terminology": [
      {
        "term": "Systole",
        "definition": "The phase of the cardiac cycle when the ventricles contract, pumping blood into the aorta and pulmonary artery."
      },
      {
        "term": "Diastole",
        "definition": "The phase of the cardiac cycle when the myocardium relaxes, allowing the chambers to fill with blood."
      },
      {
        "term": "Stroke Volume",
        "definition": "The volume of blood pumped out of a ventricle with each single beat (typically ~70 mL at rest)."
      },
      {
        "term": "Cardiac Output",
        "definition": "Heart Rate multiplied by Stroke Volume, representing total volume pumped per minute (~5.0 L/min at rest)."
      },
      {
        "term": "Chordae Tendineae",
        "definition": "Fibrous cords resembling parachute lines that tether the AV valve leaflets to the papillary muscles."
      }
    ],
    "fun_facts": [
      "Your heart creates enough mechanical energy each day to drive an average automobile approximately 32 kilometers.",
      "Because the heart possesses its own intrinsic electrical conduction pacemaker, it can continue to beat outside the human body as long as it has oxygen.",
      "The thump-thump sound of the heartbeat ('lub-dub') is created not by muscle contraction, but by the abrupt closure of heart valves.",
      "Over an average lifetime, the human heart will beat more than 2.5 billion times without a single second of complete rest."
    ],
    "id": 1
  },
  {
    "slug": "brain",
    "name": "Human Brain",
    "latin_name": "Encephalon",
    "system_slug": "nervous",
    "description": "The command center of the central nervous system, housing approximately 86 billion neurons and an equal number of non-neuronal glial cells. Encased within the neurocranium and bathed in cerebrospinal fluid, it interprets sensory signals, initiates voluntary actions, coordinates autonomic equilibrium, and generates consciousness, thought, and memory.",
    "location": "Cranial cavity of the skull, suspended within three meningeal layers (dura mater, arachnoid mater, pia mater).",
    "primary_function": "Processes cognitive information, integrates sensory perceptions, controls motor outputs, regulates visceral organs, and sustains conscious awareness.",
    "physiology": "Neurons generate resting membrane potentials (-70 mV) via Na+/K+ ATPase pumps. Sensory or synaptic depolarization triggers voltage-gated Na+ channel opening, propagating all-or-none action potentials along myelinated axons to chemical synapses where neurotransmitters (glutamate, GABA, dopamine, serotonin) are exocytosed across synaptic clefts.",
    "clinical_relevance": "Cerebrovascular accidents (strokes), traumatic brain injuries, glioblastomas, and neurodegenerative conditions (Alzheimer's disease, Parkinson's disease, ALS) directly affect functional brain architecture.",
    "blood_supply": "Circle of Willis formed by the paired internal carotid arteries and vertebral/basilar arterial system.",
    "innervation": "Cranial nerves I through XII originate from the cerebrum and brainstem to innervate head, neck, and viscera.",
    "weight_desc": "Approximately 1,300 - 1,400 grams (about 2% of total body mass, yet consuming 20% of resting oxygen and glucose)",
    "dimensions_desc": "Approximately 140 mm in width, 167 mm in length, and 93 mm in vertical height",
    "subcomponents": [
      {
        "id": "frontal_lobe",
        "name": "Frontal Lobe",
        "latinName": "Lobus frontalis",
        "description": "Anterior cerebral hemisphere region extending to the central sulcus.",
        "function": "Executive planning, decision-making, working memory, personality, voluntary motor initiation (primary motor cortex), and speech production (Broca's area).",
        "explosionDir": [
          0.0,
          0.3,
          1.2
        ],
        "color": "#38bdf8",
        "internal": false
      },
      {
        "id": "parietal_lobe",
        "name": "Parietal Lobe",
        "latinName": "Lobus parietalis",
        "description": "Superior cortical region posterior to central sulcus and superior to lateral sulcus.",
        "function": "Somatosensory integration (postcentral gyrus), spatial orientation, sensory map perception, and tactile discrimination.",
        "explosionDir": [
          0.0,
          0.9,
          -0.3
        ],
        "color": "#818cf8",
        "internal": false
      },
      {
        "id": "temporal_lobe",
        "name": "Temporal Lobe",
        "latinName": "Lobus temporalis",
        "description": "Lateral inferior cortical lobe beneath the sylvian / lateral fissure.",
        "function": "Auditory processing (primary auditory cortex), language comprehension (Wernicke's area), and memory encoding (hippocampus).",
        "explosionDir": [
          1.1,
          -0.2,
          0.1
        ],
        "color": "#a78bfa",
        "internal": false
      },
      {
        "id": "occipital_lobe",
        "name": "Occipital Lobe",
        "latinName": "Lobus occipitalis",
        "description": "Posterior-most cortical region resting upon the tentorium cerebelli.",
        "function": "Primary visual processing (striate cortex / Brodmann area 17), edge detection, motion perception, and color interpretation.",
        "explosionDir": [
          0.0,
          0.1,
          -1.3
        ],
        "color": "#c084fc",
        "internal": false
      },
      {
        "id": "cerebellum",
        "name": "Cerebellum ('Little Brain')",
        "latinName": "Cerebellum",
        "description": "Densely folded structure nestled beneath the occipital lobes featuring half of the brain's total neurons.",
        "function": "Fine motor coordination, balance, motor learning, procedural memory, and calibration of smooth trajectory movements.",
        "explosionDir": [
          0.0,
          -0.9,
          -0.8
        ],
        "color": "#f472b6",
        "internal": false
      },
      {
        "id": "brainstem",
        "name": "Brainstem (Midbrain, Pons, Medulla)",
        "latinName": "Truncus encephali",
        "description": "Stalk connecting the cerebral hemispheres with the spinal cord.",
        "function": "Houses autonomic centers for cardiac rate, vasomotor tone, swallowing, vomiting, and respiratory rhythm generation.",
        "explosionDir": [
          0.0,
          -1.2,
          0.0
        ],
        "color": "#fb923c",
        "internal": false
      },
      {
        "id": "corpus_callosum",
        "name": "Corpus Callosum",
        "latinName": "Corpus callosum",
        "description": "Massive arching commissural white matter tract with 200+ million axons.",
        "function": "Transfers sensory, motor, and cognitive information between left and right cerebral hemispheres.",
        "explosionDir": [
          0.0,
          0.2,
          0.0
        ],
        "color": "#fbbf24",
        "internal": true
      },
      {
        "id": "ventricular_system",
        "name": "Ventricular System & CSF",
        "latinName": "Systema ventriculare",
        "description": "Communicating network of fluid-filled cavities: lateral, third, and fourth ventricles.",
        "function": "Choroid plexuses synthesize cerebrospinal fluid (CSF; ~500 mL/day), providing mechanical buoyancy and metabolic waste clearance.",
        "explosionDir": [
          0.0,
          0.0,
          0.0
        ],
        "color": "#67e8f9",
        "internal": true
      }
    ],
    "internal_structures": [
      {
        "name": "Thalamus",
        "thickness": "Egg-shaped dual nuclear mass",
        "description": "The central sensory relay station directing all sensory pathways (except olfaction) to corresponding cortical areas."
      },
      {
        "name": "Hypothalamus",
        "thickness": "Small ventral diencephalic nucleus",
        "description": "Master regulator of endocrine output, hunger, satiety, thirst, circadian rhythms, and core thermoregulation."
      },
      {
        "name": "Hippocampus",
        "thickness": "Elongated seahorse-shaped allocortex",
        "description": "Crucial limbic structure mediating declarative memory consolidation and spatial navigational cognitive mapping."
      }
    ],
    "terminology": [
      {
        "term": "Gray Matter",
        "definition": "Neuronal cell bodies, dendrites, and unmyelinated axons concentrated in the cerebral cortex and deep nuclei."
      },
      {
        "term": "White Matter",
        "definition": "Myelinated axonal tracts transmitting electrical impulses between brain regions."
      },
      {
        "term": "Synapse",
        "definition": "Specialized junction across which a neuron transmits chemical signals to another neuron or effector cell."
      },
      {
        "term": "Blood-Brain Barrier",
        "definition": "Selective semipermeable endothelial tight-junction barrier protecting neural tissue from toxins and circulating pathogens."
      }
    ],
    "fun_facts": [
      "Your brain generates roughly 12 to 25 watts of electricity\u2014enough to illuminate a low-wattage LED bulb.",
      "Information signals travel along myelinated sensory neurons at speeds exceeding 400 kilometers per hour.",
      "The brain itself has zero pain receptors (nociceptors); headaches arise from pain-sensitive meninges, scalp muscles, and vascular walls."
    ],
    "id": 2
  },
  {
    "slug": "lungs",
    "name": "Lungs & Bronchial Tree",
    "latin_name": "Pulmones",
    "system_slug": "respiratory",
    "description": "The paired primary organs of the respiratory system, occupying the pleural cavities of the thoracic cage. Highly elastic and spongy, the right lung has three lobes while the left lung has two lobes (accommodating the cardiac notch).",
    "location": "Thoracic cavity on either side of the heart, enclosed by visceral and parietal pleurae.",
    "primary_function": "Enables external respiration by diffusing oxygen from inhaled atmospheric air into pulmonary capillary blood while clearing carbon dioxide.",
    "physiology": "Inspiration is driven by diaphragmatic contraction flattening downward and external intercostals expanding the rib cage, creating negative intrapleural pressure (-4 to -8 mmHg) that expands alveolar sacs. Surfactant synthesized by Type II pneumocytes prevents alveolar collapse at end-expiration.",
    "clinical_relevance": "Asthma features bronchospasm and excessive mucus secretion; emphysema destroys alveolar elastance; pulmonary embolism blocks pulmonary arterial branches.",
    "blood_supply": "Deoxygenated blood via pulmonary arteries for gas exchange; bronchial arteries supply oxygenated systemic blood to bronchial wall tissues.",
    "innervation": "Pulmonary plexus via vagus nerve (bronchoconstriction) and sympathetic trunks (bronchodilation).",
    "weight_desc": "Right lung ~600 g; left lung ~500 g",
    "dimensions_desc": "Height ~25 cm, extending superiorly ~3 cm above the first rib into the root of the neck",
    "subcomponents": [
      {
        "id": "trachea",
        "name": "Trachea (Windpipe)",
        "latinName": "Trachea",
        "description": "Cartilaginous tube with 16-20 C-shaped hyaline rings maintaining luminal patency.",
        "function": "Conveys filtered, warmed, and humidified atmospheric air from the larynx to primary bronchi.",
        "explosionDir": [
          0.0,
          1.4,
          0.0
        ],
        "color": "#e2e8f0",
        "internal": false
      },
      {
        "id": "right_lung",
        "name": "Right Lung (3 Lobes)",
        "latinName": "Pulmo dexter",
        "description": "Larger, three-lobed lung: Superior, Middle, and Inferior lobes partitioned by horizontal and oblique fissures.",
        "function": "Carries out 55% of total pulmonary gas exchange.",
        "explosionDir": [
          1.4,
          0.0,
          0.2
        ],
        "color": "#f87171",
        "internal": false
      },
      {
        "id": "left_lung",
        "name": "Left Lung (2 Lobes)",
        "latinName": "Pulmo sinister",
        "description": "Two-lobed lung: Superior and Inferior lobes with a prominent cardiac notch accommodating the heart apex.",
        "function": "Carries out 45% of pulmonary gas exchange.",
        "explosionDir": [
          -1.4,
          0.0,
          0.2
        ],
        "color": "#fb7185",
        "internal": false
      },
      {
        "id": "bronchial_tree",
        "name": "Bronchial Tree",
        "latinName": "Arbor bronchialis",
        "description": "Branching arbor of primary, lobar, segmental, and subsegmental conducting airways.",
        "function": "Distributes air uniformly into all pulmonary segments down to terminal and respiratory bronchioles.",
        "explosionDir": [
          0.0,
          0.3,
          -0.4
        ],
        "color": "#38bdf8",
        "internal": true
      },
      {
        "id": "diaphragm",
        "name": "Diaphragm Muscle",
        "latinName": "Diaphragma",
        "description": "Dome-shaped musculotendinous sheet separating thoracic cavity from abdominal cavity.",
        "function": "The primary muscle of inspiration, responsible for 75% of resting respiratory volume change.",
        "explosionDir": [
          0.0,
          -1.3,
          0.0
        ],
        "color": "#e11d48",
        "internal": false
      }
    ],
    "internal_structures": [
      {
        "name": "Alveolar Sacs & Capillary Meshwork",
        "thickness": "0.2 - 0.5 micrometers",
        "description": "Over 300 million micro-sacs providing a combined internal surface area of 70 to 100 square meters for gas diffusion."
      },
      {
        "name": "Type II Pneumocytes & Surfactant",
        "thickness": "Cuboidal alveolar cells",
        "description": "Produce dipalmitoylphosphatidylcholine (DPPC) surfactant, lowering alveolar surface tension and preventing atelectasis."
      }
    ],
    "terminology": [
      {
        "term": "Tidal Volume",
        "definition": "The volume of air inhaled or exhaled with each normal quiet resting breath (~500 mL)."
      },
      {
        "term": "Vital Capacity",
        "definition": "The maximum volume of air that can be forcibly expired following maximum inhalation (~4.5 - 5.0 L)."
      },
      {
        "term": "Surfactant",
        "definition": "A lipoprotein complex secreted by type II alveolar cells that reduces surface tension in alveolar fluid."
      }
    ],
    "fun_facts": [
      "If unfolded and spread completely flat, the gas-exchange surface area of human alveoli would cover roughly half of a tennis court.",
      "The lungs are the only human organs that can actually float on water, thanks to residual air trapped within the alveoli.",
      "A person at rest takes approximately 12 to 20 breaths per minute, totaling over 20,000 breaths every day."
    ],
    "id": 3
  },
  {
    "slug": "kidneys",
    "name": "Kidneys & Urinary Tract",
    "latin_name": "Renes",
    "system_slug": "urinary",
    "description": "Paired bean-shaped retroperitoneal organs situated on the posterior abdominal wall on either side of the vertebral column. They filter approximately 180 liters of blood plasma daily, eliminating metabolic nitrogenous waste and precisely balancing fluid, electrolytes, and arterial blood pressure.",
    "location": "Retroperitoneal space between T12 and L3 vertebrae; right kidney is slightly lower due to the mass of the liver.",
    "primary_function": "Filters waste products from blood, regulates plasma osmolarity, electrolyte concentrations, and extracellular fluid volume, and synthesizes key endocrine hormones.",
    "physiology": "Blood enters via renal arteries and enters glomerular capillary beds. Hydrostatic pressure forces water and small solutes across the filtration barrier into Bowman's capsule. As filtrate traverses proximal tubules, loop of Henle, distal tubules, and collecting ducts, essential solutes (glucose, amino acids, Na+, HCO3-) are reabsorbed while drugs, H+, and K+ are secreted.",
    "clinical_relevance": "Acute kidney injury, diabetic nephropathy, glomerulonephritis, and renal cell carcinoma compromise glomerular filtration and systemic homeostasis.",
    "blood_supply": "Renal arteries receiving roughly 20-25% of resting cardiac output (~1.2 L/min).",
    "innervation": "Renal plexus derived from celiac plexus and abdominopelvic splanchnic nerves.",
    "weight_desc": "Each kidney weighs approximately 130 - 150 grams",
    "dimensions_desc": "11 cm long, 6 cm wide, and 3 cm thick",
    "subcomponents": [
      {
        "id": "renal_cortex",
        "name": "Renal Cortex",
        "latinName": "Cortex renalis",
        "description": "Continuous outer zone of reddish-brown renal parenchyma.",
        "function": "Houses renal corpuscles (glomeruli + Bowman's capsules) and proximal/distal convoluted tubules where primary ultrafiltration takes place.",
        "explosionDir": [
          0.0,
          0.6,
          0.8
        ],
        "color": "#f87171",
        "internal": false
      },
      {
        "id": "renal_medulla_pyramids",
        "name": "Renal Medulla & Pyramids",
        "latinName": "Medulla renalis",
        "description": "Inner striated zone organized into 8 to 18 conical renal pyramids.",
        "function": "Contains long loops of Henle and collecting ducts that establish hyperosmotic medullary gradients for urine concentration.",
        "explosionDir": [
          0.0,
          0.0,
          -0.6
        ],
        "color": "#dc2626",
        "internal": true
      },
      {
        "id": "renal_pelvis",
        "name": "Renal Pelvis & Calyces",
        "latinName": "Pelvis renalis",
        "description": "Funnel-shaped basin receiving urine from minor and major calyces.",
        "function": "Channels formed urine into the ureter via peristaltic smooth muscle contractions.",
        "explosionDir": [
          -1.1,
          -0.2,
          0.0
        ],
        "color": "#fde047",
        "internal": true
      },
      {
        "id": "ureter",
        "name": "Ureter",
        "latinName": "Ureter",
        "description": "Muscular duct descending retroperitoneally toward the urinary bladder.",
        "function": "Propels urine via active rhythmic peristalsis from the kidney to the urinary bladder.",
        "explosionDir": [
          -0.8,
          -1.4,
          0.0
        ],
        "color": "#fef08a",
        "internal": false
      },
      {
        "id": "renal_vessels",
        "name": "Renal Artery & Vein",
        "latinName": "Arteria et Vena renalis",
        "description": "High-volume blood vessels connecting the kidney to the aorta and IVC.",
        "function": "Supplies blood for continuous plasma filtration and returns cleared blood to systemic circulation.",
        "explosionDir": [
          -1.3,
          0.5,
          0.3
        ],
        "color": "#38bdf8",
        "internal": false
      }
    ],
    "internal_structures": [
      {
        "name": "Nephron Functional Units",
        "thickness": "Microscopic tubular structure",
        "description": "Over 1.25 million nephrons per kidney consisting of glomerulus, Bowman's capsule, proximal tubule, loop of Henle, and distal tubule."
      },
      {
        "name": "Juxtaglomerular Apparatus (JGA)",
        "thickness": "Cellular complex at vascular pole",
        "description": "Monitors distal tubular NaCl concentration via macula densa; secretes renin to trigger the renin-angiotensin-aldosterone axis."
      }
    ],
    "terminology": [
      {
        "term": "Glomerular Filtration Rate (GFR)",
        "definition": "The volume of fluid filtered from renal glomerular capillaries into Bowman's capsule per minute (normal ~90-120 mL/min/1.73m\u00b2)."
      },
      {
        "term": "Erythropoietin (EPO)",
        "definition": "Glycoprotein hormone secreted by renal interstitial fibroblasts that stimulates bone marrow erythrocyte production in hypoxia."
      }
    ],
    "fun_facts": [
      "Your kidneys filter your entire circulating blood volume roughly 30 to 40 times each day.",
      "Even if a person loses 75% of their total functional nephrons, the remaining nephrons can hypertrophy and sustain normal fluid balance."
    ],
    "id": 4
  },
  {
    "slug": "stomach",
    "name": "Stomach & Gastric Layers",
    "latin_name": "Gaster",
    "system_slug": "digestive",
    "description": "J-shaped muscular expansion of the gastrointestinal tract located between the esophagus and duodenum in the left upper quadrant. It stores food, secretes acid and enzymes, churns contents into acidic chyme, and regulates delivery to the small intestine.",
    "location": "Epigastric, umbilical, and left hypochondriac regions of the abdomen.",
    "primary_function": "Performs mechanical mastication and chemical digestion of ingested proteins via hydrochloric acid and pepsin.",
    "physiology": "Parietal cells secrete HCl via H+/K+ ATPase pumps, dropping gastric luminal pH to 1.5 - 2.0. Chief cells secrete pepsinogen, which acid-activates into pepsin. G cells secrete gastrin into circulation to stimulate acid secretion.",
    "clinical_relevance": "Peptic ulcer disease from Helicobacter pylori colonization or NSAID overuse; gastric adenocarcinoma; hiatus hernia.",
    "blood_supply": "Celiac trunk branches: left gastric, right gastric, right and left gastroepiploic, and short gastric arteries.",
    "innervation": "Parasympathetic via anterior and posterior vagal trunks; sympathetic via celiac plexus.",
    "weight_desc": "Empty stomach volume ~50 mL; expands to 1.5 - 2.0 liters postprandially",
    "dimensions_desc": "Length ~25 cm, width ~12 cm",
    "subcomponents": [
      {
        "id": "cardia_fundus",
        "name": "Cardia & Fundus",
        "latinName": "Cardia et Fundus gastricus",
        "description": "Superior dome-shaped region rising above the gastroesophageal junction.",
        "function": "Stores swallowed gas and acts as a reservoir for unmixed foodbolus.",
        "explosionDir": [
          0.3,
          1.2,
          -0.2
        ],
        "color": "#f87171",
        "internal": false
      },
      {
        "id": "gastric_body",
        "name": "Gastric Body",
        "latinName": "Corpus gastricum",
        "description": "Central largest region with prominent internal mucosal folds (rugae).",
        "function": "Chirns and mixes boluses with gastric juices to form liquid chyme.",
        "explosionDir": [
          -0.4,
          0.0,
          1.1
        ],
        "color": "#fb7185",
        "internal": false
      },
      {
        "id": "pylorus_antrum",
        "name": "Pyloric Antrum & Canal",
        "latinName": "Pylorus",
        "description": "Funnel-shaped muscular outflow tract ending at the pyloric sphincter.",
        "function": "Meters and regulates controlled delivery of chyme into the duodenum.",
        "explosionDir": [
          -1.2,
          -0.8,
          -0.3
        ],
        "color": "#e11d48",
        "internal": false
      },
      {
        "id": "gastric_rugae",
        "name": "Gastric Rugae (Internal)",
        "latinName": "Plicae gastricae",
        "description": "Longitudinal mucosal folds visible on the luminal stomach surface.",
        "function": "Allows great expansion of gastric volume without marked increases in intraluminal pressure.",
        "explosionDir": [
          0.0,
          0.0,
          0.0
        ],
        "color": "#fda4af",
        "internal": true
      }
    ],
    "internal_structures": [
      {
        "name": "Parietal & Chief Glands",
        "thickness": "Deep gastric pits",
        "description": "Parietal cells secrete HCl and intrinsic factor (critical for vitamin B12 absorption in the terminal ileum)."
      },
      {
        "name": "Muscularis Externa (Three Layers)",
        "thickness": "Outer longitudinal, middle circular, inner oblique",
        "description": "The unique third oblique layer allows vigorous three-dimensional churning."
      }
    ],
    "terminology": [
      {
        "term": "Chyme",
        "definition": "The semi-fluid pulpy mass of partly digested food expelled by the stomach into the duodenum."
      },
      {
        "term": "Intrinsic Factor",
        "definition": "A glycoprotein produced by parietal cells essential for vitamin B12 absorption in the ileum."
      }
    ],
    "fun_facts": [
      "The human stomach produces a brand-new layer of protective mucous epithelial lining every few days to avoid digesting itself.",
      "Hydrochloric acid in the stomach is concentrated enough that it could dissolve iron nails given enough exposure."
    ],
    "id": 5
  },
  {
    "slug": "liver",
    "name": "Liver & Gallbladder",
    "latin_name": "Hepar et Vesica biliaris",
    "system_slug": "digestive",
    "description": "The largest internal solid organ and metabolic factory of the human body, weighing approximately 1.5 kilograms. Situated in the right upper abdominal quadrant beneath the diaphragm, it performs over 500 distinct vital biochemical tasks.",
    "location": "Right hypochondriac and epigastric regions, protected by the lower thoracic ribcage.",
    "primary_function": "Synthesizes bile for lipid digestion, metabolizes carbohydrates, proteins, and lipids, detoxifies xenobiotics, and stores vitamins and glycogen.",
    "physiology": "Receives dual blood supply: oxygenated arterial blood via hepatic artery (25%) and nutrient-rich venous blood via hepatic portal vein (75%). Hepatocytes line hepatic sinusoids, processing absorbed nutrients before blood exits through central veins into hepatic veins and IVC.",
    "clinical_relevance": "Cirrhosis with portal hypertension and ascites; hepatitis A, B, and C viral infections; cholelithiasis (gallstones).",
    "blood_supply": "Hepatic portal vein (75%) and hepatic artery proper (25%).",
    "innervation": "Hepatic plexus arising from celiac plexus and anterior vagal trunk.",
    "weight_desc": "1.4 - 1.8 kilograms",
    "dimensions_desc": "20 - 22 cm transverse, 15 - 18 cm vertical",
    "subcomponents": [
      {
        "id": "right_lobe",
        "name": "Right Lobe",
        "latinName": "Lobus dexter hepatis",
        "description": "The dominant lobe accounting for roughly five-sixths of total liver volume.",
        "function": "Carries out massive metabolic conversion, glycogen storage, and albumin synthesis.",
        "explosionDir": [
          1.1,
          0.2,
          0.2
        ],
        "color": "#b45309",
        "internal": false
      },
      {
        "id": "left_lobe",
        "name": "Left Lobe",
        "latinName": "Lobus sinister hepatis",
        "description": "Smaller, flattened lobe extending across the epigastrium above the stomach.",
        "function": "Metabolizes nutrients and produces bile drains into left hepatic duct.",
        "explosionDir": [
          -1.1,
          0.3,
          0.1
        ],
        "color": "#92400e",
        "internal": false
      },
      {
        "id": "gallbladder",
        "name": "Gallbladder",
        "latinName": "Vesica biliaris / fellea",
        "description": "Pear-shaped sac nestled in the gallbladder fossa on the visceral liver surface.",
        "function": "Stores and concentrates bile up to ten-fold; contracts upon CCK stimulation to inject bile into the duodenum.",
        "explosionDir": [
          0.3,
          -1.2,
          0.7
        ],
        "color": "#16a34a",
        "internal": false
      },
      {
        "id": "portal_triad",
        "name": "Hepatic Portal Triad",
        "latinName": "Trias hepatica",
        "description": "Conduit bundle running within the hepatoduodenal ligament.",
        "function": "Carries hepatic portal vein, hepatic artery proper, and common bile duct.",
        "explosionDir": [
          0.0,
          -0.9,
          -0.4
        ],
        "color": "#0284c7",
        "internal": true
      }
    ],
    "internal_structures": [
      {
        "name": "Hepatic Lobules & Sinusoids",
        "thickness": "Hexagonal structural units",
        "description": "Thousands of microscopic lobules surrounded by portal triads, lined by fenestrated sinusoids and Kupffer resident macrophages."
      }
    ],
    "terminology": [
      {
        "term": "Bile",
        "definition": "A yellowish-green alkaline fluid containing bile acids, cholesterol, and bilirubin that emulsifies dietary fats."
      },
      {
        "term": "Kupffer Cells",
        "definition": "Specialized resident macrophages located in the liver sinusoids that engulf bacteria, debris, and senescent RBCs."
      }
    ],
    "fun_facts": [
      "The liver possesses the highest regenerative capability of any internal organ; if up to 70% is resected, it can regenerate back to full volume.",
      "At any given second, roughly 13% of your entire body's blood supply resides within the liver."
    ],
    "id": 6
  }
];
