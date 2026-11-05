import { BodySystemData } from "../types/anatomy";

export const SYSTEMS_DATA: BodySystemData[] = [
  {
    "slug": "cardiovascular",
    "name": "Cardiovascular System",
    "latin_name": "Systema cardiovasculare",
    "icon": "Heart",
    "short_desc": "Drives continuous blood circulation, delivering oxygen, hormones, and essential nutrients to every cell while clearing metabolic waste.",
    "full_overview": "The cardiovascular system comprises the heart, blood vessels (arteries, arterioles, capillaries, venules, and veins), and roughly 5 liters of circulating blood. Operating as a dual-circuit pump, the right heart drives deoxygenated blood to the pulmonary circulation for gas exchange, while the muscular left heart propels oxygenated blood through the high-pressure systemic circulation.",
    "key_functions": [
      "Continuous systemic and pulmonary blood transport",
      "Oxygen delivery and carbon dioxide elimination",
      "Nutrient transport (glucose, amino acids, fatty acids)",
      "Hormonal signaling and endocrine distribution",
      "Thermoregulation through cutaneous vasodilation/constriction",
      "Systemic pH balance and fluid homeostasis"
    ],
    "main_organs": [
      "Heart",
      "Aorta",
      "Superior Vena Cava",
      "Inferior Vena Cava",
      "Pulmonary Arteries",
      "Pulmonary Veins"
    ],
    "interrelationships": [
      {
        "system": "Respiratory System",
        "relationship": "Supplies oxygen to venous blood in alveolar capillaries and extracts carbon dioxide."
      },
      {
        "system": "Urinary System",
        "relationship": "Kidneys filter arterial blood, regulating plasma volume, electrolyte osmolarity, and renin-mediated blood pressure."
      },
      {
        "system": "Endocrine System",
        "relationship": "Circulates hormones from endocrine glands to distant target organ receptors."
      }
    ],
    "clinical_notes": [
      "Coronary Artery Disease (CAD): Atherosclerotic plaque narrowing of coronary arteries causing angina and myocardial infarction.",
      "Hypertension: Chronic arterial pressure exceeding 130/80 mmHg, increasing afterload and leading to left ventricular hypertrophy.",
      "Valvular Heart Disease: Stenosis or regurgitation of mitral or aortic valves impairing stroke volume."
    ],
    "learning_objectives": [
      "Trace the step-by-step pathway of blood through all four heart chambers and great vessels.",
      "Explain the difference between systemic high-pressure and pulmonary low-pressure circulations.",
      "Identify the anatomical landmarks of cardiac conduction: SA node, AV node, and Purkinje fibers."
    ],
    "id": 1
  },
  {
    "slug": "nervous",
    "name": "Nervous System",
    "latin_name": "Systema nervosum",
    "icon": "Brain",
    "short_desc": "The body's primary control and communication network, processing sensory input, driving motor commands, and enabling consciousness.",
    "full_overview": "The nervous system is divided anatomically into the Central Nervous System (CNS; brain and spinal cord) and Peripheral Nervous System (PNS; cranial and spinal nerves, autonomic ganglia). It operates via billions of neurons transmitting rapid electrochemical action potentials alongside glial support cells (astrocytes, oligodendrocytes, microglia, Schwann cells).",
    "key_functions": [
      "Sensory transduction from internal and external environments",
      "Cognitive integration, memory storage, and emotional processing",
      "Motor command generation for voluntary muscle contraction",
      "Autonomic regulation of heart rate, digestion, and respiration",
      "Homeostatic neuroendocrine feedback via the hypothalamus"
    ],
    "main_organs": [
      "Brain",
      "Spinal Cord",
      "Cerebrum",
      "Cerebellum",
      "Brainstem",
      "Peripheral Nerves"
    ],
    "interrelationships": [
      {
        "system": "Muscular System",
        "relationship": "Somatic motor neurons release acetylcholine at neuromuscular junctions to trigger muscle contraction."
      },
      {
        "system": "Endocrine System",
        "relationship": "The hypothalamus coordinates the pituitary gland, coupling neural input with systemic hormonal output."
      }
    ],
    "clinical_notes": [
      "Ischemic Stroke: Cerebrovascular occlusion depriving cortical neurons of oxygen and glucose.",
      "Multiple Sclerosis: Autoimmune demyelination of CNS axons slowing conduction velocity.",
      "Parkinson's Disease: Degeneration of dopaminergic neurons in the substantia nigra causing resting tremors and bradykinesia."
    ],
    "learning_objectives": [
      "Differentiate the functional roles of the frontal, parietal, temporal, and occipital cerebral lobes.",
      "Describe the anatomy of a spinal reflex arc.",
      "Contrast the fight-or-flight sympathetic division with the rest-and-digest parasympathetic division."
    ],
    "id": 2
  },
  {
    "slug": "skeletal",
    "name": "Skeletal System",
    "latin_name": "Systema skeletale",
    "icon": "Bone",
    "short_desc": "The architectural framework of 206 bones providing structural support, organ protection, mineral storage, and hematopoiesis.",
    "full_overview": "Comprising 206 distinct bones in the adult human, the skeleton is partitioned into the Axial Skeleton (80 bones: skull, vertebral column, thoracic rib cage) and the Appendicular Skeleton (126 bones: shoulder girdle, upper limbs, pelvic girdle, lower limbs). Bones are dynamic living tissues undergoing continuous osteoclast-mediated resorption and osteoblast-mediated remodeling.",
    "key_functions": [
      "Rigid framework supporting soft tissues and maintaining posture",
      "Mechanical protection for vital organs (brain in cranium, heart and lungs in thoracic cage)",
      "Biomechanical levers acted upon by skeletal muscles for locomotion",
      "Calcium and phosphate ion reservoir maintaining serum electrolyte levels",
      "Hematopoiesis: production of erythrocytes, leukocytes, and platelets within red bone marrow"
    ],
    "main_organs": [
      "Skull",
      "Vertebral Column",
      "Thoracic Cage",
      "Pelvis",
      "Femur",
      "Humerus"
    ],
    "interrelationships": [
      {
        "system": "Muscular System",
        "relationship": "Tendons insert into bone periosteum, converting muscular tension into joint rotation."
      },
      {
        "system": "Cardiovascular System",
        "relationship": "Red bone marrow generates all circulating blood cell lineages."
      }
    ],
    "clinical_notes": [
      "Osteoporosis: Age-related reduction in bone mineral density with elevated microarchitectural deterioration and fracture risk.",
      "Osteoarthritis: Degeneration of articular hyaline cartilage leading to bone-on-bone friction and osteophyte formation."
    ],
    "learning_objectives": [
      "Classify bones by geometry: long, short, flat, irregular, and sesamoid.",
      "Identify the cranial sutures and cranial fossae.",
      "Distinguish structural joint types: fibrous, cartilaginous, and synovial."
    ],
    "id": 3
  },
  {
    "slug": "muscular",
    "name": "Muscular System",
    "latin_name": "Systema musculare",
    "icon": "Activity",
    "short_desc": "More than 600 skeletal muscles generating contractile force for locomotion, posture, breathing, and thermal regulation.",
    "full_overview": "Skeletal muscles account for approximately 40% of adult body mass. Organized into bundles of multinucleated muscle fibers surrounded by epimysium, perimysium, and endomysium fascial layers, contraction occurs via the sliding filament theory where myosin cross-bridges pull actin filaments toward sarcomere M-lines upon calcium release from the sarcoplasmic reticulum.",
    "key_functions": [
      "Voluntary joint movement and locomotion",
      "Postural stability and core stabilization against gravity",
      "Joint stabilization via muscular tone around articular capsules",
      "Thermogenesis: shivering and resting metabolic heat generation",
      "Respiratory ventilation through diaphragmatic and intercostal contractions"
    ],
    "main_organs": [
      "Pectoralis Major",
      "Deltoid",
      "Biceps Brachii",
      "Quadriceps Femoris",
      "Gluteus Maximus",
      "Diaphragm"
    ],
    "interrelationships": [
      {
        "system": "Nervous System",
        "relationship": "Alpha motor neurons deliver action potentials initiating the excitation-contraction coupling cascade."
      },
      {
        "system": "Cardiovascular System",
        "relationship": "Muscular contraction requires immense capillary blood flow to supply oxygen and glucose."
      }
    ],
    "clinical_notes": [
      "Rhabdomyolysis: Rapid muscle breakdown releasing myoglobin into circulation, potentially precipitating acute renal failure.",
      "Muscular Dystrophy: Genetic deficiency of dystrophin causing progressive muscle fiber necrosis."
    ],
    "learning_objectives": [
      "Explain excitation-contraction coupling from acetylcholine release to cross-bridge cycling.",
      "Define agonist, antagonist, synergist, and fixator roles in joint kinematics.",
      "Locate origin, insertion, and action of key superficial muscle groups."
    ],
    "id": 4
  },
  {
    "slug": "respiratory",
    "name": "Respiratory System",
    "latin_name": "Systema respiratorium",
    "icon": "Wind",
    "short_desc": "Facilitates vital external gas exchange, oxygenating blood while expelling carbon dioxide, and supporting phonation and pH regulation.",
    "full_overview": "Consisting of the upper respiratory tract (nasal cavity, pharynx, larynx) and lower respiratory tract (trachea, primary bronchi, bronchial tree, alveolar ducts, and 300 million alveoli). Gas exchange occurs passively across the ultrathin 0.5-micrometer alveolar-capillary respiratory membrane via Fickian diffusion driven by partial pressure gradients.",
    "key_functions": [
      "Pulmonary ventilation (inspiration and expiration)",
      "External respiration: alveolar-capillary O2 and CO2 diffusion",
      "Vocalization and speech generation through vocal fold vibration",
      "Acid-base regulation via carbonic acid bicarbonate buffer modulation",
      "Inhaled pathogen trapping and mucociliary clearance"
    ],
    "main_organs": [
      "Lungs",
      "Trachea",
      "Bronchi",
      "Diaphragm",
      "Larynx",
      "Pharynx"
    ],
    "interrelationships": [
      {
        "system": "Cardiovascular System",
        "relationship": "The pulmonary trunk delivers deoxygenated blood directly to the alveolar capillaries."
      },
      {
        "system": "Nervous System",
        "relationship": "Medullary and pontine respiratory centers modulate respiratory rate in response to arterial PaCO2."
      }
    ],
    "clinical_notes": [
      "Chronic Obstructive Pulmonary Disease (COPD): Emphysematous alveolar destruction and chronic bronchitis causing air trapping.",
      "Pneumonia: Alveolar inflammation and exudate accumulation impairing gas diffusion."
    ],
    "learning_objectives": [
      "Diagram the branching pattern of the bronchial tree from trachea down to terminal bronchioles.",
      "Describe the biomechanics of negative pressure inspiration mediated by the diaphragm and external intercostals."
    ],
    "id": 5
  },
  {
    "slug": "digestive",
    "name": "Digestive System",
    "latin_name": "Systema digestorium",
    "icon": "Utensils",
    "short_desc": "Breaks down food mechanically and enzymatically, absorbs essential macro- and micronutrients, and eliminates indigestible waste.",
    "full_overview": "Spanning a continuous 9-meter gastrointestinal tract from oral cavity to anus, accompanied by accessory organs (salivary glands, liver, gallbladder, and pancreas). It coordinates mechanical breakdown, enzymatic hydrolysis, active/passive nutrient absorption across microvilli-dense intestinal epithelium, and fecal excretion.",
    "key_functions": [
      "Ingestion and mechanical mastication",
      "Enzymatic hydrolysis of carbohydrates, proteins, lipids, and nucleic acids",
      "Active and passive nutrient and electrolyte absorption across intestinal mucosa",
      "Bile synthesis for dietary lipid emulsification",
      "Host defense via gut-associated lymphoid tissue (GALT) and gastric acid"
    ],
    "main_organs": [
      "Stomach",
      "Small Intestine",
      "Large Intestine",
      "Liver",
      "Pancreas",
      "Esophagus"
    ],
    "interrelationships": [
      {
        "system": "Cardiovascular System",
        "relationship": "Hepatic portal vein routes absorbed water-soluble nutrients directly from gut to liver for processing."
      },
      {
        "system": "Endocrine System",
        "relationship": "Enteroendocrine cells release gastrin, secretin, and cholecystokinin (CCK) to regulate digestive secretions."
      }
    ],
    "clinical_notes": [
      "Gastroesophageal Reflux Disease (GERD): Incompetence of the lower esophageal sphincter leading to acid-induced mucosal erosion.",
      "Celiac Disease: Autoimmune villous atrophy in the small intestine triggered by dietary gluten."
    ],
    "learning_objectives": [
      "Identify the anatomical divisions of the stomach, small intestine, and large intestine.",
      "Explain the exocrine and endocrine functional duality of the pancreas."
    ],
    "id": 6
  },
  {
    "slug": "urinary",
    "name": "Urinary System",
    "latin_name": "Systema urinarium",
    "icon": "Droplet",
    "short_desc": "Filters circulating blood plasma, eliminates nitrogenous waste, regulates blood pressure, and preserves fluid-electrolyte equilibrium.",
    "full_overview": "Composed of paired kidneys, ureters, the urinary bladder, and the urethra. The functional units\u2014over 1 million nephrons per kidney\u2014execute continuous glomerular ultrafiltration, selective tubular reabsorption, and active tubular secretion, producing approximately 1.5 liters of urine daily while recycling 99% of filtered water and solutes.",
    "key_functions": [
      "Filtration of metabolic waste products including urea, uric acid, and creatinine",
      "Regulation of extracellular fluid volume and systemic arterial pressure",
      "Electrolyte concentration balance (Na+, K+, Ca2+, HCO3-, Cl-)",
      "Acid-base regulation via selective H+ excretion and bicarbonate reabsorption",
      "Endocrine secretion: erythropoietin (RBC production), calcitriol (vitamin D activation), and renin"
    ],
    "main_organs": [
      "Kidneys",
      "Ureters",
      "Urinary Bladder",
      "Urethra"
    ],
    "interrelationships": [
      {
        "system": "Cardiovascular System",
        "relationship": "Glomerular filtration depends directly upon renal perfusion pressure and mean arterial pressure."
      },
      {
        "system": "Endocrine System",
        "relationship": "Aldosterone and antidiuretic hormone (ADH) act on distal convoluted tubules and collecting ducts."
      }
    ],
    "clinical_notes": [
      "Chronic Kidney Disease (CKD): Progressive reduction in Glomerular Filtration Rate (GFR) leading to uremic toxin retention.",
      "Nephrolithiasis: Crystal precipitation in renal calyces or ureters causing acute flank pain and hematuria."
    ],
    "learning_objectives": [
      "Trace filtrate flow from Bowman's capsule through the nephron loop to the renal pelvis.",
      "Detail the countercurrent multiplier mechanism in the loop of Henle."
    ],
    "id": 7
  },
  {
    "slug": "endocrine",
    "name": "Endocrine System",
    "latin_name": "Systema endocrinum",
    "icon": "Zap",
    "short_desc": "Ductless glands releasing specialized hormones directly into systemic circulation to regulate long-term metabolic homeostasis.",
    "full_overview": "Unlike rapid electrical neural signaling, the endocrine system coordinates systemic metabolism, somatic growth, reproductive cycles, and stress adaptation via hormone secretion from the pituitary gland, thyroid, parathyroids, adrenals, pineal gland, and endocrine pancreas. Hormones bind high-affinity receptors on target cells to initiate intracellular signaling cascades.",
    "key_functions": [
      "Basal metabolic rate regulation (T3, T4)",
      "Serum glucose homeostasis (insulin and glucagon)",
      "Calcium and phosphate regulation (parathyroid hormone and calcitonin)",
      "Stress response orchestration (cortisol and epinephrine)",
      "Growth and cellular proliferation (growth hormone and IGF-1)"
    ],
    "main_organs": [
      "Pituitary Gland",
      "Hypothalamus",
      "Thyroid Gland",
      "Adrenal Glands",
      "Pancreas (Islets)",
      "Pineal Gland"
    ],
    "interrelationships": [
      {
        "system": "Nervous System",
        "relationship": "The hypothalamic-pituitary axis serves as the principal neuroendocrine interface."
      },
      {
        "system": "Skeletal System",
        "relationship": "Parathyroid hormone regulates osteoclast activity to release calcium into bloodstream."
      }
    ],
    "clinical_notes": [
      "Type 1 Diabetes Mellitus: Autoimmune destruction of pancreatic beta cells causing absolute insulin deficiency.",
      "Hypothyroidism: Insufficient thyroid hormone synthesis leading to fatigue, cold intolerance, and weight gain."
    ],
    "learning_objectives": [
      "Explain negative feedback loops controlling the hypothalamic-pituitary-adrenal (HPA) axis.",
      "Contrast steroid hormone lipid-soluble signaling with peptide hormone G-protein coupled cascades."
    ],
    "id": 8
  },
  {
    "slug": "lymphatic",
    "name": "Lymphatic System",
    "latin_name": "Systema lymphaticum",
    "icon": "Shield",
    "short_desc": "Returns extravasated interstitial fluid to venous circulation, transports dietary lipids, and orchestrates immune surveillance.",
    "full_overview": "A vast network of blind-ended lymphatic capillaries, collecting vessels, lymph nodes, the thoracic duct, and lymphoid organs (spleen, thymus, tonsils). It reclaims roughly 3 liters of interstitial fluid daily that filters out of blood capillaries, passing it through filtration nodes populated with lymphocytes and macrophages.",
    "key_functions": [
      "Drainage and return of interstitial tissue fluid to venous circulation",
      "Absorption and transportation of dietary fats via lacteals in intestinal villi",
      "Pathogen filtration and antigen presentation within lymph nodes",
      "Lymphocyte proliferation, maturation, and immune surveillance"
    ],
    "main_organs": [
      "Spleen",
      "Thymus",
      "Lymph Nodes",
      "Thoracic Duct",
      "Tonsils",
      "Bone Marrow"
    ],
    "interrelationships": [
      {
        "system": "Cardiovascular System",
        "relationship": "The thoracic duct discharges cleaned lymph directly into the left subclavian vein."
      },
      {
        "system": "Immune System",
        "relationship": "Provides structural microenvironments for B and T lymphocyte activation."
      }
    ],
    "clinical_notes": [
      "Lymphedema: Interruption of lymphatic drainage causing profound interstitial fluid accumulation and tissue swelling.",
      "Lymphoma: Malignant clonal proliferation of lymphocytes within nodal structures."
    ],
    "learning_objectives": [
      "Trace lymph flow from tissue capillary beds to the thoracic duct and venous angle.",
      "Differentiate primary lymphoid organs (bone marrow, thymus) from secondary lymphoid organs (nodes, spleen)."
    ],
    "id": 9
  },
  {
    "slug": "integumentary",
    "name": "Integumentary System",
    "latin_name": "Systema integumentarium",
    "icon": "Layers",
    "short_desc": "The body's protective outer boundary, consisting of skin, hair, nails, and glands that shield against trauma, pathogens, and dehydration.",
    "full_overview": "Forming the largest organ system by surface area and weight, the integument consists of the stratified squamous keratinized epidermis, the vascular dense irregular connective tissue dermis, and the underlying adipose hypodermis. It serves as an active barrier against ultraviolet radiation, microbial invasion, chemical abrasives, and desiccation.",
    "key_functions": [
      "Physical, chemical, and biological barrier protection",
      "Thermoregulation via sweat evaporation and arteriolar shunts",
      "Cutaneous sensation: tactile, vibration, pain, and temperature reception",
      "Photochemical synthesis of cholecalciferol (Vitamin D3 precursor)",
      "Water retention and prevention of excessive transepidermal water loss"
    ],
    "main_organs": [
      "Epidermis",
      "Dermis",
      "Hypodermis",
      "Sebaceous Glands",
      "Sweat Glands",
      "Hair Follicles"
    ],
    "interrelationships": [
      {
        "system": "Immune System",
        "relationship": "Epidermal Langerhans cells capture transcutaneous antigens and migrate to regional nodes."
      },
      {
        "system": "Nervous System",
        "relationship": "Meissner corpuscles, Pacinian corpuscles, and free nerve endings transmit sensory input."
      }
    ],
    "clinical_notes": [
      "Melanoma: Aggressive malignancy originating in epidermal melanocytes with high metastatic potential.",
      "Second- and Third-Degree Burns: Destruction of epidermal and dermal layers resulting in massive fluid loss and infection risk."
    ],
    "learning_objectives": [
      "Distinguish the five epidermal strata: basale, spinosum, granulosum, lucidum, and corneum.",
      "Explain how dermal eccrine sweating and arteriolar vasodilation lower core body temperature."
    ],
    "id": 10
  },
  {
    "slug": "reproductive",
    "name": "Reproductive System",
    "latin_name": "Systema reproductionis",
    "icon": "Users",
    "short_desc": "Specialized anatomical structures producing gametes and sex steroids to facilitate human procreation and perpetuate life.",
    "full_overview": "Encompassing the gonads (testes and ovaries), internal duct systems (vas deferens, fallopian tubes, uterus), and external genitalia. Driven by the hypothalamic-pituitary-gonadal (HPG) axis, it produces haploid spermatozoa and secondary oocytes, synthesizes androgens and estrogens/progestins, and in females accommodates gestation and parturition.",
    "key_functions": [
      "Gametogenesis: production of haploid sperm (spermatogenesis) and ova (oogenesis)",
      "Sex steroid secretion: testosterone, estradiol, and progesterone",
      "Copulation, fertilization site, and zygote transport",
      "Embryonic and fetal gestation and parturition (female)",
      "Lactation and postpartum neonatal nourishment"
    ],
    "main_organs": [
      "Testes",
      "Ovaries",
      "Uterus",
      "Fallopian Tubes",
      "Prostate",
      "Vas Deferens"
    ],
    "interrelationships": [
      {
        "system": "Endocrine System",
        "relationship": "LH and FSH pulses from the anterior pituitary govern follicular development and spermatogenesis."
      },
      {
        "system": "Urinary System",
        "relationship": "In males, the urethra serves as a shared conduit for both urine and seminal emission."
      }
    ],
    "clinical_notes": [
      "Endometriosis: Ectopic endometrial tissue outside the uterine cavity causing cyclic pelvic inflammation and pain.",
      "Benign Prostatic Hyperplasia (BPH): Age-dependent prostatic glandular enlargement compressing the prostatic urethra."
    ],
    "learning_objectives": [
      "Outline the ovarian and uterine cycles and their hormonal regulatory phases.",
      "Describe the route of spermatozoa from seminiferous tubules to ejaculation."
    ],
    "id": 11
  },
  {
    "slug": "immune",
    "name": "Immune System",
    "latin_name": "Systema immunitatis",
    "icon": "Award",
    "short_desc": "A multifaceted cellular and humoral defense matrix that identifies and neutralizes bacteria, viruses, parasites, and neoplastic cells.",
    "full_overview": "Operating seamlessly across the body through innate immunity (epithelial barriers, phagocytes, complement cascade, natural killer cells) and adaptive immunity (B cells producing antigen-specific antibodies, cytotoxic CD8+ T cells, and helper CD4+ T cells). It maintains strict self-tolerance while mounting targeted responses against non-self antigens.",
    "key_functions": [
      "Immediate innate defense against microbial invasion",
      "Antigen recognition, processing, and presentation via MHC class I and II",
      "Humoral immunity: antibody production and pathogen neutralization",
      "Cell-mediated cytotoxicity against virally infected and mutated cells",
      "Immunological memory providing rapid protective recall responses"
    ],
    "main_organs": [
      "Bone Marrow",
      "Thymus",
      "Spleen",
      "Lymph Nodes",
      "Tonsils",
      "GALT"
    ],
    "interrelationships": [
      {
        "system": "Cardiovascular System",
        "relationship": "Circulates leukocytes, immunoglobulins, and cytokines to infection foci."
      },
      {
        "system": "Integumentary System",
        "relationship": "Keratinized skin acts as the primary mechanical barrier against environmental pathogens."
      }
    ],
    "clinical_notes": [
      "Anaphylaxis: Immediate systemic type I hypersensitivity reaction driven by IgE-mediated mast cell degranulation.",
      "Autoimmune Disorders: Failure of central or peripheral tolerance leading to immune destruction of host tissues (e.g., SLE, RA)."
    ],
    "learning_objectives": [
      "Contrast innate rapid non-specific defenses with adaptive highly-targeted memory responses.",
      "Describe the role of major histocompatibility complex (MHC) in antigen presentation."
    ],
    "id": 12
  }
];
