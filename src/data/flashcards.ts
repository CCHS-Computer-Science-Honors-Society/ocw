import { db } from "@/server/db";
import { generateEmbedding } from "@/server/db/ai";
import { easyNoteCard } from "@/server/db/schema";

type Flashcard = {
  front: string;
  back: string;
};
const flashcards: Flashcard[] = [
  {
    front:
      "Organisms interact with their environments, exchanging matter and energy. For example, plant chloroplasts convert the energy of sunlight into A) the energy of motion B) carbon dioxide and water C) the potential energy of chemical bonds D) oxygen E) kinetic energy",
    back: "C",
  },
  {
    front:
      "The main source of energy for producers in an ecosystem is A) light energy B) kinetic energy C) thermal energy D) chemical energy E) ATP",
    back: "A",
  },
  {
    front:
      "Which of the following types of cells utilize deoxyribonucleic acid (DNA) as their genetic material but do not have their DNA encased within a nuclear envelope? A) animal B) plant C) archaea D) fungi E) protists",
    back: "C",
  },
  {
    front:
      "To understand the chemical basis of inheritance, we must understand the molecular structure of DNA. This is an example of the application of which concept to the study of biology? A) evolution B) emergent properties C) reductionism D) the cell theory E) feedback regulation",
    back: "C",
  },
  {
    front:
      "Once labor begins in childbirth, contractions increase in intensity and frequency until delivery. The increasing labor contractions of childbirth are an example of which type of regulation? A) a bioinformatic system B) positive feedback C) negative feedback D) feedback inhibition E) enzymatic catalysis",
    back: "B",
  },
  {
    front:
      "When the body's blood glucose level rises, the pancreas secretes insulin and, as a result, the blood glucose level declines. When the blood glucose level is low, the pancreas secretes glucagon and, as a result, the blood glucose level rises. Such regulation of the blood glucose level is the result of A) catalytic feedback B) positive feedback C) negative feedback D) bioinformatic regulation E) protein-protein interactions",
    back: "C",
  },
  {
    front:
      "Which branch of biology is concerned with the naming and classifying of organisms? A) informatics B) schematic biology C) taxonomy D) genomics E) evolution",
    back: "C",
  },
  {
    front:
      "Prokaryotic and eukaryotic cells generally have which of the following features in common? A) a membrane-bounded nucleus B) a cell wall made of cellulose C) ribosomes D) flagella or cilia that contain microtubules E) linear chromosomes made of DNA and protein",
    back: "C",
  },
  {
    front:
      "Prokaryotes are classified as belonging to two different domains. What are the domains? A) Bacteria and Eukarya B) Archaea and Monera C) Eukarya and Monera D) Bacteria and Protista E) Bacteria and Archaea",
    back: "E",
  },
  {
    front:
      "Global warming, as demonstrated by observations such as melting of glaciers, increasing CO2 levels, and increasing average ambient temperatures, has already had many effects on living organisms. Which of the following might best offer a solution to this problem? A) Continue to measure these and other parameters of the problem. B) Increase the abilities of animals to migrate to more suitable habitats. C) Do nothing; nature will attain its own balance. D) Limit the burning of fossil fuels and regulate our loss of forested areas. E) Recycle as much as possible.",
    back: "D",
  },
  {
    front:
      "A water sample from a hot thermal vent contained a single-celled organism that had a cell wall but lacked a nucleus. What is its most likely classification? A) Eukarya B) Archaea C) Animalia D) Protista E) Fungi",
    back: "B",
  },
  {
    front:
      "A filamentous organism has been isolated from decomposing organic matter. This organism has a cell wall but no chloroplasts. How would you classify this organism? A) domain Bacteria, kingdom Prokaryota B) domain Archaea, kingdom Bacteria C) domain Eukarya, kingdom Plantae D) domain Eukarya, kingdom Protista E) domain Eukarya, kingdom Fungi",
    back: "E",
  },
  {
    front:
      "Which of these provides evidence of the common ancestry of all life? A) ubiquitous use of catalysts by living systems B) near universality of the genetic code C) structure of the nucleus D) structure of cilia E) structure of chloroplasts",
    back: "B",
  },
  {
    front:
      "Which of the following is (are) true of natural selection? A) It requires genetic variation. B) It results in descent with modification. C) It involves differential reproductive success. D) It results in descent with modification and involves differential reproductive success. E) It requires genetic variation, results in descent with modification, and involves differential reproductive success.",
    back: "E",
  },
  {
    front:
      "Charles Darwin proposed a mechanism for descent with modification that stated that organisms of a particular species are adapted to their environment when they possess A) non-inheritable traits that enhance their survival in the local environment. B) non-inheritable traits that enhance their reproductive success in the local environment. C) non-inheritable traits that enhance their survival and reproductive success in the local environment. D) inheritable traits that enhance their survival and reproductive success in the local environment. E) inheritable traits that decrease their survival and reproductive success in the local environment.",
    back: "D",
  },
  {
    front:
      "Which of these individuals is likely to be most successful in an evolutionary sense? A) a reproductively sterile individual who never falls ill B) an organism that dies after five days of life but leaves 10 offspring, all of whom survive to reproduce C) a male who mates with 20 females and fathers one offspring D) an organism that lives 100 years and leaves two offspring, both of whom survive to reproduce E) a female who mates with 20 males and produces one offspring that lives to reproduce",
    back: "B",
  },
  {
    front:
      "In a hypothetical world, every 50 years people over 6 feet tall are eliminated from the population before they reproduce. Based on your knowledge of natural selection, you would predict that the average height of the human population will A) remain unchanged. B) gradually decline. C) rapidly decline. D) gradually increase. E) rapidly increase.",
    back: "B",
  },
  {
    front:
      "Through time, the lineage that led to modern whales shows a change from four-limbed land animals to aquatic animals with two limbs that function as flippers. This change is best explained by A) natural philosophy. B) creationism. C) the hierarchy of the biological organization of life. D) natural selection. E) feedback inhibition.",
    back: "D",
  },
  {
    front:
      "What is the major difference between a kingdom and a domain? A) A kingdom can include several subgroups known as domains. B) All eukarya belong to one domain. C) All prokaryotes belong to one domain. D) The importance of fungi has led scientists to make them the whole of one domain. E) Only organisms that produce their own food belong to one of the domains.",
    back: "B",
  },
  {
    front:
      "Which of the following best describes what occurred after the publication of Charles Darwin's On the Origin of Species? A) The book received little attention except from a small scientific community. B) The book was banned from schools. C) The book was widely discussed and disseminated. D) The book's authorship was disputed. E) The book was discredited by most scientists.",
    back: "C",
  },
  {
    front:
      "Why is Darwin considered original in his thinking? A) He provided examples of organisms that had evolved over time. B) He demonstrated that evolution is continuing to occur now. C) He described the relationship between genes and evolution. D) He proposed the mechanism that explained how evolution takes place. E) He observed that organisms produce large numbers of offspring.",
    back: "D",
  },
  {
    front:
      "Darwin's finches, collected from the Gal\u00e1pagos Islands, illustrate which of the following? A) mutation frequency B) ancestors from different regions C) adaptive radiation D) vestigial anatomic structures E) the accuracy of the fossil record",
    back: "C",
  },
  {
    front:
      "Which of the following categories of organisms is least likely to be revised? A) kingdom B) class C) order D) phylum E) species",
    back: "E",
  },
  {
    front:
      "What is the major distinguishing characteristic of fungi? A) gaining nutrition through ingestion B) being sedentary C) being prokaryotic D) absorbing dissolved nutrients E) being decomposers of dead organisms",
    back: "D",
  },
  {
    front:
      "What are archaea? A) Prokaryotes characterized as extremophiles that share some bacterial and some eukaryotic traits. B) Organisms that are adapted to high temperature environments, such as in volcanic springs. C) Single-celled organisms that are killed by the application of antibiotics at certain concentrations. D) Bacteria-like organisms that can live only in extreme salt environments. E) Primitive protist-like creatures possessing fewer than two chromosomes per cell.",
    back: "A",
  },
  {
    front:
      "According to Darwinian theory, which of the following exhibits the greatest fitness for evolutionary success? A) the species with the longest life B) the individuals within a population that have the greatest reproductive success C) the phylum with members that occupy the greatest number of habitats D) the community of organisms that is capable of living in the most nutrient-poor biome E) the organism that produces its own nutrients most efficiently",
    back: "B",
  },
  {
    front:
      "Similarities and differences among/between life-forms over time are most efficiently recorded by scientists in which field(s) of study? A) paleontology B) paleontology and anatomy C) paleontology, anatomy, and taxonomy D) paleontology, anatomy, taxonomy, and genetics E) paleontology, anatomy, taxonomy, genetics, and ecology",
    back: "E",
  },
  {
    front:
      "Why is the theme of evolution considered to be the core theme of biology by biologists? A) It provides a framework within which all biological investigation makes sense. B) It is recognized as the core theme of biology by organizations such as the National Science Foundation. C) Controversy about this theory provides a basis for a great deal of experimental research. D) Since it cannot be proven, biologists will be able to study evolutionary possibilities for many years. E) Biologists do not subscribe to alternative models.",
    back: "A",
  },
  {
    front:
      "The method of scientific inquiry that describes natural structures and processes as accurately as possible through careful observation and the analysis of data is known as A) hypothesis-based science. B) discovery science. C) experimental science. D) quantitative science. E) qualitative science.",
    back: "B",
  },
  {
    front:
      "Collecting data based on observation is an example of ________; analyzing this data to reach a conclusion is an example of ________ reasoning. A) hypothesis-based science; inductive B) the process of science; deductive C) discovery science; inductive D) descriptive science; deductive E) hypothesis-based science; deductive",
    back: "C",
  },
  {
    front:
      "When applying the process of science, which of these is tested? A) a question B) a result C) an observation D) a prediction E) a hypothesis",
    back: "D",
  },
  {
    front:
      "A controlled experiment is one in which A) the experiment is repeated many times to ensure that the results are accurate. B) the experiment proceeds at a slow pace to guarantee that the scientist can carefully observe all reactions and process all experimental data. C) there are at least two groups, one of which does not receive the experimental treatment. D) there are at least two groups, one differing from the other by two or more variables. E) there is one group for which the scientist controls all variables.",
    back: "C",
  },
  {
    front:
      'Why is it important that an experiment include a control group? A) The control group is the group that the researcher is in control of, the group in which the researcher predetermines the results. B) The control group provides a reserve of experimental subjects. C) A control group is required for the development of an "If\u2026then" statement. D) A control group assures that an experiment will be repeatable. E) Without a control group, there is no basis for knowing if a particular result is due to the variable being tested.',
    back: "E",
  },
  {
    front:
      "The application of scientific knowledge for some specific purpose is known as A) technology. B) deductive science. C) inductive science. D) anthropologic science. E) pure science.",
    back: "A",
  },
  {
    front:
      "Which of the following are qualities of any good scientific hypothesis? I. It is testable. II. It is falsifiable. III. It produces quantitative data. IV. It produces results that can be replicated. A) I only B) II only C) III only D) I and II E) III and IV",
    back: "D",
  },
  {
    front:
      'When a hypothesis cannot be written in an "If\u2026then" format, what does this mean? A) It does not represent deductive reasoning. B) It cannot be a scientific hypothesis. C) The subject cannot be explored scientifically. D) The hypothesizer does not have sufficient information. E) It cannot be testable.',
    back: "A",
  },
  {
    front:
      'In presenting data that result from an experiment, a group of students show that most of their measurements fall on a straight diagonal line on their graph. However, two of their data points are "outliers" and fall far to one side of the expected relationship. What should they do? A) Do not show these points but write a footnote that the graph represents the correct data. B) Average several trials and therefore rule out the improbable results. C) Show all results obtained and then try to explore the reason(s) for these outliers. D) Throw out this set of data and try again. E) Change the details of the experiment until they can obtain the expected results.',
    back: "C",
  },
  {
    front:
      "Which of the following is the best description of a control for an experiment? A) The control group is kept in an unchanging environment. B) The control is left alone by the experimenters. C) The control group is matched with the experimental group except for the one experimental variable. D) The control group is exposed to only one variable rather than several. E) Only the experimental group is tested or measured.",
    back: "C",
  },
  {
    front:
      "Given the cooperativity of science, which of the following is most likely to result in an investigator being intellectually looked down upon by other scientists? A) Making money as the result of studies in which a new medication is discovered. B) Doing meticulous experiments that show data that contradict what has been previously reported by the scientific community. C) Spending most of a lifetime investigating a small and seemingly unimportant organism. D) Getting negative results from the same set of experiments. E) Being found to have falsified or created data to better fit a hypothesis.",
    back: "E",
  },
  {
    front:
      "Which of these is an example of inductive reasoning? A) Hundreds of individuals of a species have been observed and all are photosynthetic; therefore, the species is photosynthetic. B) These organisms live in sunny parts of this area so they are able to photosynthesize. C) If horses are always found grazing on grass, they can be only herbivores and not omnivores. D) If protists are all single-celled, then they are incapable of aggregating. E) If two species are members of the same genus, they are more alike than each of them could be to a different genus.",
    back: "A",
  },
  {
    front:
      "In a high school laboratory, which of the following constitutes an experiment? I. learning to use a microscope by examining fixed specimens on slides II. being able to examine swimming protists under a microscope III. extracting pigments from plant leaves and separating the types of pigments for identification IV. preparing root tips for examination by staining them A) I only B) II only C) III only D) II and III only E) II, III, and IV",
    back: "C",
  },
  {
    front:
      "Which of the following best describes a model organism? A) It is often pictured in textbooks and easy for students to imagine. B) It lends itself to many studies that are useful to beginning students. C) It is well studied, easy to grow, and results are widely applicable. D) It is small, inexpensive to raise, and lives a long time. E) It has been chosen for study by the earliest biologists.",
    back: "C",
  },
  {
    front:
      "Why is a scientific topic best discussed by people of varying points of view, a variety of subdisciplines, and diverse cultures? A) They can rectify each other's approach to make it truly scientific. B) Robust and critical discussion between diverse groups improves scientific thinking. C) Scientists can explain to others that they need to work in isolation to utilize the scientific method more productively. D) This is another way of making science more reproducible. E) Scientists need to exchange their ideas with other disciplines and cultures so that all groups are in consensus with the course of future research.",
    back: "B",
  },
  {
    front:
      "The illustration above most probably represents A) a computer simulation of the structure of a eukaryotic cell. B) a map of a network of protein interactions within a eukaryotic cell. C) an inventory of all the genes in a fruit fly. D) an X-ray diffraction image of the nucleus and cytoplasm of a eukaryotic cell. E) a computer-generated map of the interaction of genes and cytoplasm in a prokaryotic cell.",
    back: "B",
  },
  {
    front:
      "What do these two plants have in common? A) adaptations to extreme heat B) adaptations to conserve water C) identical stem structures D) identical flower structures E) lack of photosynthesis",
    back: "B",
  },
  {
    front:
      "Use the following information to answer questions 47 - 50.  Golden algae are a group of protists whose color is due to carotenoid pigments: yellow and brown. Most have two flagella and all are photosynthetic. A group of students was given a significant sample of one of these (Dinobryon) that is colonial. Their instructions for the project were to design two or more experiments that could be done with these organisms.  Since these organisms are protists, which of these characteristics could the students assume to be true? A) The organisms are photosynthetic. B) All of them are marine. C) They are single-celled. D) They lack membrane-bound organelles. E) Each has a single circular molecule of DNA.",
    back: "A",
  },
  {
    front:
      "The students decide that for one of their experiments, they want to see whether the organisms can photosynthesize. Which of the following is the best hypothesis? A) If the Dinobryon can live > 5 days without added food, they must be able to photosynthesize. B) If the Dinobryon can live without exposure to light for > 5 days, they must be able to photosynthesize. C) If the Dinobryon photosynthesize, they must need no other minerals or nutrients and will be able to live in distilled water and light alone. D) If the Dinobryon are kept in the dark, one-half will be expected to die in 5 days. E) If the Dinobryon are able to photosynthesize, the students should be able to extract photosynthetic pigments.",
    back: "E",
  },
  {
    front:
      "For their second experiment, the students want to know whether the Dinobryon have to live in colonies or can be free living. How might they proceed? A) Observe each day to see whether new organisms are ever reproduced as single cells. B) Observe whether only specialized cells are able to divide to produce new colonies. C) Divide a sample into single cells and measure the length of time they remain this way. D) Divide a sample into single cells and observe them. E) Divide a sample into single cells and see whether they come back together.",
    back: "C",
  },
  {
    front:
      "The students plan to gather data from the project. Which of the following would be the best way to present what they gather from experimental groups as opposed to controls? A) qualitatively, noting color, size, and so on B) measuring the number of new colonies formed during every 12-hour period C) counting the number of new colonies after a week D) measuring the size of each new colony in millimeters (mm) of length E) measuring the dry weight of all new colonies in grams",
    back: "B",
  },
  {
    front:
      "The following is a list of biology themes discussed in Chapter 1. Use them to answer questions 51 - 54.  I. New properties emerge at each level in the biological hierarchy. II. Organisms interact with other organisms and the physical environment. III. Life requires energy transfer and transformation. IV. Structure and function are correlated at all levels of biological organization. V. Cells are an organism's basic units of structure and function. VI. The continuity of life is based on heritable information in the form of DNA. VII. Feedback mechanisms regulate biological systems. VIII. Evolution accounts for the unity and diversity of life.  Which theme(s) is/are best illustrated by an experiment in which a biologist seeks a medication that will inhibit pain responses in a cancer patient? A) II B) VII C) III and V D) V and VIII E) VI and VII",
    back: "B",
  },
  {
    front:
      "Which theme(s) is/are best illustrated by a group of investigators who are trying to classify and explain the ecology of an area known as the Big Thicket? A) I only B) II only C) VIII only D) IV and VI E) I and II",
    back: "E",
  },
  {
    front:
      "Which theme(s) is/are illustrated when a group of students is trying to establish which phase of cell division in root tips happens most quickly? A) IV only B) V only C) VII only D) IV, V, and VI E) V, VI, and VII",
    back: "D",
  },
  {
    front:
      "Which theme(s) is/are illustrated when a biology class is comparing the rates of photosynthesis between leaves of a flowering plant species (Gerbera jamesonii) and a species of fern (Polypodium polypodioides)? A) I only B) II only C) I and III D) I and VII E) I, III, and V",
    back: "E",
  },
  {
    front:
      'Questions 55 - 64 are from the end-of-chapter "Test Your Understanding" section in Chapter 1 of the textbook.  All the organisms on your campus make up A) an ecosystem. B) a community. C) a population. D) an experimental group. E) a taxonomic domain.',
    back: "B",
  },
  {
    front:
      "Which of the following is a correct sequence of levels in life's hierarchy, proceeding downward from an individual animal? A) brain, organ system, nerve cell, nervous tissue B) organ system, nervous tissue, brain C) organism, organ system, tissue, cell, organ D) nervous system, brain, nervous tissue, nerve cell E) organ system, tissue, molecule, cell",
    back: "D",
  },
  {
    front:
      "Which of the following is not an observation or inference on which Darwin's theory of natural selection is based? A) Poorly adapted individuals never produce offspring. B) There is heritable variation among individuals. C) Because of overproduction of offspring, there is competition for limited resources. D) Individuals whose inherited characteristics best fit them to the environment will generally produce more offspring. E) A population can become adapted to its environment over time.",
    back: "A",
  },
  {
    front:
      "Systems biology is mainly an attempt to A) analyze genomes from different species. B) simplify complex problems by reducing the system into smaller, less complex units. C) understand the behavior of entire biological systems. D) build high-throughput machines for the rapid acquisition of biological data. E) speed up the technological application of scientific knowledge.",
    back: "C",
  },
  {
    front:
      "Protists and bacteria are grouped into different domains because A) protists eat bacteria. B) bacteria are not made of cells. C) protists have a membrane-bounded nucleus, which bacterial cells lack. D) bacteria decompose protists. E) protists are photosynthetic.",
    back: "C",
  },
  {
    front:
      "Which of the following best demonstrates the unity among all organisms? A) matching DNA nucleotide sequences B) descent with modification C) the structure and function of DNA D) natural selection E) emergent properties",
    back: "C",
  },
  {
    front:
      "A controlled experiment is one that A) proceeds slowly enough that a scientist can make careful records of the results. B) tests experimental and control groups in parallel. C) is repeated many times to make sure the results are accurate. D) keeps all variables constant. E) is supervised by an experienced scientist.",
    back: "B",
  },
  {
    front:
      "Which of the following statements best distinguishes hypotheses from theories in science? A) Theories are hypotheses that have been proved. B) Hypotheses are guesses; theories are correct answers. C) Hypotheses usually are relatively narrow in scope; theories have broad explanatory power. D) Hypotheses and theories are essentially the same thing. E) Theories are proved true; hypotheses are often falsified.",
    back: "C",
  },
  {
    front:
      "Which of the following is an example of qualitative data? A) The temperature decreased from 20\u00b0C to 15\u00b0C. B) The plant's height is 25 centimeters (cm). C) The fish swam in a zigzag motion. D) The six pairs of robins hatched an average of three chicks. E) The contents of the stomach are mixed every 20 seconds.",
    back: "C",
  },
  {
    front:
      "Which of the following best describes the logic of scientific inquiry? A) If I generate a testable hypothesis, tests and observations will support it. B) If my prediction is correct, it will lead to a testable hypothesis. C) If my observations are accurate, they will support my hypothesis. D) If my hypothesis is correct, I can expect certain test results. E) If my experiments are set up right, they will lead to a testable hypothesis.",
    back: "D",
  },
  {
    front:
      "1) A female cat in heat urinates more often and in many places. Male cats are attracted to the urine deposits. Which of the following is a proximate cause of this increased urination? A) It announces to the males that she is in heat. B) Female cats that did this in the past attracted more males. C) It is a result of hormonal changes associated with her reproductive cycle. D) The female cat learned the behavior from observing other cats. E) All of the options are ultimate causes of behavior.",
    back: "C",
  },
  {
    front:
      "2) A female cat in heat urinates more often and in many places. Male cats congregate near the urine deposits and fight with each other. Which of the following would be an ultimate cause of the male cats' response to the female's urinating behavior? A) The males have learned to recognize the specific odor of the urine of a female in heat. B) When the males smelled the odor, various neurons in their brains were stimulated. C) Responding to the odor means locating reproductively receptive females. D) Male cats' hormones are triggered by the odor released by the female. E) The odor serves as a releaser for the instinctive behavior of the males.",
    back: "C",
  },
  {
    front:
      "3) Which of the following examples describes a behavioral pattern that results from a proximate cause? A) A cat kills a mouse to obtain nutrition. B) A male sheep fights with another male because it helps to improve its social position. C) A female bird lays its eggs because the amount of daylight is decreasing slightly each day. D) A goose squats and freezes motionless to escape a predator. E) A cockroach runs into a crack in the wall and avoids being stepped on.",
    back: "C",
  },
  {
    front:
      "4) The proximate causes of behavior are interactions with the environment, but behavior is ultimately shaped by A) hormones. B) evolution. C) sexuality. D) pheromones. E) the nervous system.",
    back: "B",
  },
  {
    front:
      "5) Animal communication involves what type of sensory information? A) visual B) auditory C) olfactory D) tactile E) visual, auditory, olfactory, and tactile",
    back: "E",
  },
  {
    front:
      "6) What type of signal is long-lasting and works at night? A) olfactory B) visual C) auditory D) tactile E) electrical",
    back: "A",
  },
  {
    front:
      "7) What type of signal is brief and can work among obstructions at night? A) olfactory B) visual C) auditory D) tactile E) magnetic",
    back: "C",
  },
  {
    front:
      "8) What type of signal is fast and requires daylight with no obstructions? A) olfactory B) visual C) auditory D) tactile E) electrical",
    back: "B",
  },
  {
    front:
      "9) A chemical produced by an animal that serves as a communication to another animal of the same species is called A) a sign stimulus. B) an inducer. C) a pheromone. D) an imprinter. E) an agonistic promoter.",
    back: "C",
  },
  {
    front:
      "10) Research has shown that nocturnal animals navigate using A) olfactory cues. B) the North Star. C) the moon. D) landmarks. E) gravity.",
    back: "B",
  },
  {
    front:
      "11) Circannual rhythms in birds are influenced by A) periods of food availability. B) reproductive readiness. C) periods of daylight and darkness. D) magnetic fields. E) lunar cycles.",
    back: "C",
  },
  {
    front:
      "12) Upon returning to its hive, a European honeybee communicates to other worker bees the location of a nearby food source it has discovered by A) vibrating its wings at varying frequencies. B) performing a round dance. C) performing a waggle dance. D) visual cues. E) All options are correct.",
    back: "B",
  },
  {
    front:
      "13) Karl von Frisch demonstrated that European honeybees communicate the location of a distant food source by A) performing a short, straight run during a waggle dance. B) performing a long, straight run during a waggle dance. C) performing a round dance with fast rotations. D) emanating minute amounts of stimulus pheromone. E) varying wing vibration frequency.",
    back: "B",
  },
  {
    front:
      "14) Animals use pheromones to communicate A) reproductive readiness. B) species recognition. C) gender recognition. D) danger. E) All options are correct.",
    back: "E",
  },
  {
    front:
      "15) Displays of nocturnal mammals are usually A) visual and auditory. B) tactile and visual. C) olfactory and auditory. D) visual and olfactory. E) tactile and auditory.",
    back: "C",
  },
  {
    front:
      "Listed below are several examples of types of animal behavior. Match the letter of the correct term (A-E) to each example in the following question.  A. operant conditioning B. agonistic behavior C. innate behavior D. imprinting E. altruistic behavior  16) Through trial and error, a rat learns to run a maze without mistakes to receive a food reward. A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "Listed below are several examples of types of animal behavior. Match the letter of the correct term (A-E) to each example in the following question.  A. operant conditioning B. agonistic behavior C. innate behavior D. imprinting E. altruistic behavior  17) A human baby performs a sucking behavior perfectly when it is put in the presence of the nipple of its mother's breast. A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "Listed below are several examples of types of animal behavior. Match the letter of the correct term (A-E) to each example in the following question.  A. operant conditioning B. agonistic behavior C. innate behavior D. imprinting E. altruistic behavior  18) A mother goat can recognize its own kid by smell. A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "Listed below are several examples of types of animal behavior. Match the letter of the correct term (A-E) to each example in the following question.  A. operant conditioning B. agonistic behavior C. innate behavior D. imprinting E. altruistic behavior  19) Upon observing a golden eagle flying overhead, a sentry prairie dog gives a warning call to other foraging members of the prairie dog community. A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "20) A cage containing male mosquitoes has a small earphone placed on top, through which the sound of a female mosquito is played. All the males immediately fly to the earphone and go through all of the steps of copulation. What is the best explanation for this behavior? A) The males learn to associate the sound with females. B) Copulation is a fixed action pattern, and the female flight sound is a sign stimulus that initiates it. C) The sound from the earphone irritates the male mosquitoes, causing them to attempt to sting it. D) The reproductive drive is so strong that when males are deprived of females, they will attempt to mate with anything that has even the slightest female characteristic. E) Through classical conditioning, the male mosquitoes have associated the inappropriate stimulus from the earphone with the normal response of copulation.",
    back: "B",
  },
  {
    front:
      "21) If mayflies lay eggs on roads instead of in water, it would indicate which of the following? A) a defective gene B) trial-and-error learning C) a misdirected response to a sign stimulus D) a natural behavioral variation in the mayfly population E) aberrant behavior due to insecticide poisoning",
    back: "C",
  },
  {
    front:
      "22) Which of the following is true about imprinting? A) It may be triggered by visual or chemical stimuli. B) It happens to many adult animals, but not to their young. C) It is a type of learning that does not involve innate behavior. D) It occurs only in birds. E) It causes behaviors that last for only a short time (the sensitive period).",
    back: "A",
  },
  {
    front:
      "23) A type of learning that can occur only during a brief period of early life and results in a behavior that is difficult to modify through later experiences is called A) insight. B) imprinting. C) habituation. D) operant conditioning. E) trial-and-error learning.",
    back: "B",
  },
  {
    front:
      "24) Learning in which an associated stimulus may be used to elicit the same behavioral response as the original sign stimulus is called A) concept formation. B) trial and error. C) classical conditioning. D) operant conditioning. E) cognition.",
    back: "C",
  },
  {
    front:
      "25) Every morning at the same time, John went into the den to feed his new tropical fish. After a few weeks, he noticed that the fish swam to the top of the tank when he entered the room. This is an example of A) cognition. B) imprinting. C) classical conditioning. D) operant conditioning. E) maturation.",
    back: "C",
  },
  {
    front:
      "26) A type of bird similar to a chickadee learns to peck through the cardboard tops of milk bottles left on doorsteps to obtain the desired cream from the top. What term best applies to this behavior? A) sign stimulus B) cognition C) imprinting D) classical conditioning E) operant conditioning",
    back: "E",
  },
  {
    front:
      "27) A salmon returns to its home stream to spawn. What term best applies to this behavior? A) sign stimulus B) cognition C) imprinting D) classical conditioning E) operant conditioning",
    back: "C",
  },
  {
    front:
      "28) A stickleback fish will attack a fish model as long as the model has red coloring. What animal behavior idea is manifested by this observation? A) sign stimulus B) cognition C) imprinting D) classical conditioning E) operant conditioning",
    back: "A",
  },
  {
    front:
      "29) Parental protective behavior in turkeys is triggered by the cheeping sound of young chicks. What term best applies to this behavior? A) sign stimulus B) cognition C) imprinting D) classical conditioning E) operant conditioning",
    back: "A",
  },
  {
    front:
      "30) A guinea pig loves the lettuce kept in the refrigerator and squeals each time the refrigerator door opens. What term best applies to this behavior? A) sign stimulus B) cognition C) imprinting D) classical conditioning E) operant conditioning",
    back: "D",
  },
  {
    front:
      "31) Classical conditioning and operant conditioning differ in that A) classical conditioning takes longer. B) operant conditioning usually involves more intelligence. C) operant conditioning involves consequences for the animal's behavior. D) classical conditioning is restricted to mammals and birds. E) classical conditioning is much more useful for training domestic animals.",
    back: "C",
  },
  {
    front:
      "32) Some dogs love attention, and Frodo the beagle learns that if he barks, he gets attention. Which of the following might you use to describe this behavior? A) The dog is displaying an instinctive fixed action pattern. B) The dog is performing a social behavior. C) The dog is trying to protect its territory. D) The dog has been classically conditioned. E) The dog's behavior is a result of operant conditioning.",
    back: "E",
  },
  {
    front:
      '33) Among songbirds, a "crystallized" song is one that A) is beyond the range of human hearing. B) is perfected by juveniles. C) extremely young chicks sing. D) is a perfected species-specific song. E) warns of predators.',
    back: "D",
  },
  {
    front:
      "34) What is the normal imprinting stimulus to a hatchling graylag goose? A) an image of a model of an adult graylag goose B) a nearby object that is moving away C) recognition of its biological mother D) any other adult of its own species E) any human",
    back: "B",
  },
  {
    front:
      '35) Scientists have tried raising endangered whooping cranes in captivity by using sandhill cranes as foster parents. This strategy is no longer used because A) fostered whooping crane chicks did not develop the necessary cues for migration. B) the fostered whooping cranes\' critical period was variable such that different chicks imprinted on different "mothers." C) sandhill crane parents rejected their fostered whooping crane chicks soon after incubation. D) none of the fostered whooping cranes formed a mating pair-bond with another whooping crane. E) sandhill crane parents did not properly incubate whooping crane eggs.',
    back: "D",
  },
  {
    front:
      "36) Which of the following shows the adaptive significance of cognitive mapping to animals that employ this type of learning? A) It increases the ability to visually recognize landmarks. B) Cognitive maps reduce the amount of detail required to remember the location of an object in the animal's environment. C) Animals can locate essential locations in their environment, such as nests, hazards, and feeding areas. D) Animals can outmaneuver predators by planning and memorizing getaway routes. E) Animals can determine their position relative to landmarks by a triangulation process.",
    back: "B",
  },
  {
    front:
      '37) White-crowned sparrows can only learn the "crystallized" song for their species by A) listening to adult sparrow songs during a sensitive period as a fledgling, followed by a practice period until the juvenile matches its melody to its memorized fledgling song. B) listening to the song of its own species during a critical period so that it will imprint to its own species song and not the songs of other songbird species. C) practicing as a fledgling until the innate species-specific song becomes perfected. D) performing the crystallized song as adults when they become sexually mature, as the song is programmed into the innate behavior for the species. E) observing and practicing after receiving social confirmation from other adults at a critical period during their first episode of courtship behavior.',
    back: "A",
  },
  {
    front:
      "38) Imagine that you are designing an experiment aimed at determining whether the initiation of migratory behavior is largely under genetic control. Of the following options, the best way to proceed is to A) observe genetically distinct populations in the field and see if they have different migratory habits. B) perform within-population matings with birds from different populations that have different migratory habits. Do this in the laboratory and see if offspring display parental migratory behavior. C) bring animals into the laboratory and determine the conditions under which they become restless and attempt to migrate. D) perform within-population matings with birds from different populations that have different migratory habits. Rear the offspring in the absence of their parents and observe the migratory behavior of offspring. E) All of the options are equally productive ways to approach the question.",
    back: "D",
  },
  {
    front:
      "39) What probably explains why coastal and inland garter snakes react differently to banana slug prey? A) Ancestors of coastal snakes that could eat the abundant banana slugs had increased fitness. No such selection occurred inland, where banana slugs were absent. B) Banana slugs are camouflaged, and inland snakes, which have poorer vision than coastal snakes, are less able to see them. C) Garter snakes learn about prey from other garter snakes. Inland garter snakes have fewer types of prey because they are less social. D) Inland banana slugs are distasteful, so inland snakes learn to avoid them. Coastal banana slugs are palatable to garter snakes. E) Garter snakes learn to eat what their mother eats. Coastal snake mothers happened to prefer slugs.",
    back: "A",
  },
  {
    front:
      "40) Which of the following statements about evolution of behavior is correct? A) Natural selection will favor behavior that enhances survival and reproduction. B) An animal may show behavior that minimizes reproductive fitness. C) If a behavior is less than optimal, it will eventually become optimal through natural selection. D) Innate behaviors can never be altered by natural selection. E) All of the statements are correct.",
    back: "A",
  },
  {
    front:
      "41) Feeding behavior with a high energy intake-to-expenditure ratio is called A) herbivory. B) autotrophy. C) heterotrophy. D) search scavenging. E) optimal foraging.",
    back: "E",
  },
  {
    front:
      "42) In the evolution of whelk-eating behavior in crows, which of the following was optimized through natural selection? A) the average number of drops required to break the shell B) the average height a bird flew to drop a shell C) the average total energy used to break shells D) the average size of the shells dropped by the birds E) the average thickness of the shells dropped by the birds",
    back: "C",
  },
  {
    front:
      "43) Which of the following might affect the foraging behavior of an animal in the context of optimal foraging? A) risk of predation B) prey size C) prey defenses D) prey density E) All of the options are correct.",
    back: "E",
  },
  {
    front:
      "44) You discover a rare new bird species, but you are unable to observe its mating behavior. You see that the male is large and ornamental compared with the female. On this basis, you can probably conclude that the species is A) polygamous. B) monogamous. C) polyandrous. D) promiscuous. E) agonistic.",
    back: "A",
  },
  {
    front:
      "45) The evolution of mating systems is most likely affected by A) population density. B) territoriality. C) certainty of paternity. D) sexual dimorphism. E) None of the options is correct.",
    back: "D",
  },
  {
    front:
      "46) The mating system in which females are more ornamented than males is A) monogamy. B) promiscuity. C) polygamy. D) polygyny. E) polyandry.",
    back: "E",
  },
  {
    front:
      "47) What is the fitness benefit of polygamy in birds that rear precocious young? A) Females will copulate with many males to ensure that all of their eggs are fertilized. B) Females don't have to decide on one mate, and can copulate with as many males as she deems worthy to share her genes with in reproduction. C) Fit males don't have to help feed and rear young and can spend this time seeking and mating with many females. D) Females don't have to spend time rearing young and can mate and rear additional broods during a breeding season. E) Both males and females spend little time with courtship and brood-rearing, and don't tax their own physiology so they can breed again in subsequent breeding seasons.",
    back: "C",
  },
  {
    front:
      "48) Which of the following statements is true about certainty of paternity? A) Young or eggs laid by a female are likely to contain the same genes as another female's eggs in a population of birds. B) Certainty of paternity is high in most species with internal fertilization because the acts of mating and birth are separated by time. C) Males that guard females they have mated with are certain of their paternity. D) Certainty of paternity is low when egg laying and mating occur together, as in external fertilization. E) Paternal behavior exists because it has been reinforced over generations by natural selection.",
    back: "E",
  },
  {
    front:
      '49) Which of the following best describes "game theory" as it applies to animal behavior? A) The fitness of a particular behavior is influenced by other behavioral phenotypes in a population. B) The total of all of the behavioral displays, both male and female, is related to courtship. C) An individual in a population changes a behavioral phenotype to gain a competitive advantage. D) The play behavior performed by juveniles allows them to perfect adult behaviors that are needed for survival, such as hunting, courtship, and so on. E) The evolutionary "game" is played between predator and prey, wherein the prey develops a behavior through natural selection that enables it to be less vulnerable to predation, and the predator counters with a new reciprocal predatory behavior.',
    back: "A",
  },
  {
    front:
      "50) The color of throats of males in a population of side-blotched lizards is determined by A) the frequency of homozygous recessive genotype. B) ambient temperatureblue = cold; orange = normal; yellow = hot. C) stage of development/maturity. D) their receptiveness to mate. E) the success of the mating behavior of each of the throat color phenotypes.",
    back: "E",
  },
  {
    front:
      "51) The fru gene in fruit flies A) controls sex-specific development in the fruit fly. B) is a master regulatory gene that directs expression of many other genes. C) can be genetically manipulated in females so that they will perform male sex behaviors. D) programs males for appropriate courtship behaviors. E) All of the options are correct.",
    back: "E",
  },
  {
    front:
      "52) Pair-bonding in a population of prairie voles can be prevented by A) the ensuing confusion caused by introducing meadow voles. B) administering a drug that inhibits the brain receptor for vasopressin in the CNS of males. C) administering a drug that turns on ADH receptor sites in male voles. D) dying the coat color from brown to blond in either male or female prairie voles. E) allowing the population size to reach critically low levels.",
    back: "B",
  },
  {
    front:
      "53) How do altruistic behaviors arise through natural selection? A) By his/her actions, the altruist increases the likelihood that some of its genes will be passed on to the next generation. B) The altruist is appreciated by other members of the population because their survivability has been enhanced by virtue of his/her risky behavior. C) Animals that perform altruistic acts are allowed by their population to breed more, thereby passing on their behavior genes to future generations. D) Altruistic behaviors lower stress in populations, which increases the survivability of all the members of the population. E) All of the options are correct.",
    back: "A",
  },
  {
    front:
      "54) Which of the following does not have a coefficient of relatedness of 0.5? A) a father to his daughter B) a mother to her son C) an uncle to his nephew D) a brother to his brother E) a sister to her brother",
    back: "C",
  },
  {
    front:
      "55) Animals that help other animals of the same species A) have excess energy reserves. B) are bigger and stronger than the other animals. C) are usually related to the other animals. D) are always male. E) have defective genes controlling their behavior.",
    back: "C",
  },
  {
    front:
      "56) The presence of altruistic behavior is most likely due to kin selection, a theory maintaining that A) aggression between sexes promotes the survival of the fittest individuals. B) genes enhance survival of copies of themselves by directing organisms to assist others who share those genes. C) companionship is advantageous to animals because in the future they can help each other. D) critical thinking abilities are normal traits for animals and they have arisen, like other traits, through natural selection. E) natural selection has generally favored the evolution of exaggerated aggressive and submissive behaviors to resolve conflict without grave harm to participants.",
    back: "B",
  },
  {
    front:
      "57) In Belding's ground squirrels, it is mostly the females that behave altruistically by sounding alarm calls. What is the likely reason for this distinction? A) Males have smaller vocal cords and are less likely to make sounds. B) Females invest more in foraging and food stores, so they are more defensive. C) Females settle in the area in which they were born, so the alarm is warning kin. D) The sex ratio is biased. E) Males forage in areas separate from females; therefore, alarm calls are useless.",
    back: "C",
  },
  {
    front:
      "58) The central concept of sociobiology is that A) human behavior is rigidly predetermined. B) the behavior of an individual cannot be modified. C) human behavior consists mainly of fixed action patterns. D) most aspects of our social behavior have an evolutionary basis. E) the social behavior of humans is homologous to the social behavior of other social animals.",
    back: "D",
  },
  {
    front:
      "59) In the territorial behavior of the stickleback fish, the red belly of one male that elicits attack from another male is functioning as A) a pheromone. B) a sign stimulus. C) a fixed action pattern. D) a search image. E) an imprint stimulus.",
    back: "B",
  },
  {
    front:
      "60) The behavior of most animals is influenced by the periods of daylight and darkness in the environment. Fiddler crabs' courtship behaviors are instead synchronized by the 29 1/2-day cycle of the moon. What is the adaptive significance of using lunar cues? A) The fiddler crab courtship ritual is highly visual so individuals need the light of the full moon to be able to observe courtship displays. B) Egg maturation in fiddler crab females takes 29 1/2 days. C) By courting at full and new moon, fiddler crabs link their reproduction to times of highest tides that disperse larvae to safer, deeper waters. D) The algae that larval fiddler crabs consume for energy and metabolism blooms on a monthly cycle, so recently hatched larvae have plenty to eat during a crucial time of their life. E) It takes about 29 days for a fiddler crab to reach sexual maturity.",
    back: "C",
  },
  {
    front:
      "61) During a field trip, an instructor touched a moth resting on a tree trunk. The moth raised its forewings to reveal large eyespots on its hind wings. The instructor asked why the moth lifted its wings. One student answered that sensory receptors had fired and triggered a neuronal reflex culminating in the contraction of certain muscles. A second student responded that the behavior might frighten predators. Which statement best describes these explanations? A) The first explanation is correct, but the second is incorrect. B) The first explanation refers to proximate causation, whereas the second refers to ultimate causation. C) The first explanation is biological, whereas the second is philosophical. D) The first explanation is testable as a scientific hypothesis, whereas the second is not. E) Both explanations are reasonable and simply represent a difference of opinion.",
    back: "B",
  },
  {
    front:
      '62) One way to understand how early environment influences differing behaviors in similar species is through the "cross-fostering" experimental technique. Suppose that the curly-whiskered mud rat differs from the bald mud rat in several ways, including being much more aggressive. How would you set up a cross-fostering experiment to determine if environment plays a role in the curly-whiskered mud rat\'s aggression? A) You would cross curly-whiskered mud rats and bald mud rats and hand-rear the offspring to see if any grew up to be aggressive. B) You would place newborn curly-whiskered mud rats with bald mud rat parents, place newborn bald mud rats with curly-whiskered mud rat parents, and let some mud rats of both species be raised by their own species. Then you would compare the outcomes. C) You would remove the offspring of curly-whiskered mud rats and bald mud rats from their parents, raise them in the same environment, and then compare the outcomes. D) You would see if curly-whiskered mud rats bred true for aggression. E) You would replace normal newborn mud rats with deformed newborn mud rats to see if it triggered an altruistic response.',
    back: "B",
  },
  {
    front:
      "63) Fred and Joe, two unrelated, mature male gorillas, encounter one another. Fred is courting a female. Fred grunts as Joe comes near. As Joe continues to advance, Fred begins drumming (pounding his chest) and bares his teeth. Joe then rolls on the ground on his back, gets up, and quickly leaves. This behavioral pattern is repeated several times during the mating season. Choose the most specific behavior described by this example. A) agonistic behavior B) territorial behavior C) learned behavior D) social behavior E) fixed action pattern",
    back: "A",
  },
  {
    front:
      "64) Which of the following is true of innate behaviors? A) Their expression is only weakly influenced by genes. B) They occur with or without environmental stimuli. C) They are limited to invertebrate animals. D) They are expressed in most individuals in a population. E) They occur in invertebrates and some vertebrates but not mammals.",
    back: "D",
  },
  {
    front:
      "65) According to Hamilton's rule, A) natural selection does not favor altruistic behavior that causes the death of the altruist. B) natural selection favors altruistic acts when the resulting benefit to the beneficiary, corrected for relatedness, exceeds the cost to the altruist. C) natural selection is more likely to favor altruistic behavior that benefits an offspring than altruistic behavior that benefits a sibling. D) the effects of kin selection are larger than the effects of direct natural selection on individuals. E) altruism is always reciprocal.",
    back: "B",
  },
  {
    front:
      "66) Female spotted sandpipers aggressively court males and, after mating, leave the clutch of young for the male to incubate. This sequence may be repeated several times with different males until no available males remain, forcing the female to incubate her last clutch. Which of the following terms best describes this behavior? A) monogamy B) polygyny C) polyandry D) promiscuity E) certainty of paternity",
    back: "C",
  },
  {
    front:
      "67) A region of the canary forebrain shrinks during the nonbreeding season and enlarges when breeding season begins. This change is probably associated with the annual A) addition of new syllables to a canary's song repertoire. B) crystallization of subsong into adult songs. C) sensitive period in which canary parents imprint on new offspring. D) renewal of mating and nest-building behaviors. E) elimination of the memorized template for songs sung the previous year.",
    back: "A",
  },
  {
    front:
      "68) Although many chimpanzees live in environments containing oil palm nuts, members of only a few populations use stones to crack open the nuts. The likely explanation is that A) the behavioral difference is caused by genetic differences between populations. B) members of different populations have different nutritional requirements. C) the cultural tradition of using stones to crack nuts has arisen in only some populations. D) members of different populations differ in learning ability. E) members of different populations differ in manual dexterity.",
    back: "C",
  },
  {
    front:
      "69) Which of the following is not required for a behavioral trait to evolve by natural selection? A) In each individual, the form of the behavior is determined entirely by genes. B) The behavior varies among individuals. C) An individual's reproductive success depends in part on how the behavior is performed. D) Some component of the behavior is genetically inherited. E) An individual's genotype influences its behavioral phenotype.",
    back: "A",
  },
  {
    front:
      '1) "How do seed-eating animals affect the distribution and abundance of the trees?" This question A) would require an elaborate experimental design to answer. B) would be difficult to answer because a large experimental area would be required. C) would be difficult to answer because a long-term experiment would be required. D) is one that a present-day ecologist would be likely to ask. E) All options are correct.',
    back: "E",
  },
  {
    front:
      "2) Which of the following levels of ecological organization is arranged in the correct sequence from most to least inclusive? A) community, ecosystem, individual, population B) ecosystem, community, population, individual C) population, ecosystem, individual, community D) individual, population, community, ecosystem E) individual, community, population, ecosystem",
    back: "B",
  },
  {
    front:
      "3) Which of the following examples of an ecological effect leading to an evolutionary effect is most correct? A) When seeds are not plentiful, trees produce more seeds. B) A few organisms of a larger population survive a drought and then these survivors emigrate to less arid environments. C) A few individuals with denser fur survive the coldest days of an ice age, and the reproducing survivors of the ice age all have long fur. D) Fish that swim the fastest in running water catch the most prey and more easily escape predation. E) The insects that spend the most time exposed to sunlight have the most mutations.",
    back: "C",
  },
  {
    front:
      "4) Which of the following might be an investigation of microclimate? A) the effect of ambient temperature on the onset of caribou migration B) the seasonal population fluctuation of nurse sharks in coral reef communities C) competitive interactions between various species of songbirds during spring migration D) the effect of sunlight intensity on species composition in a decaying rat carcass E) the effect of different nitrogen applications on corn productivity",
    back: "D",
  },
  {
    front:
      "5) Which of the following choices includes all of the others in creating global terrestrial climates? A) differential heating of Earth's surface B) ocean currents C) global wind patterns D) evaporation of water from ocean surfaces E) Earth's rotation on its axis",
    back: "A",
  },
  {
    front:
      "6) Why is the climate drier on the leeward side of mountain ranges that are subjected to prevailing winds? A) Deserts usually are found on the leeward side of mountain ranges. B) The sun illuminates the leeward side of mountain ranges at a more direct angle, converting to heat energy, which evaporates most of the water present. C) Pushed by the prevailing winds on the windward side, air is forced to rise, cool, condense, and drop its precipitation, leaving only dry air to descend the leeward side. D) Air masses pushed by the prevailing winds are stopped by mountain ranges and the moisture is used up in the stagnant air masses on the leeward side. E) More organisms live on the sheltered, leeward side of mountain ranges where their utilization of water lowers the amount available when compared to the windward side.",
    back: "C",
  },
  {
    front:
      "7) What would be the effect on climate in the temperature latitudes if Earth were to slow its rate of rotation from a 24-hour period of rotation to a 48-hour period of rotation? A) Seasons would be longer and more distinct (colder winters and warmer summers). B) There would be a smaller range between daytime high and nighttime low temperatures. C) Large scale weather events such as tornadoes and hurricanes would no longer be a part of regional climates. D) Winter seasons in both the northern and southern hemispheres would have more abundant and frequent precipitation events. E) The climate would stay the same. The only change would be longer days and nights.",
    back: "E",
  },
  {
    front:
      "8) Palm trees and subtropical plants are commonplace in Land's End, England, whose latitude is the equivalent of Labrador in coastal Canada where the local flora is subarctic. Which statement best explains why this apparent anomaly exists between North America and Europe? A) Labrador does not get enough rainfall to support the subtropical flora found in Land's End. B) Warm ocean currents interact with England, whereas cold ocean currents interact with Labrador. C) Rainfall fluctuates greatly in England; rainfall is consistently high in Labrador. D) Labrador is too windy to support tall plants, such as palm trees. E) Labrador receives sunlight of lower duration and intensity than does Land's End.",
    back: "B",
  },
  {
    front:
      "9) Which statement describes how climate might change if Earth was 75% land and 25% water? A) Terrestrial ecosystems would likely experience more precipitation. B) Earth's daytime temperatures would be higher and nighttime temperatures lower. C) Summers would be longer and winters shorter at midlatitude locations. D) Earth would experience an unprecedented global warming. E) More terrestrial microclimates would be created because of daily fluctuations in climate.",
    back: "B",
  },
  {
    front:
      "10) Which of the following abiotic factors has the greatest influence on the metabolic rates of plants and animals? A) water B) wind C) temperature D) rocks and soil E) disturbances",
    back: "C",
  },
  {
    front:
      "11) In mountainous areas of western North America, north-facing slopes would be expected to A) receive more sunlight than similar southern exposures. B) be warmer and drier than comparable southern exposed slopes. C) consistently be steeper than southern exposures. D) support biological communities similar to those found at lower elevations on similar south-facing slopes. E) support biological communities similar to those found at higher elevations on similar south-facing slopes.",
    back: "E",
  },
  {
    front:
      "12) Deserts typically occur in a band at 20 degrees north and south latitude because A) descending air masses tend to be cool and dry. B) trade winds have a little moisture. C) moisture-laden air is heavier than dry air and is not carried to these latitudes. D) ascending air tends to be moist. E) these locations get the most intense solar radiation of any location on Earth.",
    back: "A",
  },
  {
    front:
      "13) Which of the following events might you predict to occur if the tilt of Earth's axis relative to its plane of orbit was increased to 33 1/2 degrees? A) Summers and winters in the United States would likely become warmer and colder, respectively. B) Winters and summers in Australia would likely become less distinct seasons. C) Seasonal variation at the equator might decrease. D) Both northern and southern hemispheres would experience summer and winter at the same time. E) Both poles would experience massive ice melts.",
    back: "A",
  },
  {
    front:
      "14) Imagine some cosmic catastrophe jolts Earth so that its axis is perpendicular to the orbital plane between Earth and the sun. The most obvious effect of this change would be A) the elimination of tides. B) an increase in the length of night. C) an increase in the length of a year. D) a decrease in temperature at the equator. E) the elimination of seasonal variation.",
    back: "E",
  },
  {
    front:
      "15) The main reason polar regions are cooler than the equator is that A) there is more ice at the poles. B) sunlight strikes the poles at a lower angle. C) the poles are farther from the sun. D) the polar atmosphere is thinner and contains fewer greenhouse gases. E) the poles are permanently tilted away from the sun.",
    back: "B",
  },
  {
    front:
      "16) Which of the following environmental features might influence microclimates? A) forest canopy B) freshly plowed field C) log on the forest floor D) large boulder E) All of the options are correct.",
    back: "E",
  },
  {
    front:
      "17) The success with which plants extend their range northward following glacial retreat is best determined by A) whether there is simultaneous migration of herbivores. B) their tolerance to shade. C) their seed dispersal rate. D) their size. E) their growth rate.",
    back: "C",
  },
  {
    front:
      "18) As climate changes because of global warming, species' ranges in the northern hemisphere may move northward, using effective reproductive adaptations to disperse their seeds. The trees that are most likely to avoid extinction in such an environment are those that A) have seeds that are easily dispersed by wind or animals. B) have thin seed coats. C) produce well-provisioned seeds. D) have seeds that become viable only after a forest fire. E) disperse many seeds in close proximity to the parent tree.",
    back: "A",
  },
  {
    front:
      "19) Generalized global air circulation and precipitation patterns are caused by A) rising, warm, moist air masses that cool and release precipitation as they rise and then, at high altitude, cool and sink back to the surface as dry air masses after moving north or south of the tropics. B) air masses that are dried and heated over continental areas that rise, cool aloft, and descend over oceanic areas followed by a return flow of moist air from ocean to land, delivering high amounts of precipitation to coastal areas. C) polar, cool, moist high-pressure air masses from the poles that move along the surface, releasing precipitation along the way to the equator where they are heated and dried. D) the revolution of Earth around the sun. E) mountain ranges that deflect air masses containing variable amounts of moisture.",
    back: "A",
  },
  {
    front:
      "20) Air masses formed over the Pacific Ocean are moved by prevailing westerlies where they encounter extensive north-south mountain ranges, such as the Sierra Nevada and the Cascades. Which statement best describes the outcome of this encounter between a landform and an air mass? A) The cool, moist Pacific air heats up as it rises, releasing its precipitation as it passes the tops of the mountains, and this warm, now dry air cools as it descends on the leeward side of the range. B) The warm, moist Pacific air rises and cools, releasing precipitation as it moves up the windward side of the range, and this cool, now dry air mass heats up as it descends on the leeward side of the range. C) The cool, dry Pacific air heats up and picks up moisture from evaporation of the snowcapped peaks of the mountain range, releasing this moisture as precipitation when the air cools while descending on the leeward side of the range. D) These air masses are blocked by the mountain ranges, producing high annual amounts of precipitation on the windward sides of these mountain ranges. E) These air masses remain essentially unchanged in moisture content and temperature as they pass over these mountain ranges.",
    back: "B",
  },
  {
    front:
      "21) If global warming continues at its present rate, which biomes will likely take the place of the coniferous forest (taiga)? A) tundra and polar ice B) temperate broadleaf forest and grassland C) desert and chaparral D) tropical forest and savanna E) chaparral and temperate broadleaf forest",
    back: "B",
  },
  {
    front:
      "22) Which of the following are important biotic factors that can affect the structure and organization of biological communities? A) precipitation, wind B) nutrient availability, soil pH C) predation, competition D) temperature, water E) light intensity, seasonality",
    back: "C",
  },
  {
    front:
      "23) Which of the following can be said about light in aquatic environments? A) Water selectively reflects and absorbs certain wavelengths of light. B) Photosynthetic organisms that live in deep water probably use red light. C) Longer wavelengths penetrate to greater depths. D) Light penetration seldom limits the distribution of photosynthetic species. E) Most photosynthetic organisms avoid the surface where the light is too intense.",
    back: "A",
  },
  {
    front:
      "24) Coral reefs can be found on the southern east coast of the United States but not at similar latitudes on the southern west coast. Differences in which of the following most likely account for this? A) sunlight intensity B) precipitation C) day length D) ocean currents E) salinity",
    back: "D",
  },
  {
    front:
      "25) Which of the following investigations would shed the most light on the distribution of organisms in temperate regions that are faced with climate change? A) Remove, to the mineral soil, all of the organisms from an experimental plot and monitor the colonization of the area over time in terms of both species diversity and abundance. B) Look back at the changes that occurred since the Ice Age and how species redistributed as glaciers melted, then make predictions on future distribution in species based on past trends. C) Compare and contrast the flora and fauna of warm/cold/dry/wet climates to shed light on how they evolved to be suited to their present-day environment. D) Quantify the impact of man's activities on present-day populations of threatened and endangered species to assess the rate of extirpation and extinction. E) There is no scientific investigation that can help make predictions on the future distribution of organisms.",
    back: "B",
  },
  {
    front:
      "26) Which series is correctly layered from top to bottom in a tropical rain forest? A) ground layer, shrub/immature layer, under story, canopy, emergent layer B) canopy, emergent layer, under story, shrub/immature layer, ground layer C) canopy, under story, shrub/immature layer, emergent layer, ground layer D) emergent layer, canopy, under story, shrub/immature layer, ground layer E) emergent layer, under story, canopy, ground layer, shrub/immature layer",
    back: "D",
  },
  {
    front:
      "27) What is the limiting factor for the growth of trees in the tundra? A) low precipitation B) cold temperatures C) insufficient minerals in bedrock D) pH of soils E) permafrost",
    back: "E",
  },
  {
    front:
      "28) Generally speaking, deserts are located in places where air masses are usually A) tropical. B) humid. C) rising. D) descending. E) expanding.",
    back: "D",
  },
  {
    front:
      "29) Turnover of water in temperate lakes during the spring and fall is made possible by which of the following? A) warm, less dense water layered at the top B) cold, more dense water layered at the bottom C) a distinct thermocline between less dense warm water and cold, dense water D) the changes in the density of water as seasonal temperatures change E) currents generated by nektonic animals",
    back: "D",
  },
  {
    front:
      "30) In temperate lakes, the surface water is replenished with nutrients during turnovers that occur in the A) autumn and spring. B) autumn and winter. C) spring and summer. D) summer and winter. E) summer and autumn.",
    back: "A",
  },
  {
    front:
      "31) Which of the following is responsible for the differences in summer and winter temperature stratification of deep temperate zone lakes? A) Water is densest at 4\u00b0C. B) Oxygen is most abundant in deeper waters. C) Winter ice sinks in the summer. D) Stratification is caused by a thermocline. E) Stratification always follows the fall and spring turnovers.",
    back: "A",
  },
  {
    front:
      '32) Imagine that a deep temperate zone lake did not "turn over" during the spring and fall seasons. Based on the physical and biological properties of limnetic ecosystems, what would be the difference from normal seasonal turnover? A) The lake would be uniformly cold during the winter and summer. B) The lake would fail to freeze over in winter. C) An algal bloom of algae would result every spring. D) Lakes would suffer a nutrient depletion in surface layers. E) The pH of the lake would become increasingly alkaline.',
    back: "D",
  },
  {
    front:
      "33) Which marine zone would have the lowest rates of primary productivity (photosynthesis)? A) pelagic B) abyssal C) neritic D) continental shelf E) intertidal",
    back: "B",
  },
  {
    front:
      "34) If you are interested in observing a relatively simple community structure in a clear water lake, you would do well to choose diving into A) an oligotrophic lake. B) a eutrophic lake. C) a relatively shallow lake. D) a nutrient-rich lake. E) a lake with consistently warm temperatures.",
    back: "A",
  },
  {
    front:
      '35) Which of the following statements about the ocean pelagic biome is true? A) The ocean is a vast, deep storehouse that always provides sustenance; it is the next "frontier" for feeding humanity. B) Because it is so immense, the pelagic ocean biome is globally uniform. C) Globally, more photosynthesis occurs in the ocean neritic biome than in the pelagic biome. D) Pelagic ocean photosynthetic activity is disproportionately low in relation to the size of the biome. E) The most abundant animals are vertebrate fishes.',
    back: "D",
  },
  {
    front:
      "36) If a meteor impact or volcanic eruption injected a lot of dust into the atmosphere and reduced the sunlight reaching Earth's surface by 70% for one year, which of the following marine communities most likely would be least affected? A) deep-sea vent B) coral reef C) intertidal D) pelagic E) estuary",
    back: "A",
  },
  {
    front:
      "37) Which of the examples below provides appropriate abiotic and biotic factors that might determine the distribution of the species in question? A) the amount of nitrate and phosphate in the soil, and wildflower abundance and diversity B) the number of frost-free days, and competition between species of introduced grasses and native alpine grasses C) increased predation and decreased food availability, and a prairie dog population after a prairie fire D) available sunlight and increased salinity in the top few meters of the ocean, and the abundance and diversity of phytoplankton communities E) the pH and dissolved oxygen concentration, and the streams in which brook trout can live",
    back: "B",
  },
  {
    front:
      "38) A certain species of pine tree survives only in scattered locations at elevations above 2,800 m in the western United States. To understand why this tree grows only in these specific places, an ecologist should A) conclude that lower elevations are limiting to the survival of this species. B) study the anatomy and physiology of this species. C) investigate the various biotic and abiotic factors that are unique to high altitude. D) analyze the soils found in the vicinity of these trees, looking for unique chemicals that may support their growth. E) collect data on temperature, wind, and precipitation at several of these locations for a year.",
    back: "C",
  },
  {
    front:
      "39) Species introduced by humans to new geographic locations A) are usually successful in colonizing the area. B) always spread because they encounter none of their natural predators. C) increase the diversity and therefore the stability of the ecosystem. D) can outcompete and displace native species for biotic and abiotic resources. E) are always considered pests by ecologists.",
    back: "D",
  },
  {
    front:
      "40) Which of the following statements best describes the effect of climate on biome distribution? A) Average annual temperature and precipitation are sufficient to predict which biome will be found in an area. B) Seasonal fluctuation of temperature is not a limiting factor in biome distribution if areas have the same annual temperature and precipitation means. C) Not only is the average climate important in determining biome distribution but so is the pattern of climatic variation. D) Temperate forests and grasslands are different biomes because they receive a different quality and quantity of sunlight, even though they have essentially the same annual temperature and precipitation. E) Correlation of climate with biome distribution is sufficient to determine the cause of biome patterns.",
    back: "C",
  },
  {
    front:
      "41) In the development of terrestrial biomes, which factor is most dependent on all the others? A) the species of colonizing animals B) prevailing temperature C) prevailing rainfall D) mineral nutrient availability E) soil structure",
    back: "A",
  },
  {
    front:
      "42) Two plant species live in the same biome but on different continents. Although the two species are not at all closely related, they may appear quite similar as a result of A) parallel evolution. B) convergent evolution. C) allopatric speciation. D) introgression. E) gene flow.",
    back: "B",
  },
  {
    front:
      "43) In which of the following terrestrial biome pairs are both parts dependent upon periodic burning? A) tundra and coniferous forest B) chaparral and savanna C) desert and savanna D) tropical forest and temperate broadleaf forest E) grassland and tundra",
    back: "B",
  },
  {
    front:
      "44) Fire suppression by humans A) will always result in an increase in species diversity in a given biome. B) can change the species composition within biological communities. C) will result ultimately in sustainable production of increased amounts of forest products for human use. D) is necessary for the protection of threatened and endangered forest species. E) is a management goal of conservation biologists to maintain the healthy condition of forest communities.",
    back: "B",
  },
  {
    front:
      "45) Which of the following statements best describes the interaction between fire and ecosystems? A) The likelihood of a wildfire occurring in a given ecosystem is highly predictable over the short term. B) Many kinds of plants and plant communities have adapted to frequent fires. C) The suppression of forest fires by man has prevented certain communities, such as grasslands, from reaching their climax stage. D) Chaparral communities have evolved to the extent that they rarely burn. E) Fire is unnatural in ecosystems and should be prevented.",
    back: "B",
  },
  {
    front:
      "46) In which community would organisms most likely have adaptations enabling them to respond to different photoperiods? A) tropical forest B) coral reef C) savanna D) temperate forest E) abyssal",
    back: "D",
  },
  {
    front:
      "47) The growing season would generally be shortest in which of the following biomes? A) savanna B) temperate broadleaf forest C) temperate grassland D) tropical rain forest E) coniferous forest",
    back: "E",
  },
  {
    front:
      "48) Trees are not usually found in the tundra biome because of A) insufficient annual precipitation. B) acidic soils. C) extreme winter temperatures. D) overbrowsing by musk ox and caribou. E) permafrost.",
    back: "E",
  },
  {
    front:
      "49) Studying species transplants is a way that ecologists A) determine the abundance of a species in a specified area. B) determine the distribution of a species in a specified area. C) develop mathematical models for distribution and abundance of organisms. D) determine if dispersal is a key factor in limiting distribution of organisms. E) consolidate a landscape region into a single ecosystem.",
    back: "D",
  },
  {
    front:
      "The eight climographs below show yearly temperature (line graph and left vertical axis) and precipitation (bar graph and right vertical axis) averages for each month for some locations on Earth. Choose the climograph that best answers the question or completes the statement. Climographs may be used once, more than once, or not at all.  50) Which climograph shows the climate for location 1? A) A B) C C) E D) G E) H",
    back: "A",
  },
  {
    front:
      "The eight climographs below show yearly temperature (line graph and left vertical axis) and precipitation (bar graph and right vertical axis) averages for each month for some locations on Earth. Choose the climograph that best answers the question or completes the statement. Climographs may be used once, more than once, or not at all.  51) Which climograph shows the climate for location 2? A) B B) C C) D D) F E) H",
    back: "D",
  },
  {
    front:
      "The eight climographs below show yearly temperature (line graph and left vertical axis) and precipitation (bar graph and right vertical axis) averages for each month for some locations on Earth. Choose the climograph that best answers the question or completes the statement. Climographs may be used once, more than once, or not at all.  52) Which climograph shows the climate for location 3? A) B B) C C) D D) E E) F",
    back: "C",
  },
  {
    front:
      "The eight climographs below show yearly temperature (line graph and left vertical axis) and precipitation (bar graph and right vertical axis) averages for each month for some locations on Earth. Choose the climograph that best answers the question or completes the statement. Climographs may be used once, more than once, or not at all.  53) Which climograph shows the climate for location 4? A) A B) B C) C D) E E) G",
    back: "D",
  },
  {
    front:
      "The eight climographs below show yearly temperature (line graph and left vertical axis) and precipitation (bar graph and right vertical axis) averages for each month for some locations on Earth. Choose the climograph that best answers the question or completes the statement. Climographs may be used once, more than once, or not at all.  54) Which climograph shows the climate for location 5? A) A B) C C) D D) E E) H",
    back: "B",
  },
  {
    front:
      "The eight climographs below show yearly temperature (line graph and left vertical axis) and precipitation (bar graph and right vertical axis) averages for each month for some locations on Earth. Choose the climograph that best answers the question or completes the statement. Climographs may be used once, more than once, or not at all.  55) Which of the following best substantiates why location 3 is an equatorial (tropical) climate? A) It has a monsoon season during the winter months. B) It has consistent monthly averages for rainfall. C) The temperature is high for each monthly average. D) The temperatures reach 100\u00b0F during some months. E) The temperatures are lower in June, July, and August.",
    back: "C",
  },
  {
    front:
      "The diagram shows a generalized cross section of the marine environment with various zones labeled with letters. Choose the letter that best answers the question. Letters may be used once, more than once, or not at all  56) Which zone has a condition of constant temperature? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "The diagram shows a generalized cross section of the marine environment with various zones labeled with letters. Choose the letter that best answers the question. Letters may be used once, more than once, or not at all  57) Which zone produces the most global oxygen gas? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "The diagram shows a generalized cross section of the marine environment with various zones labeled with letters. Choose the letter that best answers the question. Letters may be used once, more than once, or not at all  58) Which zone is comprised largely of detritus-feeding organisms? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "The diagram shows a generalized cross section of the marine environment with various zones labeled with letters. Choose the letter that best answers the question. Letters may be used once, more than once, or not at all  59) Which zone has the lowest biomass per unit of area? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "The diagram shows a generalized cross section of the marine environment with various zones labeled with letters. Choose the letter that best answers the question. Letters may be used once, more than once, or not at all  60) Which zone experiences the most abiotic change over a 24-hour period? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "Use the following diagram from the text showing the spread of the cattle egret, Bubulcus ibis, since its arrival in the New World, to answer the following question.  61) How would an ecologist likely explain the expansion of the cattle egret? A) The areas to which the cattle egret has expanded have no cattle egret parasites. B) Climatic factors, such as temperature and precipitation, provide a suitable habitat for cattle egrets. C) There are no predators for cattle egrets in the New World, so they continue to expand their range. D) A habitat left unoccupied by native herons and egrets met the biotic and abiotic requirements of the cattle egret transplants and their descendants. E) The first egrets to colonize South America evolved into a new species capable of competing with the native species of herons and egrets.",
    back: "D",
  },
  {
    front:
      'Experts in white-tailed deer ecology generally agree that population sizes of deer that live in temperate climates are limited by winter snow. The deer congregate in "yarding" areas under evergreen trees because venturing out to feed in winter is energetically too expensive when snowfall depths accumulate to above 40 cm. Deer often stay yarded until the spring thaw. Snow depth over 40 inches for more than 60 days results in high mortality due to starvation.  62) This observation best illustrates which of the following principles about factors that limit distribution of organisms? A) Abiotic factors, such as weather extremes, ultimately limit distribution. B) Organisms will face extinction unless they adapt to conditions or evolve new mechanisms for survival. C) Environmental factors are limiting not only in amount but also in longevity. D) Daily accumulations in snow depth gradually add up to cause increased deer mortality. E) Temporary extremes in weather conditions usually result in high mortality in the deer population.',
    back: "C",
  },
  {
    front:
      'In areas of permafrost, stands of black spruce are frequently observed in the landscape, while other tree species are noticeably absent. Often these stands are referred to as "drunken forests" because many of the black spruce are displaced from their normal vertical alignment.  63) What might be the adaptive significance of these unusual forests growing the way they do in this marginal habitat? A) Needles are adapted to withstand cold arctic temperatures. B) Branches are adapted to absorb more CO\u2082 with this displaced alignment. C) Taproot formation is impossible, so trees developed shallow root beds. D) Trees are tilted so snow prevents them from breaking or tipping over. E) Trees tip so that they do not compete with each other for sunlight.',
    back: "C",
  },
  {
    front:
      "64) Which of the following areas of study focuses on the exchange of energy, organisms, and materials between ecosystems? A) population ecology B) organismal ecology C) landscape ecology D) ecosystem ecology E) community ecology",
    back: "C",
  },
  {
    front:
      "65) Which lake zone would be absent in a very shallow lake? A) benthic zone B) aphotic zone C) pelagic zone D) littoral zone E) limnetic zone",
    back: "B",
  },
  {
    front:
      "66) Which of the following is true with respect to oligotrophic lakes and eutrophic lakes? A) Oligotrophic lakes are more subject to oxygen depletion. B) Rates of photosynthesis are lower in eutrophic lakes. C) Eutrophic lake water contains lower concentrations of nutrients. D) Eutrophic lakes are richer in nutrients. E) Sediments in oligotrophic lakes contain larger amounts of decomposable organic matter.",
    back: "D",
  },
  {
    front:
      "67) Which of the following biomes is correctly paired with the description of its climate? A) savanna\u2013low temperature, precipitation uniform during the year B) tundra\u2013long summers, mild winters C) temperate broadleaf forest\u2013relatively short growing season, mild winters D) temperate grasslands\u2013relatively warm winters, most rainfall in summer E) tropical forests\u2013nearly constant day length and temperature",
    back: "E",
  },
  {
    front:
      "68) Which of the following is characteristic of most terrestrial biomes? A) annual average rainfall in excess of 250 cm B) a distribution predicted almost entirely by rock and soil patterns C) clear boundaries between adjacent biomes D) vegetation demonstrating vertical layering E) cold winter months",
    back: "D",
  },
  {
    front:
      "69) The oceans affect the biosphere in all of the following ways except A) producing a substantial amount of the biosphere's oxygen. B) removing carbon dioxide from the atmosphere. C) moderating the climate of terrestrial biomes. D) regulating the pH of freshwater biomes and terrestrial groundwater. E) being the source of most of Earth's rainfall.",
    back: "D",
  },
  {
    front:
      "70) Which statement about dispersal is false? A) Dispersal is a common component of the life cycles of plants and animals. B) Colonization of devastated areas after floods or volcanic eruptions depends on dispersal. C) Dispersal occurs only on an evolutionary time scale. D) Seeds are important dispersal stages in the life cycles of most flowering plants. E) The ability to disperse can expand the geographic distribution of a species.",
    back: "C",
  },
  {
    front:
      "71) When climbing a mountain, we can observe transitions in biological communities that are analogous to the changes A) in biomes at different latitudes. B) at different depths in the ocean. C) in a community through different seasons. D) in an ecosystem as it evolves over time. E) across the United States from east to west.",
    back: "A",
  },
  {
    front:
      "72) Suppose that the number of bird species is determined mainly by the number of vertical strata found in the environment. If so, in which of the following biomes would you find the greatest number of bird species? A) tropical rain forest B) savanna C) desert D) temperate broadleaf forest E) temperate grassland",
    back: "A",
  },
  {
    front:
      "73) If the direction of Earth's rotation reversed, the most predictable effect would be A) no more night and day. B) a big change in the length of the year. C) winds blowing from west to east along the equator. D) a loss of seasonal variation at high latitudes. E) the elimination of ocean currents.",
    back: "C",
  },
  {
    front:
      "1) Population ecologists are primarily interested in A) studying interactions among populations of organisms that inhabit the same area. B) understanding how biotic and abiotic factors influence the density, distribution, size, and age structure of populations. C) how humans affect the size of wild populations of organisms. D) how populations evolve as natural selection acts on heritable variations among individuals and changes in gene frequency. E) the overall vitality of a population of organisms.",
    back: "B",
  },
  {
    front:
      "2) A population is correctly defined as having which of the following characteristics?  I. inhabiting the same general area II. belonging to the same species III. possessing a constant and uniform density and dispersion  A) I only B) III only C) I and II only D) II and III only E) I, II, and III",
    back: "C",
  },
  {
    front:
      "3) An ecologist recorded 12 white-tailed deer, Odocoileus virginianus, per square mile in one woodlot and 20 per square mile in another woodlot. What was the ecologist comparing? A) density B) dispersion C) carrying capacity D) cohorts E) range",
    back: "A",
  },
  {
    front:
      "4) During the spring, you are studying the mice that live in a field near your home. The population density is high, but you realize that you rarely observe any reproductive female mice. This most likely indicates A) that there is selective predation on female mice. B) that female mice die before reproducing. C) that this habitat is a good place for mice to reproduce. D) that you are observing immigrant mice. E) that the breeding season is over.",
    back: "D",
  },
  {
    front:
      "5) Uniform spacing patterns in plants such as the creosote bush are most often associated with A) chance. B) patterns of high humidity. C) the random distribution of seeds. D) competitive interaction between individuals of the same population. E) the concentration of nutrients within the population's range.",
    back: "D",
  },
  {
    front:
      "6) Which of the following groups would be most likely to exhibit uniform dispersion? A) red squirrels, who actively defend territories B) cattails, which grow primarily at edges of lakes and streams C) dwarf mistletoes, which parasitize particular species of forest tree D) moths, in a city at night E) lake trout, which seek out cold, deep water high in dissolved oxygen",
    back: "A",
  },
  {
    front:
      "7) To construct a reproductive table for a sexual species, one needs to A) assess sperm viability for the males in the population. B) keep track of all of the offspring of a cohort. C) keep track of the females in a cohort. D) keep track of all of the offspring of the females in a cohort. E) analyze the ratio of deaths to births in a cohort.",
    back: "C",
  },
  {
    front:
      "8) Which of the following examples would most accurately measure the density of the population being studied? A) counting the number of prairie dog burrows per hectare B) counting the number of times a 1 kilometer transect is intersected by tracks of red squirrels after a snowfall C) counting the number of coyote droppings per hectare D) multiplying the number of moss plants counted in 10 quadrats of 1m\u00b2 each by 100 to determine the density per kilometer\u00b2. E) counting the number of zebras from airplane census observations.",
    back: "E",
  },
  {
    front:
      "9) Which of the following assumptions have to be made regarding the capture-recapture estimate of population size?  I. Marked and unmarked individuals have the same probability of being trapped. II. The marked individuals have thoroughly mixed with the population after being marked. III. No individuals have entered or left the population by immigration or emigration, and no individuals have been added by birth or eliminated by death during the course of the estimate.  A) I only B) II only C) I and II only D) II and III only E) I, II, and III",
    back: "E",
  },
  {
    front:
      "10) Long-term studies of Belding's ground squirrels show that immigrants move nearly 2 km from where they are born and become 1%-8% of the males and 0.7%-6% of the females in other populations. On an evolutionary scale, why is this significant? A) These immigrants make up for the deaths of individuals, keeping the other populations' size stable. B) Young reproductive males tend to stay in their home population and are not driven out by other territorial males. C) These immigrants provide a source of genetic diversity for the other populations. D) Those individuals that emigrate to these new populations are looking for less crowded conditions with more resources. E) Gradually, the populations of ground squirrels will move from a clumped to a uniform population pattern of dispersion.",
    back: "C",
  },
  {
    front:
      "11) Which of the following sets of measurements is the most useful when studying populations? A) density, dispersion, and demographics of a population B) gene frequency over time and the ratio of reproductive to nonreproductive individuals C) annual precipitation averages and mean annual temperatures D) minimum and maximum amounts of precipitation and annual temperature extremes E) ratio of predators and the number of immigrants and emigrants",
    back: "A",
  },
  {
    front:
      "12) Which of the following scenarios would provide the most legitimate data on population density? A) Count the number of nests of a particular species of songbird and multiply this by a factor that extrapolates these data to actual animals. B) Count the number of pine trees in several randomly selected 10 m x 10 m plots and extrapolate this number to the fraction of the study area these plots represent. C) Use the mark-and-recapture method to estimate the size of the population. D) Calculate the difference between all of the immigrants and emigrants to see if the population is growing or shrinking. E) Add the number of births and subtract the individuals that die to see if the population's density is increasing or decreasing.",
    back: "B",
  },
  {
    front:
      "13) Which of the following is the best example of uniform distribution? A) bees collecting pollen in a wildflower meadow B) snails in an intertidal zone at low tide C) territorial songbirds in a mature forest during mating season D) mushrooms growing on the floor of an old growth forest E) a cultivated cornfield in the Midwest",
    back: "C",
  },
  {
    front:
      "14) Which of the following choices would most likely promote random distribution? A) territorial species B) species that secrete chemicals to attract or inhibit other individuals C) flocking and schooling behaviors D) spacing during the breeding season E) homogeneous chemical and physical factors in the environment",
    back: "E",
  },
  {
    front:
      "15) Which of the following best defines a cohort? A) a group of individuals that inhabits a small isolated region within the range for the species B) all of the individuals that are annually added to a population by birth and immigration C) the reproductive males and females within the population D) a group of the individuals from the same age group, from birth until they are all dead E) the number of individuals that annually die or emigrate out of a population",
    back: "D",
  },
  {
    front:
      '16) Why do some invertebrates, such as lobsters, show a "stair-step" survivorship curve? A) Many invertebrates mate and produce offspring on multiyear cycles. B) Within a species of invertebrates, younger individuals have a higher survivorship than older individuals. C) Many invertebrates molt in order to grow, and they are vulnerable to predation during their "soft shell" stage. D) Many invertebrate species have population cycles that go up and down according to the frequency of sunspots. E) The number of fertilized eggs that mature to become females in many species of invertebrates is based on ambient temperature.',
    back: "C",
  },
  {
    front:
      "17) Which of the following is the most important assumption for the capture-recapture method to estimate the size of wildlife populations? A) All females in the population have the same litter size. B) More individuals emigrate from, as opposed to immigrate into, a population. C) Over 50% of the marked individuals need to be trapped during the recapture phase. D) There is a 50:50 ratio of males to females in the population before and after trapping and recapture. E) Marked individuals have the same probability of being recaptured as unmarked individuals during the recapture phase.",
    back: "E",
  },
  {
    front:
      "18) A population of ground squirrels has an annual per capita birth rate of 0.06 and an annual per capita death rate of 0.02. Calculate an estimate of the number of individuals added to (or lost from) a population of 1,000 individuals in one year. A) 120 individuals added B) 40 individuals added C) 20 individuals added D) 400 individuals added E) 20 individuals lost",
    back: "B",
  },
  {
    front:
      "19) Exponential growth of a population is represented by dN/dt =  A. SEE IMAGE B. SEE IMAGE C. SEE IMAGE D. SEE IMAGE E. SEE IMAGE",
    back: "B",
  },
  {
    front:
      "20) Starting from a single individual, what is the size of a population of bacteria that reproduce by binary fission every 20 minutes at the end of a 2-hour time period? (Assume unlimited resources and no mortality.) A) 6 B) 18 C) 128 D) 512 E) 1,024",
    back: "D",
  },
  {
    front:
      "21) Which of the following is the equation for zero population growth (ZPG)? A) R = b - m B) dN/dt = rN C) dN/dt =rmax N (K -N)/K D) dN/dt =rmax N E) dN/dt = 1.0N",
    back: "A",
  },
  {
    front:
      "22) In July 2008, the United States had a population of approximately 302,000,000 people. How many Americans were there in July 2009, if the estimated 2008 growth rate was 0.88%? A) 2,700,000 B) 5,500,000 C) 303,000,000 D) 304,000,000 E) 2,710,800,000",
    back: "D",
  },
  {
    front:
      "23) In 2008, the population of New Zealand was approximately 4,275,000 people. If the birth rate was 14 births for every 1,000 people, approximately how many births occurred in New Zealand in 2008? A) 6,000 B) 42,275 C) 60,000 D) 140,000 E) 600,000",
    back: "C",
  },
  {
    front:
      "24) Consider two forests: one is an undisturbed old-growth forest, while the other has recently been logged. In which forest are species likely to experience exponential growth, and why? A) Old growth, because of stable conditions that would favor exponential growth of all species in the forest. B) Old growth, because each of the species is well established and can produce many offspring. C) Logged, because the disturbed forest affords more resources for increased specific populations to grow. D) Logged, because the various populations are stimulated to a higher reproductive potential. E) Exponential growth is equally probable in old-growth and logged forests.",
    back: "C",
  },
  {
    front:
      "25) Logistic growth of a population is represented by dN/dt =  A. SEE IMAGE B. SEE IMAGE C. SEE IMAGE D. SEE IMAGE E. SEE IMAGE",
    back: "D",
  },
  {
    front:
      "26) As N approaches K for a certain population, which of the following is predicted by the logistic equation? A) The growth rate will not change. B) The growth rate will approach zero. C) The population will show an Allee effect. D) The population will increase exponentially. E) The carrying capacity of the environment will increase.",
    back: "B",
  },
  {
    front:
      "Please read the paragraph below and review Figure 53.2 to answer the following question.  Researchers in the Netherlands studied the effects of parental care given in European kestrels over five years. The researchers transferred chicks among nests to produce reduced broods (three or four chicks), normal broods (five or six chicks), and enlarged broods (seven or eight chicks). They then measured the percentage of male and female parent birds that survived the following winter. (Both males and females provide care for chicks.)  Figure 53.2: Brood size manipulations in the kestrel: Effects on offspring and parent survival.  58) Which of the following is a conclusion that can be drawn from this graph? A) Female survivability is more negatively affected by larger brood size than is male survivability. B) Male survivability decreased by 50% between reduced and enlarged brood treatments. C) Both males and females had increases in daily hunting with the enlarged brood size. D) There appears to be a negative correlation between brood enlargements and parental survival. E) Chicks in reduced brood treatment received more food, weight gain, and reduced mortality.",
    back: "D",
  },
  {
    front:
      "28) The Allee effect is used to describe a population that A) has become so small that it will have difficulty surviving and reproducing. B) has become so large that it will have difficulty surviving and reproducing. C) is viable and stable at its carrying capacity. D) has exceeded its carrying capacity. E) is in crash decline.",
    back: "A",
  },
  {
    front:
      "29) Carrying capacity is A) seldom reached by marine producers and consumers because of the vast resources of the ocean. B) the maximum population size that a particular environment can support. C) fixed for most species over most of their range most of the time. D) determined by density and dispersion data. E) the term used to describe the stress a population undergoes due to limited resources.",
    back: "B",
  },
  {
    front:
      "30) Which of the following causes populations to shift most quickly from an exponential to a logistic population growth? A) increased birth rate B) removal of predators C) decreased death rate D) competition for resources E) favorable climatic conditions",
    back: "D",
  },
  {
    front:
      "31) Which of the following statements about the evolution of life histories is correct? A) Stable environments with limited resources favor r-selected populations. B) K-selected populations are most often found in environments where density-independent factors are important regulators of population size. C) Most populations have both r- and K-selected characteristics that vary under different environmental conditions. D) The reproductive efforts of r-selected populations are directed at producing just a few offspring with good competitive abilities. E) K-selected populations rarely approach carrying capacity.",
    back: "C",
  },
  {
    front:
      "32) Natural selection involves energetic trade-offs between A) choosing how many offspring to produce over the course of a lifetime and how long to live. B) producing large numbers of gametes when employing internal fertilization versus fewer numbers of gametes when employing external fertilization. C) the emigration of individuals when they are no longer reproductively capable or committing suicide. D) increasing the number of individuals produced during each reproductive episode with a corresponding decrease in parental care. E) high survival rates of offspring and the cost of parental care.",
    back: "E",
  },
  {
    front:
      "33) The three basic variables that make up the life history of an organism are A) life expectancy, birth rate, and death rate. B) number of reproductive females in the population, age structure of the population, and life expectancy. C) age when reproduction begins, how often reproduction occurs, and how many offspring are produced per reproductive episode. D) how often reproduction occurs, life expectancy of females in the population, and number of offspring per reproductive episode. E) the number of reproductive females in the population, how often reproduction occurs, and death rate.",
    back: "C",
  },
  {
    front:
      "34) Which of the following pairs of reproductive strategies is consistent with energetic trade-off and reproductive success? A) Pioneer species of plants produce many very small, highly airborne seeds, whereas large elephants that are very good parents produce many offspring. B) Female rabbits that suffer high predation rates may produce several litters per breeding season, and coconuts produce few fruits, but most survive when they encounter proper growing conditions. C) Species that have to broadcast to distant habitats tend to produce seeds with heavy protective seed coats, and animals that are caring parents produce fewer offspring with lower infant mortality. D) Free-living insects lay thousands of eggs and provide no parental care, whereas flowers take good care of their seeds until they are ready to germinate. E) Some mammals will not reproduce when environmental resources are low so they can survive until conditions get better, and plants that produce many small seeds are likely found in stable environments.",
    back: "B",
  },
  {
    front:
      "35) Pacific salmon and annual plants are excellent examples of A) cohort disintegration. B) dispersion. C) Allee effect. D) iteroparous reproduction. E) semelparous reproduction.",
    back: "E",
  },
  {
    front:
      "36) Which of the following is characteristic of K-selected populations? A) offspring with good chances of survival B) many offspring per reproductive episode C) small offspring D) a high intrinsic rate of increase E) early parental reproduction",
    back: "A",
  },
  {
    front:
      "37) Which variables define the ecological life history of a species? A) the age at which reproduction begins, frequency of reproduction, and the number of offspring for each reproductive episode B) the ratio of females to males, the length of the breeding season, and the number of offspring for each reproductive episode C) the number of offspring produced over a lifetime by a breeding pair and the survivability of the offspring D) timing breeding sessions with optimal environmental conditions and the number of offspring produced during each breeding session E) the amount of parental care given after birth, the number of reproductive episodes per year, and the number of years females are capable of producing viable offspring",
    back: "A",
  },
  {
    front:
      "38) Which pattern of reproduction is correctly paired with a species? A) iteroparityPacific salmon B) iteroparityelephant C) semelparityoak tree D) semelparityrabbit E) semelparity\u2013polar bear",
    back: "B",
  },
  {
    front:
      "39) Often the growth cycle of one population has an effect on the cycle of another. As moose populations increase, for example, wolf populations also increase. Thus, if we are considering the logistic equation for the wolf population,  SEE IMAGE  which of the factors accounts for the effect on the moose population?  A) r B) N C) rN D) K E) dt",
    back: "D",
  },
  {
    front:
      "40) In which of the following situations would you expect to find the largest number of K-selected individuals? A) a recently abandoned agricultural field in Ohio B) the sand dune communities of south Lake Michigan C) the flora and fauna of a coral reef in the Caribbean D) South Florida after a hurricane E) a newly emergent volcanic island",
    back: "C",
  },
  {
    front:
      "41) Which of the following is most likely to contribute to density-dependent regulation of populations? A) the removal of toxic waste by decomposers B) intraspecific competition for nutrients C) earthquakes D) floods E) fires",
    back: "B",
  },
  {
    front:
      "42) Why do populations grow more slowly as they approach their carrying capacity? A) Density-dependent factors lead to fewer births and increased mortality. B) Density-independent factors lead to fewer births and increased mortality. C) Hormonal changes promote higher death rates in crowded populations. D) Individuals voluntarily stop mating so that overcrowding does not occur. E) The incoming energy decreases in populations experiencing a high rate of increase.",
    back: "A",
  },
  {
    front:
      "43) A population of white-footed mice becomes severely overpopulated in a habitat that has been disturbed by human activity. Sometimes intrinsic factors cause the population to increase in mortality and lower reproduction rates to occur in reaction to the stress of overpopulation. Which of the following is an example of intrinsic population control? A) Owl populations frequent the area more often because of increased hunting success. B) Females undergo hormonal changes that delay sexual maturation and many individuals suffer depressed immune systems and die due to the stress of overpopulation. C) Clumped dispersion of the population leads to increased spread of disease and parasites, resulting in a population crash. D) All of the resources (food and shelter) are used up by overpopulation and much of the population dies of exposure and/or starvation. E) Because the individuals are vulnerable they are more likely to die off if a drought or flood were to occur.",
    back: "B",
  },
  {
    front:
      "44) Why is territoriality an adaptive behavior for songbirds maintaining populations at or near their carrying capacity? A) Songbirds expend a tremendous amount of energy defending territories so that they spend less time feeding their young and fledgling mortality increases. B) Only the fittest males defend territories and they attract the fittest females so the best genes are conveyed to the next generation. C) Songbird males defend territories commensurate with the size from which they can derive adequate resources for themselves, their mate, and their chicks. D) Many individuals are killed in the agonistic behaviors that go along with territorial defense. E) Adult songbirds make improvements to the territories they inhabit so that they can produce successfully fledged chicks.",
    back: "C",
  },
  {
    front:
      "45) Which of the following could be a density-independent factor limiting human population growth? A) social pressure for birth control B) earthquakes C) plagues D) famines E) pollution",
    back: "B",
  },
  {
    front:
      "46) An ecological footprint is a construct that is useful A) for a person living in a developed nation to consider to make better choices when using global food and energy resources. B) for a person living in a developing country to see how much of the world's resources are left for him/her. C) in converting human foods' meat biomass to plant biomass. D) in making predictions about the global carrying capacity of humans. E) in determining which nations produce the least amount of carbon dioxide from the burning of fossil fuels.",
    back: "A",
  },
  {
    front:
      "47) Which of the following was the most significant limiting factor in human population growth in the 20th century? A) famine B) non-HIV disease C) HIV D) genocide E) clean water",
    back: "E",
  },
  {
    front:
      "48) Which of the following is most key to understanding the demographic transition in human population growth? A) education of global famine B) improved worldwide health care C) voluntary reduction of family size D) improved sanitary conditions in the world's hospitals E) reduction of casualties of war",
    back: "C",
  },
  {
    front:
      "49) Why does the 2009 U.S. population continue to grow even though the United States has essentially established a ZPG? A) emigration B) immigration C) better sanitation D) baby boomer reproduction E) the 2007-2009 economic recession",
    back: "B",
  },
  {
    front:
      "50) Which statement is true with regard to human population growth? A) It is at a zero reproduction rate. B) Its rate of increase continues to grow at an exponential rate. C) Its rate of growth is slowing. D) Its rate of growth is increasing. E) There is no scientific prediction that can be made about human population growth.",
    back: "C",
  },
  {
    front:
      "51) Which curve best describes survivorship in marine molluscs? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "52) Which curve best describes survivorship in elephants? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "53) Which curve best describes survivorship in a marine crustacean that molts? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "54) Which curve best describes survivorship in humans who live in undeveloped nations? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "55) Which statement best explains survivorship curve B? A) It is likely a species that provides little postnatal care, but lots of care for offspring during midlife as indicated by increased survivorship. B) This curve is likely of a species that produces lots of offspring, only a few of which are expected to survive. C) It is likely a species where no individuals in the cohort die when they are at 60\u201470% relative age. D) There was a mass emigration of young to middle-aged individuals in this cohort. E) Survivorship can only decrease; therefore, this curve could not happen in nature.",
    back: "E",
  },
  {
    front:
      "56) Which of the following graphs illustrates the population growth curve of single bacterium growing in a flask of ideal medium at optimum temperature over a 24-hour period?  A. SEE IMAGE B. SEE IMAGE C. SEE IMAGE D. SEE IMAGE E. SEE IMAGE",
    back: "C",
  },
  {
    front:
      "57) Which of the following graphs illustrates the growth curve of a small population of rodents that has grown to reach a static carrying capacity?",
    back: "E",
  },
  {
    front:
      "Please read the paragraph below and review Figure 53.2 to answer the following question.  Researchers in the Netherlands studied the effects of parental care given in European kestrels over five years. The researchers transferred chicks among nests to produce reduced broods (three or four chicks), normal broods (five or six chicks), and enlarged broods (seven or eight chicks). They then measured the percentage of male and female parent birds that survived the following winter. (Both males and females provide care for chicks.)  Figure 53.2: Brood size manipulations in the kestrel: Effects on offspring and parent survival.  58) Which of the following is a conclusion that can be drawn from this graph? A) Female survivability is more negatively affected by larger brood size than is male survivability. B) Male survivability decreased by 50% between reduced and enlarged brood treatments. C) Both males and females had increases in daily hunting with the enlarged brood size. D) There appears to be a negative correlation between brood enlargements and parental survival. E) Chicks in reduced brood treatment received more food, weight gain, and reduced mortality.",
    back: "D",
  },
  {
    front:
      "59) Which of the following is a likely graphic outcome of a population of deer introduced to an island with an adequate herbivory and without natural predators, parasites, or disease?  A. SEE IMAGE B. SEE IMAGE C. SEE IMAGE D. SEE IMAGE E. SEE IMAGE",
    back: "A",
  },
  {
    front:
      "60) Which of the following graphs illustrates the growth over several seasons of a population of snowshoe hares that were introduced to an appropriate habitat also inhabited by predators in northern Canada?",
    back: "D",
  },
  {
    front:
      "The following questions refer to Figure 53.3, which depicts the age structure of three populations.  61) Which population(s) is (are) in the process of decreasing? A) I B) II C) III D) I and II E) II and III",
    back: "B",
  },
  {
    front:
      "The following questions refer to Figure 53.3, which depicts the age structure of three populations.  62) Which population(s) appear(s) to be stable? A) I B) II C) III D) I and II E) II and III",
    back: "C",
  },
  {
    front:
      "The following questions refer to Figure 53.3, which depicts the age structure of three populations.  63) Assuming these age-structure diagrams describe human populations, in which population is unemployment likely to be a societal issue in the future? A) I B) II C) III D) No differences in the magnitude of future unemployment would be expected among these populations. E) It is not possible to infer anything about future social conditions from age-structure diagrams.",
    back: "A",
  },
  {
    front:
      "The following questions refer to Figure 53.3, which depicts the age structure of three populations.  64) Assuming these age-structure diagrams describe human populations, which population(s) is (are) likely to experience zero population growth (ZPG)? A) I B) II C) III D) I and II E) II and III",
    back: "C",
  },
  {
    front:
      "Refer to Figure 53.4 and then answer the following questions.  Figure 53.4: Infant mortality and life expectancy at birth in developed and developing countries (data as of 2005).  65) What is a logical conclusion that can be drawn from the graphs above? A) Developed countries have lower infant mortality rates and lower life expectancy than developing countries. B) Developed countries have higher infant mortality rates and lower life expectancy than developing countries. C) Developed countries have lower infant mortality rates and higher life expectancy than developing countries. D) Developed countries have higher infant mortality rates and higher life expectancy than developing countries. E) Developed countries have a life expectancy that is about 42 years more than life expectancy in developing countries.",
    back: "C",
  },
  {
    front:
      "Refer to Figure 53.4 and then answer the following questions.  Figure 53.4: Infant mortality and life expectancy at birth in developed and developing countries (data as of 2005).  66) In terms of demographics, which country is likely to experience the greatest population growth problem over the next ten years? A) Mexico, because there are fewer pre-reproductive individuals in their population B) China, whose population is more than a billion, but whose expected fertility rate is 1.8 children C) Germany, where the growth rate of the population is 0.1% per year D) United States (2009 population ~ 205,000,000, where 200,000 Americans are added to the population each day) E) Afghanistan, with a 3.85 annual growth rate",
    back: "E",
  },
  {
    front:
      "67) To measure the population of lake trout in a 250-hectare lake, 400 individual trout were netted and marked with a fin clip, then returned to the lake. The next week, the lake was netted again, and out of the 200 lake trout that were caught, 50 had fin clips. Using the capture-recapture estimate, the lake trout population size could be closest to which of the following? A) 160 B) 200 C) 400 D) 1,600 E) 80,000",
    back: "D",
  },
  {
    front:
      "68) Your friend comes to you with a problem. It seems his shrimp boats aren't catching nearly as much shrimp as they used to. He can't understand why because he used to catch all the shrimp he could handle. Each year he added a new boat, and for a long time each boat caught tons of shrimp. As he added more boats, there came a time when each boat caught somewhat fewer shrimp, and now, each boat is catching a lot less shrimp. Which of the following topics might help your friend understand the source of his problem? A) density-dependent population regulation and intrinsic characteristics of population growth B) exponential growth curves and unlimited environmental resources C) density-independent population regulation and chance occurrence D) pollution effects of a natural environment and learned shrimp behavior E) a K-selected population switching to an r-selected population",
    back: "A",
  },
  {
    front:
      '69) Imagine that you are managing a large game ranch. You know from historical accounts that a species of deer used to live there, but they have been extirpated. You decide to reintroduce them. After doing some research to determine what might be an appropriately sized founding population, you do so. You then watch the population increase for several generations, and graph the number of individuals (vertical axis) against the number of generations (horizontal axis). The graph will likely appear as A) a diagonal line, getting higher with each generation. B) an "S," increasing with each generation. C) an upside-down "U." D) a "J," increasing with each generation. E) an "S" that ends with a vertical line.',
    back: "D",
  },
  {
    front:
      "70) Population ecologists follow the fate of same-age cohorts to A) determine a population's carrying capacity. B) determine the birth rate and death rate of each group in a population. C) determine if a population is regulated by density-dependent processes. D) determine the factors that regulate the size of a population. E) determine if a population's growth is cyclic.",
    back: "B",
  },
  {
    front:
      "71) A population's carrying capacity A) may change as environmental conditions change. B) can be accurately calculated using the logistic growth model. C) generally remains constant over time. D) increases as the per capita growth rate (r) decreases. E) can never be exceeded.",
    back: "A",
  },
  {
    front:
      "72) Scientific study of the population cycles of the snowshoe hare and its predator, the lynx, has revealed that A) the prey population is controlled by predators alone. B) hares and lynx are so mutually dependent that each species cannot survive without the other. C) multiple biotic and abiotic factors contribute to the cycling of the hare and lynx populations. D) both hare and lynx populations are regulated mainly by abiotic factors. E) the hare population is r-selected and the lynx population is K-selected.",
    back: "C",
  },
  {
    front:
      "73) Based on current growth rates, Earth's human population in 2012 will be closest to A) 2 million. B) 3 billion. C) 4 billion. D) 7 billion. E) 10 billion.",
    back: "D",
  },
  {
    front:
      "74) A recent study of ecological footprints concluded that A) Earth's carrying capacity for humans is about 10 billion. B) Earth's carrying capacity would increase if per capita meat consumption increased. C) current demand by industrialized countries for resources is much smaller than the ecological footprint of those countries. D) it is not possible for technological improvements to increase Earth's carrying capacity for humans. E) the ecological footprint of the United States is large because per capita resource use is high.",
    back: "E",
  },
  {
    front:
      "75) The observation that members of a population are uniformly distributed suggests that A) the size of the area occupied by the population is increasing. B) resources are distributed unevenly. C) the members of the population are competing for access to a resource. D) the members of the population are neither attracted to nor repelled by one another. E) the density of the population is low.",
    back: "C",
  },
  {
    front:
      "76) According to the logistic growth equation  SEE IMAGE  A) the number of individuals added per unit time is greatest when N is close to zero. B) the per capita growth rate (r) increases as N approaches K. C) population growth is zero when N equals K. D) the population grows exponentially when K is small. E) the birth rate (b) approaches zero as N approaches K.",
    back: "C",
  },
  {
    front:
      "77) Which pair of terms most accurately describes life history traits for a stable population of wolves? A) semelparous; r-selected B) semelparous; K-selected C) iteroparous; r-selected D) iteroparous; K-selected E) iteroparous; N-selected",
    back: "D",
  },
  {
    front:
      "78) During exponential growth, a population always A) grows by thousands of individuals. B) grows at its maximum per capita rate. C) quickly reaches its carrying capacity. D) cycles through time. E) loses some individuals to emigration.",
    back: "B",
  },
  {
    front:
      "79) Which of the following statements about human population in industrialized countries is incorrect? A) Life history is r-selected. B) Average family size is relatively small. C) The population has undergone the demographic transition. D) The survivorship curve is Type I. E) Age distribution is relatively uniform.",
    back: "A",
  },
  {
    front:
      "1) Which of the following statements is consistent with the principle of competitive exclusion? A) Bird species generally do not compete for nesting sites. B) The random distribution of one competing species will have a positive impact on the population growth of the other competing species. C) Two species with the same fundamental niche will exclude other competing species. D) Even a slight reproductive advantage will eventually lead to the elimination of the less well adapted of two competing species. E) Natural selection tends to increase competition between related species.",
    back: "D",
  },
  {
    front:
      "2) According to the competitive exclusion principle, two species cannot continue to occupy the same A) habitat. B) niche. C) territory. D) range. E) biome.",
    back: "B",
  },
  {
    front:
      "3) Which of the following best describes resource partitioning? A) competitive exclusion that results in the success of the superior species B) slight variations in niche that allow similar species to coexist C) two species that can coevolve to share identical niches D) differential resource utilization that results in a decrease in community species diversity E) a climax community that is reached when no new niches are available",
    back: "B",
  },
  {
    front:
      "4) As you study two closely related predatory insect species, the two-spot and the three-spot avenger beetles, you notice that each species seeks prey at dawn in areas without the other species. However, where their ranges overlap, the two-spot avenger beetle hunts at night and the three-spot hunts in the morning. When you bring them into the laboratory and isolate the two different species, you discover that the offspring of both species are found to be nocturnal. You have discovered an example of A) mutualism. B) character displacement. C) Batesian mimicry. D) facultative commensalism. E) resource partitioning.",
    back: "E",
  },
  {
    front:
      "5) Resource partitioning would be most likely to occur between A) sympatric populations of a predator and its prey. B) sympatric populations of species with similar ecological niches. C) sympatric populations of a flowering plant and its specialized insect pollinator. D) allopatric populations of the same animal species. E) allopatric populations of species with similar ecological niches.",
    back: "B",
  },
  {
    front:
      "6) Which of the following is an example of cryptic coloration? A) bands on a coral snake B) brown or gray color of tree bark C) markings of a viceroy butterfly's wings D) colors of an insect-pollinated flower's petals E) a \"walking stick\" insect that resembles a twig",
    back: "E",
  },
  {
    front:
      "7) Which of the following is an example of M\u00fcllerian mimicry? A) two species of unpalatable butterfly that have the same color pattern B) a day-flying hawkmoth that looks like a wasp C) a chameleon that changes its color to look like a dead leaf D) two species of rattlesnakes that both rattle their tails E) two species of moths with wing spots that look like owl's eyes",
    back: "A",
  },
  {
    front:
      "8) Which of the following is an example of Batesian mimicry? A) an insect that resembles a twig B) a butterfly that resembles a leaf C) a nonvenomous snake that looks like a venomous snake D) a fawn with fur coloring that camouflages it in the forest environment E) a snapping turtle that uses its tongue to mimic a worm, thus attracting fish",
    back: "C",
  },
  {
    front:
      "9) Which of the following is an example of aposematic coloration? A) stripes of a skunk B) eye color in humans C) green color of a plant D) colors of an insect-pollinated flower E) a katydid whose wings look like a dead leaf",
    back: "A",
  },
  {
    front:
      "10) Dwarf mistletoes are flowering plants that grow on certain forest trees. They obtain nutrients and water from the vascular tissues of the trees. The trees derive no known benefits from the dwarf mistletoes. Which of the following best describes the interactions between dwarf mistletoes and trees? A) mutualism B) parasitism C) commensalism D) facilitation E) competition",
    back: "B",
  },
  {
    front:
      "11) Evidence shows that some grasses benefit from being grazed. Which of the following terms would best describe this plant-herbivore interaction? A) mutualism B) commensalism C) parasitism D) competition E) predation",
    back: "A",
  },
  {
    front:
      "12) Which of the following would be most significant in understanding the structure of an ecological community? A) determining how many species are present overall B) determining which particular species are present C) determining the kinds of interactions that occur among organisms of different species D) determining the relative abundance of species E) determining how many species are present overall, which particular species are present, the kinds of interactions that occur among organisms of different species, and the relative abundance of species",
    back: "E",
  },
  {
    front:
      "13) Which of the following studies would a community ecologist undertake to learn about competitive interactions? A) selectivity of nest sites among cavity-nesting songbirds B) the grass species preferred by grazing pronghorn antelope and bison C) nitrate and phosphate uptake by various hardwood forest tree species D) stomach analysis of brown trout and brook trout in streams where they coexist E) selectivity of nest sites among cavity-nesting songbirds, the grass species preferred by grazing pronghorn antelope and bison, nitrate and phosphate uptake by various hardwood forest tree species, and stomach analysis of brown trout and brook trout in streams where they coexist",
    back: "E",
  },
  {
    front:
      "14) White-breasted nuthatches and Downy woodpeckers both eat insects that hide in the furrows of bark in hardwood trees. The Downy woodpecker searches for insects by hunting from the bottom of the tree trunk to the top, whereas the white-breasted nuthatch searches from the top of the trunk down. These hunting behaviors best illustrate which of the following ecological concepts? A) competitive exclusion B) resource partitioning C) character displacement D) keystone species E) bottom-up and top-down hypotheses",
    back: "B",
  },
  {
    front:
      "15) Monarch butterflies are protected from birds and other predators because of cardiac glycosides they incorporate into their tissues from eating milkweed when they were in their caterpillar stage. The wings of a different species of butterfly, the Viceroy, look nearly identical to the Monarch so predators that have learned not to eat the bad-tasting Monarch avoid Viceroys as well. This example best describes A) aposmatic coloration. B) cryptic coloration. C) Batesian mimicry. D) M\u00fcllerian mimicry. E) mutualism.",
    back: "C",
  },
  {
    front:
      "16) Prairie dogs once covered the expanses of the Great Plains. Their grazing made the grass more nutritious for the huge herds of bison, and they were preyed upon by a variety of snakes, raptors, and mammals. In fact, the black-footed ferret (now endangered) specialized in prairie dog predation. Today, increases in housing and agricultural developments have eradicated many prairie dog towns. Which of the following statements about prairie dogs is true? A) Their realized niche has expanded. B) They have a competitive relationship with bison. C) They are probably a poor candidate for keystone species. D) Their fundamental niche has been compromised. E) Their fundamental niche has expanded.",
    back: "E",
  },
  {
    front:
      "17) Which statement best describes the evolutionary significance of mutualism? A) Mutualism offers more biodiversity to a community. B) Individuals partaking in a mutualistic relationship are more resistant to parasites. C) Interaction increases the survival and reproductive rates of mutualistic species. D) Mutualistic interaction lessens competition in communities where it is present. E) Mutualistic relationships allow organisms to synthesize and use energy more efficiently.",
    back: "C",
  },
  {
    front:
      "18) How might an ecologist test whether a species is occupying its realized or its fundamental niche? A) Study the temperature range and humidity requirements of the species. B) Observe if the niche size changes after the addition of nutritional resources to the habitat. C) Observe if the niche size changes after the introduction of a similar non-native species. D) Measure the change in reproductive success when the species is subjected to environmental stress. E) Remove a competitor species to see if the species expands its range.",
    back: "E",
  },
  {
    front:
      "19) What percent of all species on Earth are parasites? A) 1% B) 5% C) 25% D) 33 1/3% E) 50%",
    back: "D",
  },
  {
    front:
      "20) Which of the following terms is used by ecologists to describe the community interaction where one organism makes the environment more suitable for another organism? A) parasitism B) mutualism C) inhibition D) facilitation E) commensalism",
    back: "D",
  },
  {
    front:
      '21) How did Eugene Odum describe an ecological niche? A) the "address" of an organism B) an entity that is synonymous with an organism\'s specific trophic level C) an organism\'s "profession" in the community D) the organism\'s role in recycling nutrients in its habitat E) the interactions of the organism with other members of the community',
    back: "C",
  },
  {
    front:
      "22) Approximately how many kg of carnivore biomass can be supported by a field plot containing 1,000 kg of plant material? A) 10,000 B) 1,000 C) 100 D) 10 E) 1",
    back: "D",
  },
  {
    front:
      "23) The energetic hypothesis and dynamic stability hypothesis are ideas that attempt to explain A) plant defenses against herbivores. B) the length of food chains. C) the evolution of mutualism. D) resource partitioning. E) competitive exclusion.",
    back: "B",
  },
  {
    front:
      "24) In a tide pool, 15 species of invertebrates were reduced to eight after one species was removed. The species removed was likely a(n) A) pathogen. B) keystone species. C) herbivore. D) resource partitioner. E) mutualistic organism.",
    back: "B",
  },
  {
    front:
      "25) Elephants are not the most dominant species in African grasslands, yet they influence community structure. The grasslands contain scattered woody plants, but they are kept in check by the uprooting activities of the elephants. Take away the elephants, and the grasslands convert to forests or to shrublands. The newly growing forests support fewer species than the previous grasslands. Which of the following describes why elephants are the keystone species in this scenario? A) Essentially all of the other species depend on the presence of the elephants to maintain the community. B) Grazing animals depend upon the elephants to convert forests to grassland. C) Elephants prevent drought in African grasslands. D) Elephants are the biggest herbivore in this community. E) Elephants help other populations survive by keeping out many of the large African predators.",
    back: "A",
  },
  {
    front:
      "26) According to bottom-up and top-down control models of community organization, which of the following expressions would imply that an increase in the size of a carnivore (C) population would negatively impact on its prey (P) population, but not vice versa? A) P \u2190 C B) P \u2192 C C) C \u2194 P D) P \u2190 C \u2192 P E) C \u2190 P \u2192 C",
    back: "A",
  },
  {
    front:
      "27) Which of the following is the most accepted hypothesis as to why invasive species take over communities into which they have been introduced? A) Invasive species are more aggressive than native species in competing for the limited resources of the environment. B) Invasive species are not held in check by the predators and agents of disease that have always been in place for the native species. C) Humans carefully select which species will outcompete nuisance native species. D) Invasive species have a higher reproductive potential than native species. E) Invasive species come from geographically isolated regions, so when they are introduced to regions where there is more competition, they thrive.",
    back: "B",
  },
  {
    front:
      "28) Biomanipulation can best be described as A) removing many of the next higher trophic level organisms so that the struggling trophic level below can recover. B) a means of reversing the effects of pollution by applying antidote chemicals that have a neutralizing effect on the community. C) an example of how one would use the bottom-up model for community restoration. D) adjusting the numbers of each of the trophic levels back to the numbers that they were before human disturbance. E) monitoring and adjusting the nutrient and energy flow through a community with new technologies.",
    back: "A",
  },
  {
    front:
      "29) Imagine five forest communities, each with 100 individuals distributed among four different tree species (W, X, Y, and Z). Which forest community would be most diverse? A) 25W, 25X, 25Y, 25Z B) 40W, 30X, 20Y, 10Z C) 50W, 25X, 15Y, 10Z D) 70W, 10X, 10Y, 10Z E) 100W, 0X, 0Y, 0Z",
    back: "A",
  },
  {
    front:
      "30) Why are food chains relatively short? A) Top-level feeders tend to be more numerous than lower-trophic-level species. B) Top-level feeders tend to be small but are capable of conserving more energy. C) Longer chains are less stable and energy transfer between levels is inefficient. D) There are only so many organisms that are adapted to feed on other types of organisms. E) Food chain length is ultimately determined by the photosynthetic efficiency of producers.",
    back: "C",
  },
  {
    front:
      "31) Which term do ecologists use to describe the ability of a community either to resist change or to recover to its original state after change? A) stability B) succession C) partitioning D) productivity E) competitive exclusion",
    back: "A",
  },
  {
    front:
      "32) According to the nonequilibrium model, A) communities will remain in a climax state if there are no human disturbances. B) community structure remains stable in the absence of interspecific competition. C) communities are assemblages of closely linked species that are irreparably changed by disturbance. D) interspecific interactions induce changes in community composition over time. E) communities are constantly changing after being influenced by disturbances.",
    back: "E",
  },
  {
    front:
      "33) In a particular case of secondary succession, three species of wild grass all invaded a field. By the second season, a single species dominated the field. A possible factor in this secondary succession was A) equilibrium. B) facilitation. C) immigration. D) inhibition. E) parasitism.",
    back: "D",
  },
  {
    front:
      "34) The 1988 Yellowstone National Park lodgepole pine forest fires were likely the result of A) overgrazing by elk. B) infrequent rain episodes. C) years of fire suppression by humans. D) unextinguished campfires. E) geysers.",
    back: "C",
  },
  {
    front:
      "35) Why do moderate levels of disturbance result in an increase in community diversity? A) Habitats are opened up for less competitive species. B) Competitively dominant species infrequently exclude less competitive species after a moderate disturbance. C) The environmental conditions become optimal. D) The resulting uniform habitat supports stability, which in turn supports diversity. E) Less-competitive species evolve strategies to compete with dominant species.",
    back: "A",
  },
  {
    front:
      "36) Species richness increases A) as we increase in altitude in equatorial mountains. B) as we travel southward from the North Pole. C) on islands as distance from the mainland increases. D) as depth increases in aquatic communities. E) as community size decreases.",
    back: "B",
  },
  {
    front:
      "37) There are more species in tropical areas than in places more distant from the equator. This is probably a result of A) fewer predators. B) more intense annual solar radiation. C) more frequent ecological disturbances. D) fewer agents of disease. E) fewer predators, more intense annual solar radiation, more frequent ecological disturbances, and fewer agents of disease.",
    back: "B",
  },
  {
    front:
      "38) A community's actual evapotranspiration is a reflection of A) solar radiation, temperature, and water availability. B) the number of plants and how much moisture they lose. C) the depth of the water table. D) wind speed and the frequency of wind gusts. E) plant biomass and plant water content.",
    back: "A",
  },
  {
    front:
      "39) Why do tropical communities tend to have greater species diversity than temperate or polar communities? A) They are less likely to be affected by human disturbance. B) There are fewer parasites to negatively affect the health of tropical communities. C) Tropical communities are low in altitude, whereas temperate and polar communities are high in altitude. D) Tropical communities are generally older than temperate and polar communities. E) More competitive dominant species have evolved in temperate and polar communities.",
    back: "D",
  },
  {
    front:
      "40) Which of the following is a correct statement about the McArthur/Wilson Island Equilibrium Model? A) The more species that inhabit an island, the lower the extinction rate. B) As the number of species on an island increases, the emigration rate decreases. C) Competitive exclusion is less likely on an island that has large numbers of species. D) Small islands receive few new immigrant species. E) Islands closer to the mainland have higher extinction rates.",
    back: "D",
  },
  {
    front:
      "41) Which of the following best describes the consequences of white-band disease in Caribbean coral reefs? A) Staghorn coral has been decimated by the pathogen, and Elkhorn coral has taken its place. B) Key habitat for lobsters, snappers, and other reef fishes has improved. C) Algal species take the place of the dead coral, and the fish community is dominated by herbivores. D) Algal species take over and the overall reef diversity increases due to increases in primary productivity. E) Other coral species take the place of the affected Staghorn and Elkhorn species.",
    back: "C",
  },
  {
    front:
      "42) Zoonotic disease A) is caused by suborganismal pathogens such as viruses, viroids, and prions only. B) is caused by pathogens that are transferred from other animals to humans by direct contact or by means of a vector. C) can only be spread from animals to humans through direct contact. D) can only be transferred from animals to humans by means of an intermediate host. E) is too specific to study at the community level, and studies of zoonotic pathogens are relegated to organismal biology.",
    back: "B",
  },
  {
    front:
      "43) Of the following zoonotic diseases, which is most likely to be studied by a community ecologist? A) mad cow disease B) hantavirus C) AIDS D) avian flu E) trichinosis",
    back: "D",
  },
  {
    front:
      "44) Which of the following studies would shed light on the mechanism of spread of H5N1 from Asia? A) Perform cloacal or saliva smears of migrating waterfowl to monitor whether any infected birds show up in Alaska. B) Test fecal samples for H5N1 in Asian waterfowl that live near domestic poultry farms in Asia. C) Test for the presence of H5N1 in poultry used for human consumption worldwide. D) Locate and destroy birds infected with H5N1 in Asian open-air poultry markets. E) Keep domestic and wild fowl from interacting with each other to minimize the probability that wild fowl could get infected and migrate out of Asia.",
    back: "A",
  },
  {
    front:
      "45) Why is a pathogen generally more virulent in a new habitat? A) More pathogens tend to immigrate into newer habitats. B) Intermediate host species are more motile and transport pathogens to new areas. C) Pathogens evolve more efficient forms of reproduction in new environments. D) Hosts in new environments have not had a chance to become resistant to the pathogen through natural selection. E) New environments are almost always smaller in area so that transmission of pathogens is easily accomplished between hosts.",
    back: "D",
  },
  {
    front:
      "46) In terms of community ecology, why are pathogens more virulent now than ever before? A) More new pathogens have recently evolved. B) Host organisms have become more susceptible because of weakened immune systems. C) Human activities are transporting pathogens globally at an unprecedented rate. D) Medicines for treating pathogenic disease are in short supply. E) Sequencing of genes in pathogenic organisms is particularly difficult.",
    back: "C",
  },
  {
    front:
      "47) The oak tree pathogen, Phytophthora ramorum, has migrated 650 km in 10 years. West Nile virus spread from New York State to 46 other states in 5 years. The difference in the rate of spread is probably related to A) the lethality of each pathogen. B) the mobility of their hosts. C) the fact that viruses are very small. D) innate resistance. E) dormancy viability.",
    back: "B",
  },
  {
    front:
      "48) During the course of the formation of a parasite/host relationship, a critical first step in this evolution would be A) changing the behavior of the host or intermediate host. B) developing asexual reproduction. C) deriving nourishment without killing the host. D) starting as an ectoparasite and then later becoming an endoparasite. E) utilizing heterotropic nutrition during infection and autotrophic nutrition during dormancy.",
    back: "C",
  },
  {
    front:
      "49) Which of the following statements is a valid conclusion of this experiment? A) Balanus can only survive in the lower intertidal zone, because it is unable to resist desiccation. B) Balanus is inferior to Chthamalus in competing for space on intertidal zone rocks. C) The two species of barnacles do not compete with each other because they feed at different times of day. D) When Balanus is removed, it can be observed that the realized niche of Chthamalus is smaller than its fundamental niche. E) These two species of barnacle do not show competitive exclusion. F) If Chthamalus were removed, Balanus's fundamental niche would become larger.",
    back: "D",
  },
  {
    front:
      "50) Connell conducted this experiment to learn more about A) character displacement in the color of barnacles. B) habitat preference in two different species of barnacles. C) desiccation resistance and barnacle species. D) how sea-level changes affect barnacle distribution. E) competitive exclusion and distribution of barnacle species.",
    back: "E",
  },
  {
    front:
      "51) According to the Shannon Diversity Index, which block would show the greatest diversity? A) 1 B) 2 C) 3 D) 4 E) 5",
    back: "E",
  },
  {
    front:
      "Use the following diagram of a hypothetical food web to answer the following question. The arrows represent the transfer of food energy between the various trophic levels.  Figure 54.3  52) Which letter represents an organism that could be a carnivore? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "Use the following diagram of a hypothetical food web to answer the following question. The arrows represent the transfer of food energy between the various trophic levels.  Figure 54.3  53) Which letter represents an organism that could be a producer? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Use the following diagram of a hypothetical food web to answer the following question. The arrows represent the transfer of food energy between the various trophic levels.  Figure 54.3  54) Which letter represents an organism that could be a primary consumer? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "Use the following diagram of five islands formed at around the same time near a particular mainland, as well as MacArthur and Wilson's island biogeography principles, to answer the following question.  Figure 54.4  55) Which island would likely have the greatest species diversity? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "Use the following diagram of five islands formed at around the same time near a particular mainland, as well as MacArthur and Wilson's island biogeography principles, to answer the following question.  Figure 54.4  56) Which island would likely exhibit the most impoverished species diversity? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "Use the following diagram of five islands formed at around the same time near a particular mainland, as well as MacArthur and Wilson's island biogeography principles, to answer the following question.  Figure 54.4  57) Which island would likely have the lowest extinction rate? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "The next question presumes that you have at least once visited and have some knowledge of the fast-food restaurant McDonald's. Use your knowledge of McDonald's and your understanding of community ecology to answer the following questions about an ecological community, McDonaldland.  58) In McDonaldland, which of the following would be an example of an introduced species? A) Big Mac B) Quarter Pounder C) BK Whopper D) Filet-O-Fish E) Double Cheeseburger",
    back: "C",
  },
  {
    front:
      "The next question presumes that you have at least once visited and have some knowledge of the fast-food restaurant McDonald's. Use your knowledge of McDonald's and your understanding of community ecology to answer the following questions about an ecological community, McDonaldland.  59) Which of the following would be considered a keystone species in McDonaldland? A) Big Mac B) Large French Fries C) Premium Caesar Salad with Crispy Chicken D) Filet-O-Fish E) Chicken McNuggets",
    back: "A",
  },
  {
    front:
      "The next question presumes that you have at least once visited and have some knowledge of the fast-food restaurant McDonald's. Use your knowledge of McDonald's and your understanding of community ecology to answer the following questions about an ecological community, McDonaldland.  60) Which two \"species\" are likely to compete for the same ecological niche? A) Big Mac and Quarter Pounder B) French Fries and Hash Browns C) Premium Caesar Salad with Crispy Chicken and Premium Crispy Chicken Classic Sandwich D) Filet-O-Fish and Double Cheeseburger E) No two species can ever occupy the same ecological niche.",
    back: "E",
  },
  {
    front:
      "The next question presumes that you have at least once visited and have some knowledge of the fast-food restaurant McDonald's. Use your knowledge of McDonald's and your understanding of community ecology to answer the following questions about an ecological community, McDonaldland.  61) According to the McDonaldland scenario, which of the following would best define an ecological community? A) all of the sandwiches sold at McDonaldland B) the entire menu at McDonaldland C) all of the fast-food restaurants in the United States D) the condiments served at McDonaldland E) the breakfast menu at McDonaldland",
    back: "B",
  },
  {
    front:
      "The next question presumes that you have at least once visited and have some knowledge of the fast-food restaurant McDonald's. Use your knowledge of McDonald's and your understanding of community ecology to answer the following questions about an ecological community, McDonaldland.  62) In a two-week marketing analysis, McDonald's was interested in finding out the popularity of the Big Mac. Using the realized/fundamental niche concept of community ecology, what should the marketing researchers do? A) Study the sales of McDonald's restaurants that are in close proximity to other fast-food restaurants. B) Serve only Big Macs at McDonald's and analyze the sales. C) Remove the Quarter Pounder from the menu and see if Big Mac sales increase. D) Serve Big Macs without the special sauce to see if sales go down. E) Serve Big Macs during breakfast hours.",
    back: "C",
  },
  {
    front:
      'The symbols +, -, and o are to be used to show the results of interactions between individuals and groups of individuals in the examples that follow. The symbol + denotes a positive interaction, - denotes a negative interaction, and o denotes where individuals are not affected by interacting. The first symbol refers to the first organism mentioned.  63) What interactions exist between a "carrier crab" and "sea urchin hitch-hiker"? A) +/+ B) +/o C) +/- D) o/o E) -/-',
    back: "A",
  },
  {
    front:
      "The symbols +, -, and o are to be used to show the results of interactions between individuals and groups of individuals in the examples that follow. The symbol + denotes a positive interaction, - denotes a negative interaction, and o denotes where individuals are not affected by interacting. The first symbol refers to the first organism mentioned.  64) What interactions exist between the cattle egret and grazing cattle? A) +/+ B) +/o C) +/- D) o/o E) -/-",
    back: "B",
  },
  {
    front:
      "The symbols +, -, and o are to be used to show the results of interactions between individuals and groups of individuals in the examples that follow. The symbol + denotes a positive interaction, - denotes a negative interaction, and o denotes where individuals are not affected by interacting. The first symbol refers to the first organism mentioned.  65) What interactions exist between a lion pride and a hyena pack? A) +/+ B) +/o C) +/- D) o/o E) -/-",
    back: "E",
  },
  {
    front:
      "The symbols +, -, and o are to be used to show the results of interactions between individuals and groups of individuals in the examples that follow. The symbol + denotes a positive interaction, - denotes a negative interaction, and o denotes where individuals are not affected by interacting. The first symbol refers to the first organism mentioned.  66) What interactions exist between a bee and a flower? A) +/+ B) +/o C) +/- D) o/o E) -/-",
    back: "A",
  },
  {
    front:
      "The symbols +, -, and o are to be used to show the results of interactions between individuals and groups of individuals in the examples that follow. The symbol + denotes a positive interaction, - denotes a negative interaction, and o denotes where individuals are not affected by interacting. The first symbol refers to the first organism mentioned.  67) What interactions exist between a tick on a dog and the dog? A) +/+ B) +/o C) +/- D) o/o E) -/-",
    back: "C",
  },
  {
    front:
      "The symbols +, -, and o are to be used to show the results of interactions between individuals and groups of individuals in the examples that follow. The symbol + denotes a positive interaction, - denotes a negative interaction, and o denotes where individuals are not affected by interacting. The first symbol refers to the first organism mentioned.  68) What interactions exist between cellulose-digesting organisms in the gut of a termite and the termite? A) +/+ B) +/o C) +/- D) o/o E) -/-",
    back: "A",
  },
  {
    front:
      "The symbols +, -, and o are to be used to show the results of interactions between individuals and groups of individuals in the examples that follow. The symbol + denotes a positive interaction, - denotes a negative interaction, and o denotes where individuals are not affected by interacting. The first symbol refers to the first organism mentioned.  69) What interactions exist between mycorrhizae and evergreen tree roots? A) +/+ B) +/o C) +/- D) o/o E) -/-",
    back: "A",
  },
  {
    front:
      "70) The feeding relationships among the species in a community determine the community's A) secondary succession. B) ecological niche. C) species richness. D) species-area curve. E) trophic structure.",
    back: "E",
  },
  {
    front:
      "71) The principle of competitive exclusion states that A) two species cannot coexist in the same habitat. B) competition between two species always causes extinction or emigration of one species. C) competition in a population promotes survival of the best-adapted individuals. D) two species that have exactly the same niche cannot coexist in a community. E) two species will stop reproducing until one species leaves the habitat.",
    back: "D",
  },
  {
    front:
      "72) Based on the intermediate disturbance hypothesis, a community's species diversity is increased by A) frequent massive disturbance. B) stable conditions with no disturbance. C) moderate levels of disturbance. D) human intervention to eliminate disturbance. E) intensive disturbance by humans.",
    back: "C",
  },
  {
    front:
      "73) According to the equilibrium model of island biogeography, species richness would be greatest on an island that is A) large and close to a mainland. B) large and remote. C) small and remote. D) small and close to a mainland. E) environmentally homogeneous.",
    back: "A",
  },
  {
    front:
      "74) Keystone predators can maintain species diversity in a community if they A) competitively exclude other predators. B) prey on the community's dominant species. C) allow immigration of other predators. D) reduce the number of disruptions in the community. E) prey only on the least abundant species in the community.",
    back: "B",
  },
  {
    front:
      "75) Food chains are sometimes short because A) only a single species of herbivore feeds on each plant species. B) local extinction of a species causes extinction of the other species in its food chain. C) most of the energy in a trophic level is lost as it passes to the next higher level. D) predator species tend to be less diverse and less abundant than prey species. E) most producers are inedible.",
    back: "C",
  },
  {
    front:
      "76) Which of the following could qualify as a top-down control on a grassland community? A) limitation of plant biomass by rainfall amount B) influence of temperature on competition among plants C) influence of soil nutrients on the abundance of grasses versus wildflowers D) effect of grazing intensity by bison on plant species diversity E) effect of humidity on plant growth rates",
    back: "D",
  },
  {
    front:
      "77) The most plausible hypothesis to explain why species richness is higher in tropical than in temperate regions is that A) tropical communities are younger. B) tropical regions generally have more available water and higher levels of solar radiation. C) higher temperatures cause more rapid speciation. D) diversity increases as evapotranspiration decreases. E) tropical regions have very high rates of immigration and very low rates of extinction.",
    back: "B",
  },
  {
    front:
      "1) How do the Taylor Glacier bacteria produce their energy? A) photosynthesis B) heterotrophism C) chemoautotrophism D) thermophobism E) chemosynthesis",
    back: "C",
  },
  {
    front:
      "2) In ecosystems, why is the term cycling used to describe material transfer, whereas the term flow is used for energy exchange? A) Materials are repeatedly used, but energy flows through and out of ecosystems. B) Both material and energy are recycled and are then transferred to other ecosystems as in a flow. C) Materials are cycled into ecosystems from other ecosystems, but energy constantly flows within the ecosystem. D) Both material and energy flow in a never-ending stream within an ecosystem. E) None of the choices is correct.",
    back: "A",
  },
  {
    front:
      "3) Which statement most accurately describes how matter and energy are used in ecosystems? A) Matter is cycled through ecosystems; energy is not. B) Energy is cycled through ecosystems; matter is not. C) Energy can be converted into matter; matter cannot be converted into energy. D) Matter can be converted into energy; energy cannot be converted into matter. E) Matter is used in ecosystems; energy is not.",
    back: "A",
  },
  {
    front:
      "4) The law of conservation of matter states that matter cannot be created, yet matter is sometimes gained or lost to an ecosystem. What is the reason for this seeming contradiction? A) Chemoautotrophic organisms can convert matter to energy. B) Matter can be moved in/out of an ecosystem from/to another ecosystem. C) Photosynthetic organisms convert solar energy to sugars. D) Detrivores convert matter to energy. E) Heterotrophs convert heat to energy.",
    back: "B",
  },
  {
    front:
      "5) Photosynthetic organisms are unique to most ecosystems because they A) synthesize organic compounds they obtain from decaying heterotrophs. B) synthesize inorganic compounds from organic compounds. C) use light energy to synthesize organic compounds. D) use chemical energy to synthesize organic compounds. E) convert light energy into matter.",
    back: "C",
  },
  {
    front:
      "6) A cow's herbivorous diet indicates that it is a(n) A) primary consumer. B) secondary consumer. C) decomposer. D) autotroph. E) producer.",
    back: "A",
  },
  {
    front:
      "7) To recycle nutrients, an ecosystem must have, at a minimum, A) producers. B) producers and decomposers. C) producers, primary consumers, and decomposers. D) producers, primary consumers, secondary consumers, and decomposers. E) producers, primary consumers, secondary consumers, top carnivores, and decomposers.",
    back: "B",
  },
  {
    front:
      "8) Which of the following terms encompasses all of the others? A) heterotrophs B) herbivores C) carnivores D) primary consumers E) secondary consumers",
    back: "A",
  },
  {
    front:
      "9) Many homeowners mow their lawns during the summer and collect the clippings, which are then hauled to the local landfill. Which of the following actions would most benefit the suburban ecosystem? A) Allow sheep to graze the lawn and then collect the sheep's feces to be delivered to the landfill. B) Collect the lawn clippings and burn them. C) Collect the lawn clippings and add them to a compost pile, don't collect the clippings and let them decompose into the lawn, or apply composted clippings to the lawn. D) Collect the clippings and wash them into the nearest storm sewer that feeds into the local lake. E) Dig up the lawn and cover the yard with asphalt.",
    back: "C",
  },
  {
    front:
      "10) Which of the following is an example of an ecosystem? A) All of the brook trout in a 500 hectare\u00b2 river drainage system. B) The plants, animals, and decomposers that inhabit an alpine meadow. C) A pond and all of the plant and animal species that live in it. D) The intricate interactions of the various plant and animal species on a savanna during a drought. E) Interactions between all of the organisms and their physical environment in a tropical rain forest.",
    back: "E",
  },
  {
    front:
      "11) If the sun were to suddenly stop providing energy to Earth, most ecosystems would vanish. Which of the following ecosystems would likely survive the longest after this hypothetical disaster? A) tropical rain forest B) tundra C) benthic ocean D) grassland E) desert",
    back: "C",
  },
  {
    front:
      "12) Which of the following is true of detrivores? A) They recycle chemical elements directly back to primary consumers. B) They synthesize organic molecules that are used by primary producers. C) They convert organic materials from all trophic levels to inorganic compounds usable by primary producers. D) They secrete enzymes that convert the organic molecules of detritus into CO\u2082 and H\u2082O. E) Some species are autotrophic, while others are heterotrophic.",
    back: "C",
  },
  {
    front:
      "13) The major role of detrivores in ecosystems is to A) provide a nutritional resource for heterotrophs. B) recycle chemical nutrients to a form capable of being used by autotrophs. C) prevent the buildup of the organic remains of organisms, feces, and so on. D) return energy lost to the ecosystem by other organisms.",
    back: "B",
  },
  {
    front:
      "14) Approximately 1% of the solar radiation that strikes a plant is converted into the chemical bond energy of sugars. Why is this amount so low? A) Approximately 99% of the solar radiation is converted to heat energy. B) Only 1% of the wavelengths of visible light are absorbed by photosynthetic pigments. C) Most solar energy strikes water and land surfaces. D) Approximately 99% of the solar radiation is reflected. E) Only the green wavelengths are absorbed by plants for photosynthesis.",
    back: "B",
  },
  {
    front:
      "15) What percentage of solar radiation striking a plant is converted into chemical energy? A) 1% B) 10% C) 25% D) 50% E) 100%",
    back: "A",
  },
  {
    front:
      "16) Subtraction of which of the following will convert gross primary productivity into net primary productivity? A) the energy contained in the standing crop B) the energy used by heterotrophs in respiration C) the energy used by autotrophs in respiration D) the energy fixed by photosynthesis E) all solar energy",
    back: "C",
  },
  {
    front:
      "17) Which of these ecosystems accounts for the largest amount of Earth's net primary productivity? A) tundra B) savanna C) salt marsh D) open ocean E) tropical rain forest",
    back: "D",
  },
  {
    front:
      "18) Which of these ecosystems has the highest net primary productivity per square meter? A) savanna B) open ocean C) boreal forest D) tropical rain forest E) temperate forest",
    back: "D",
  },
  {
    front:
      "19) Which data is most useful to measure primary productivity in a terrestrial ecosystem? A) temperature readings B) potential evapotranspiration C) intensity of solar radiation D) annual precipitation E) amount of carbon fixed",
    back: "D",
  },
  {
    front:
      "20) Which of the following is a true statement regarding mineral nutrients in soils and their implication for primary productivity? A) Globally, phosphorous availability is most limiting to primary productivity. B) Adding a nonlimiting nutrient will stimulate primary productivity. C) Adding more of a limiting nutrient will increase primary productivity, indefinitely. D) Phosphorous is sometimes unavailable to producers due to leaching. E) Alkaline soils are more productive than acidic soils.",
    back: "D",
  },
  {
    front:
      "21) The total biomass of photosynthetic autotrophs present in an ecosystem is known as A) gross primary productivity. B) standing crop. C) net primary productivity. D) secondary productivity. E) trophic efficiency.",
    back: "B",
  },
  {
    front:
      "22) How is it that the open ocean produces the highest net primary productivity of Earth's ecosystems, yet net primary productivity per square meter is relatively low? A) Oceans contain greater concentrations of nutrients compared to other ecosystems. B) Oceans receive a lesser amount of solar energy per unit area. C) Oceans have the largest area of all the ecosystems on Earth. D) Ocean ecosystems have less species diversity. E) Oceanic producers are generally much smaller than oceanic consumers.",
    back: "C",
  },
  {
    front:
      "23) Why is net primary production (NPP) a more useful measurement to an ecosystem ecologist than gross primary production (GPP)? A) NPP can be expressed in energy/unit of area/unit of time. B) NPP can be expressed in terms of carbon fixed by photosynthesis for an entire ecosystem. C) NPP represents the stored chemical energy that is available to consumers in the ecosystem. D) NPP is the same as the standing crop. E) NPP shows the rate at which the standing crop is utilized by consumers.",
    back: "C",
  },
  {
    front:
      "24) How is net ecosystem production (NEP) typically estimated in ecosystems? A) the ratio of producers to consumers B) the amount of heat energy released by the ecosystem C) the net flux of CO\u2082 or O\u2082 in or out of an ecosystem D) the rate of decomposition by detrivores E) the annual total of incoming solar radiation per unit of area",
    back: "C",
  },
  {
    front:
      "25) Aquatic primary productivity is most limited by which of the following? A) light and nutrient availability B) predation by primary consumers C) increased pressure with depth D) pollution E) temperature",
    back: "A",
  },
  {
    front:
      "26) Aquatic ecosystems are least likely to be limited by which of the following nutrients? A) nitrogen B) carbon C) phosphorus D) iron E) zinc",
    back: "B",
  },
  {
    front:
      "27) What is the primary limiting factor for aquatic productivity? A) pressure B) lack of nutrients C) light availability D) herbivores E) competition",
    back: "B",
  },
  {
    front:
      "28) Which of the following ecosystems would likely have a larger net primary productivity/hectare and why? A) open ocean because of the total biomass of photosynthetic autotrophs B) grassland because of the small standing crop biomass that results from consumption by herbivores and rapid decomposition C) tropical rain forest because of the massive standing crop biomass and species diversity D) cave due to the lack of photosynthetic autotrophs E) tundra because of the incredibly rapid period of growth during the summer season",
    back: "B",
  },
  {
    front:
      "29) How is it that satellites can detect differences in primary productivity on Earth? A) Photosynthetic organisms absorb more visible light in the 350\u2014750 wavelengths. B) Satellite instruments can detect reflectance patterns of the photosynthetic organisms of different ecosystems. C) Sensitive satellite instruments can measure the amount of NADPH produced in the summative light reactions of different ecosystems. D) Satellites detect differences by comparing the wavelengths of light captured and reflected by photoautotrophs to the amount of light reaching different ecosystems. E) Satellites detect differences by measuring the amount of water vapor emitted by transpiring producers.",
    back: "D",
  },
  {
    front:
      "30) Which of the following lists of organisms is ranked in correct order from lowest to highest percent in production efficiency? A) mammals, fish, insects B) insects, fish, mammals C) fish, insects, mammals D) insects, mammals, fish E) mammals, insects, fish",
    back: "A",
  },
  {
    front:
      "31) A 3-hectare lake in the American Midwest suddenly has succumbed to an algal bloom. What is the likely cause of eutrophication in freshwater ecosystems, such as this one? A) increased solar radiation B) introduction of non-native tertiary consumer fish C) nutrient runoff D) accidental introduction of a prolific culture of algae E) iron dust blowing into the lake",
    back: "C",
  },
  {
    front:
      "32) The amount of chemical energy in consumers' food that is converted to their own new biomass during a given time period is known as which of the following? A) biomass B) standing crop C) biomagnification D) primary production E) secondary production",
    back: "E",
  },
  {
    front:
      "33) What is secondary production? A) energy converted by secondary consumers from primary consumers B) solar energy that is converted to chemical energy by photosynthesis C) food that is converted to new biomass by consumers D) energy that is not used by consumers for growth and reproduction E) growth that takes place during the second year of life in consumers",
    back: "C",
  },
  {
    front:
      "34) How does inefficient transfer of energy among trophic levels result in the typically high endangerment status of many top-level predators? A) Top-level predators are destined to have small populations that are sparsely distributed. B) Predators have relatively large population sizes. C) Predators are more disease-prone than animals at lower trophic levels. D) Predators have short life spans and short reproductive periods. E) Top-level predators are more likely to be stricken with parasites.",
    back: "A",
  },
  {
    front:
      "35) Trophic efficiency is A) the ratio of net secondary production to assimilation of primary production. B) the percentage of production transferred from one trophic level to the next. C) a measure of how nutrients are cycled from one trophic level to the next. D) usually greater than production efficiencies. E) about 90% in most ecosystems.",
    back: "B",
  },
  {
    front:
      "36) Owls eat rats, mice, shrews, and small birds. Assume that, over a period of time, an owl consumes 5,000 J of animal material. The owl loses 2,300 J in feces and owl pellets and uses 2,500 J for cellular respiration. What is the primary efficiency of this owl? A) 0.02% B) 1% C) 4% D) 10% E) 40%",
    back: "C",
  },
  {
    front:
      "37) Why does a vegetarian leave a smaller ecological footprint than an omnivore? A) Fewer animals are slaughtered for human consumption. B) There is an excess of plant biomass in all terrestrial ecosystems. C) Vegetarians need to ingest less chemical energy than omnivores. D) Vegetarians require less protein than do omnivores. E) Eating meat is an inefficient way of acquiring photosynthetic productivity.",
    back: "E",
  },
  {
    front:
      "38) For most terrestrial ecosystems, pyramids of numbers, biomass, and energy are essentially the samethey have a broad base and a narrow top. The primary reason for this pattern is that A) secondary consumers and top carnivores require less energy than producers. B) at each step, energy is lost from the system as a result of keeping the organisms alive. C) as matter passes through ecosystems, some of it is lost to the environment. D) biomagnification of toxic materials limits the secondary consumers and top carnivores. E) top carnivores and secondary consumers have a more general diet than primary producers.",
    back: "B",
  },
  {
    front:
      "39) Which of the following is primarily responsible for limiting the number of trophic levels in most ecosystems? A) Many primary and higher-order consumers are opportunistic feeders. B) Decomposers compete with higher-order consumers for nutrients and energy. C) Nutrient cycles involve both abiotic and biotic components of ecosystems. D) Nutrient cycling rates tend to be limited by decomposition. E) Energy transfer between tropic levels is in almost all cases less than 20% efficient.",
    back: "E",
  },
  {
    front:
      "40) Which trophic level is most vulnerable to extinction? A) producer level B) primary consumer level C) secondary consumer level D) tertiary consumer level E) decomposer level",
    back: "D",
  },
  {
    front:
      "41) Secondary consumers that can eat only primary consumers receive what percent of the energy fixed by primary producers in a typical field ecosystem? A) 0.1% B) 1% C) 10% D) 20% E) 80%",
    back: "B",
  },
  {
    front:
      "42) Which statement best describes what ultimately happens to the chemical energy that is not converted to new biomass in the process of energy transfer between trophic levels in an ecosystem? A) It is undigested and winds up in the feces and is not passed on to higher trophic levels. B) It is used by organisms to maintain their life processes through the reactions of cellular respiration. C) Heat produced by cellular respiration is used by heterotrophs to thermoregulate. D) It is eliminated as feces or is dissipated into space as heat in accordance with the second law of thermodynamics. E) It is recycled by decomposers to a form that is once again usable by primary producers.",
    back: "D",
  },
  {
    front:
      "43) Consider the food chain grass \u2192 grasshopper \u2192 mouse \u2192 snake \u2192 hawk. How much of the chemical energy fixed by photosynthesis of the grass (100%) is available to the hawk? A) 0.01% B) 0.1% C) 1% D) 10% E) 60%",
    back: "A",
  },
  {
    front:
      "44) If the flow of energy in an arctic ecosystem goes through a simple food chain, perhaps involving humans, starting from phytoplankton to zooplankton to fish to seals to polar bears, then which of the following could be true? A) Polar bears can provide more food for humans than seals can. B) The total biomass of the fish is lower than that of the seals. C) Seal meat probably contains the highest concentrations of fat-soluble toxins. D) Seal populations are larger than fish populations. E) The fish can potentially provide more food for humans than the seal meat can.",
    back: "E",
  },
  {
    front:
      "45) Nitrogen is available to plants only in the form of A) N2 in the atmosphere. B) nitrite ions in the soil. C) uric acid from animal excretions. D) amino acids from decomposing plant and animal proteins. E) nitrate ions in the soil.",
    back: "E",
  },
  {
    front:
      "46) Which of the following locations is the reservoir for nitrogen in the nitrogen cycle? A) atmosphere B) sedimentary bedrock C) fossilized plant and animal remains (coal, oil, and natural gas) D) plant and animal biomass E) soil",
    back: "A",
  },
  {
    front:
      "47) Which of the following locations is the reservoir for carbon for the carbon cycle? A) atmosphere B) sediments and sedimentary rocks C) fossilized plant and animal remains (coal, oil, and natural gas) D) plant and animal biomass E) all of the above",
    back: "E",
  },
  {
    front:
      "48) In the nitrogen cycle, the bacteria that replenish the atmosphere with N2 are A) Rhizobium bacteria. B) nitrifying bacteria. C) denitrifying bacteria. D) methanogenic protozoans. E) nitrogen-fixing bacteria.",
    back: "C",
  },
  {
    front:
      "49) How does phosphorus normally enter ecosystems? A) cellular respiration B) photosynthesis C) rock weathering D) vulcanism E) atmospheric phosphorous gas",
    back: "C",
  },
  {
    front:
      "50) Which of the following is an example of a local biogeochemical cycle? A) O\u2082 released by oak trees in a forest B) CO\u2082 absorbed by phytoplankton in the open ocean C) excess NO\u2083- converted to N\u2082 by denitrifying soil bacteria D) phosphorous being absorbed from the soil by a corn plant E) organic carbon remains of a leaf being converted to CO\u2082 by a fungus",
    back: "D",
  },
  {
    front:
      "51) Which of the following statements is correct about biogeochemical cycling? A) The phosphorus cycle involves the recycling of atmospheric phosphorus. B) The phosphorus cycle involves the weathering of rocks. C) The carbon cycle is a localized cycle that primarily involves the burning of fossil fuels. D) The carbon cycle has maintained a constant atmospheric concentration of CO\u2082 for the past million years. E) The nitrogen cycle involves movement of diatomic nitrogen between the biotic and abiotic components of the ecosystem.",
    back: "B",
  },
  {
    front:
      "52) Which of the following properly links the nutrient to its reservoir? A) nitrogenionic nitrogen in the soil B) wateratmospheric water vapor C) carbondissolved CO\u2082 in aquatic ecosystems D) phosphoroussedimentary rocks E) All of the options are correct.",
    back: "D",
  },
  {
    front:
      "53) In terms of nutrient cycling, why does timber harvesting in a temperate forest cause less ecological devastation than timber harvesting in tropical rain forests? A) Trees are generally less numerous in temperate forests, so fewer nutrients will be removed from the temperate forest ecosystem during a harvest. B) Temperate forest tree species require fewer nutrients to survive than their tropical counterpart species, so a harvest removes fewer nutrients from the temperate ecosystem. C) The warmer temperatures in the tropics influence rain forest species to assimilate nutrients more slowly, so tropical nutrient absorption is much slower than in temperate forests. D) There are far fewer decomposers in tropical rain forests, so turning organic matter into usable nutrients is a slower process than in temperate forest ecosystems. E) Typical harvests remove up to 75% of the nutrients in the woody trunks of tropical rain forest trees, leaving nutrient-impoverished soils behind.",
    back: "E",
  },
  {
    front:
      "54) Why do logged tropical rain forest soils typically have nutrient-poor soils? A) Tropical bedrock contains little phosphorous. B) Logging results in soil temperatures that are lethal to nitrogen-fixing bacteria. C) Most of the nutrients in the ecosystem are removed in the harvested timber. D) The cation exchange capacity of the soil is reversed as a result of logging. E) Nutrients evaporate easily into the atmosphere in the post-logged forest.",
    back: "C",
  },
  {
    front:
      "55) What is the first step in ecosystem restoration? A) to restore the physical structure B) to restore native species that have been extirpated due to disturbance C) to remove competitive invasive species D) to identify the limiting factors of the producers E) to remove toxic pollutants",
    back: "A",
  },
  {
    front:
      "56) What is the goal of restoration ecology? A) to replace a ruined ecosystem with a more suitable ecosystem for that area B) to speed up the restoration of a degraded ecosystem C) to completely restore a disturbed ecosystem to its former undisturbed state D) to prevent further degradation by protecting an area with park status E) to manage competition between species in human-altered ecosystems",
    back: "B",
  },
  {
    front:
      "57) Which of the following statements is true? A) An ecosystem's trophic structure determines the rate at which energy cycles within the system. B) At any point in time, it is impossible for consumers to outnumber producers in an ecosystem. C) Chemoautotrophic prokaryotes near deep-sea vents are primary producers. D) There has been a well-documented increase in atmospheric nitrogen over the past several decades. E) The reservoir of ecosystem phosphorous is the atmosphere.",
    back: "C",
  },
  {
    front:
      "58) In a typical grassland community, which of the following has the smallest biomass? A) hawk B) snake C) shrew D) grasshopper E) grass",
    back: "A",
  },
  {
    front:
      "59) In a typical grassland community, which of the following is the primary consumer? A) hawk B) snake C) shrew D) grasshopper E) grass",
    back: "D",
  },
  {
    front:
      "60) When levels of CO\u2082 are experimentally increased in a typical grassland community, C\u2083 plants generally respond with a greater increase in productivity than C\u2084 plants. This is because A) C\u2083 plants are more efficient in their use of CO\u2082. B) C\u2083 plants are able to obtain the same amount of CO\u2082 by keeping their stomata open for shorter periods of time. C) C\u2084 plants don't use CO\u2082 as their source of carbon. D) C\u2083 plants are more limited by CO\u2082 availability because they lack mechanisms to prevent transpirational water loss. E) C\u2083 plants have special adaptations for CO\u2082 uptake, such as larger stomata.",
    back: "D",
  },
  {
    front:
      "Food web for a particular terrestrial ecosystem (arrows represent energy flow and letters represent species)  61) Examine this food web for a particular terrestrial ecosystem. Which species is autotrophic? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "Food web for a particular terrestrial ecosystem (arrows represent energy flow and letters represent species)  62) Examine this food web for a particular terrestrial ecosystem. Which species is most likely a decomposer on this food web? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "Food web for a particular terrestrial ecosystem (arrows represent energy flow and letters represent species)  63) Examine this food web for a particular terrestrial ecosystem. Species C is toxic to predators. Which species is most likely to benefit from being a mimic of C? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Food web for a particular terrestrial ecosystem (arrows represent energy flow and letters represent species)  64) Examine this food web for a particular terrestrial ecosystem. Which pair of species could be omnivores? A) A and B B) A and D C) B and C D) C and D E) C and E",
    back: "E",
  },
  {
    front:
      "Diagram of a food web (arrows represent energy flow and letters represent species)  65) If the figure above represents a terrestrial food web, the combined biomass of C + D would probably be A) greater than the biomass of A. B) less than the biomass of H. C) greater than the biomass of B. D) less than the biomass of A + B. E) less than the biomass of E.",
    back: "D",
  },
  {
    front:
      "Diagram of a food web (arrows represent energy flow and letters represent species)  66) If the figure above represents a marine food web, the smallest organism might be A) A. B) F. C) C. D) I. E) E.",
    back: "A",
  },
  {
    front:
      "67) On the diagram of the nitrogen cycle, which number represents nitrite (NO\u2082)? A) 1 B) 2 C) 3 D) 4",
    back: "C",
  },
  {
    front:
      "68) On the diagram of the nitrogen cycle, which number represents ammonia (NH\u2084+)? A) 1 B) 2 C) 3 D) 4",
    back: "D",
  },
  {
    front:
      "69) On the diagram of the nitrogen cycle, which number represents nitrogen-fixing bacteria? A) 5 B) 6 C) 7",
    back: "A",
  },
  {
    front:
      "70) On the diagram of the nitrogen cycle, which number represents nitrifying bacteria? A) 5 B) 6 C) 7",
    back: "B",
  },
  {
    front:
      "71) Suppose you are studying the nitrogen cycling in a pond ecosystem over the course of a month. While you are collecting data, a flock of 100 Canada geese lands and spends the night during a fall migration. What could you do to eliminate error in your study as a result of this event? A) Find out how much nitrogen is consumed in plant material by a Canada goose over about a 12-hour period, multiply this number by 100, and add that amount to the total nitrogen in the ecosystem. B) Find out how much nitrogen is eliminated by a Canada goose over about a 12-hour period, multiply this number by 100, and subtract that amount from the total nitrogen in the ecosystem. C) Find out how much nitrogen is consumed and eliminated by a Canada goose over about a 12-hour period and multiply this number by 100; enter this +/- value into the nitrogen budget of the ecosystem. D) Do nothing. The Canada geese visitation to the lake would have negligible impact on the nitrogen budget of the pond. E) Put a net over the pond so that no more migrating flocks can land on the pond and alter the nitrogen balance of the pond.",
    back: "C",
  },
  {
    front:
      "72) As big as it is, the ocean is nutrient-limited. If you wanted to investigate this, one reasonable approach would be to A) follow whale migrations in order to determine where most nutrients are located. B) observe Antarctic Ocean productivity from year to year to see if it changes. C) experimentally enrich some areas of the ocean and compare their productivity to that of untreated areas. D) compare nutrient concentrations between the photic zone and the benthic zone in various marine locations. E) contrast nutrient uptake by autotrophs in marine locations that are different temperatures.",
    back: "C",
  },
  {
    front:
      "73) A porcupine eats 3,000 J of plant material. Of this, 2,100 J is indigestible and is eliminated as feces, 800 J are used in cellular respiration, and 100 J are used for growth and reproduction. What is the approximate production efficiency of this animal? A) 0.03% B) 3% C) 10% D) 27% E) 33%",
    back: "B",
  },
  {
    front:
      "74) Which of the following organisms is incorrectly paired with its trophic level? A) cyanobacteriumprimary producer B) grasshopperprimary consumer C) zooplanktonprimary producer D) eagletertiary consumer E) fungusdetritivore",
    back: "C",
  },
  {
    front:
      "75) Which of these ecosystems has the lowest net primary production per square meter? A) a salt marsh B) an open ocean C) a coral reef D) a grassland E) a tropical rain forest",
    back: "B",
  },
  {
    front:
      "76) The discipline that applies ecological principles to returning degraded ecosystems to a more natural state is known as A) population viability analysis. B) landscape ecology. C) conservation ecology. D) restoration ecology. E) resource conservation.",
    back: "D",
  },
  {
    front:
      "77) Nitrifying bacteria participate in the nitrogen cycle mainly by A) converting nitrogen gas to ammonia. B) releasing ammonium from organic compounds, thus returning it to the soil. C) converting ammonia to nitrogen gas, which returns to the atmosphere. D) converting ammonium to nitrate, which plants absorb. E) incorporating nitrogen into amino acids and organic compounds.",
    back: "D",
  },
  {
    front:
      "78) Which of the following has the greatest effect on the rate of chemical cycling in an ecosystem? A) the ecosystem's rate of primary production B) the production efficiency of the ecosystem's consumers C) the rate of decomposition in the ecosystem D) the trophic efficiency of the ecosystem E) the location of the nutrient reservoirs in the ecosystem",
    back: "C",
  },
  {
    front:
      "79) The Hubbard Brook watershed deforestation experiment yielded all of the following results except: A) Most minerals were recycled within a forest ecosystem. B) The flow of minerals out of a natural watershed was offset by minerals flowing in. C) Deforestation increased water runoff. D) The nitrate concentration in waters draining the deforested area became dangerously high. E) Calcium levels remained high in the soil of deforested areas.",
    back: "E",
  },
  {
    front:
      "80) Which of the following would be considered an example of bioremediation? A) adding nitrogen-fixing microorganisms to a degraded ecosystem to increase nitrogen availability B) using a bulldozer to regrade a strip mine C) dredging a river bottom to remove contaminated sediments D) reconfiguring the channel of a river E) adding seeds of a chromium-accumulating plant to soil contaminated by chromium",
    back: "A",
  },
  {
    front:
      "81) If you applied a fungicide to a cornfield, what would you expect to happen to the rate of decomposition and net ecosystem production (NEP)? A) Both decomposition rate and NEP would decrease. B) Both decomposition rate and NEP would increase. C) Neither would change. D) Decomposition rate would increase and NEP would decrease. E) Decomposition rate would decrease and NEP would increase.",
    back: "E",
  },
  {
    front:
      "About 25 of the 92 natural elements are known to be essential to life. Which four of these 25 elements make up approximately 96% of living matter? A) carbon, sodium, hydrogen, nitrogen B) carbon, oxygen, phosphorus, hydrogen C) oxygen, hydrogen, calcium, nitrogen D) carbon, hydrogen, nitrogen, oxygen E) carbon, oxygen, nitrogen, calcium",
    back: "D",
  },
  {
    front:
      "Trace elements are those required by an organism in only minute quantities. Which of the following is a trace element that is required by humans and other vertebrates, but not by other organisms such as bacteria or plants? A) nitrogen B) calcium C) iodine D) sodium E) phosphorus",
    back: "C",
  },
  {
    front:
      "Which of the following statements is false? A) Carbon, hydrogen, oxygen, and nitrogen are the most abundant elements of living matter. B) Some trace elements are very abundant on Earth. C) Virtually all organisms require the same elements in the same quantities. D) Iron is an example of an element needed by all organisms. E) Other than some trace elements, animals are mostly made up of the same elements as plants, in similar proportions.",
    back: "C",
  },
  {
    front:
      "What factors are most important in determining which elements are most common in living matter? A) the relative abundances of the elements in Earth's crust and atmosphere B) the emergent properties of the simple compounds made from these elements C) the reactivity of the elements with water D) the chemical stability of the elements E) both the relative abundances of the elements and the emergent properties of the compounds made from these elements",
    back: "E",
  },
  {
    front:
      "Why is each element unique and different from other elements in chemical properties? A) Each element has a unique atomic mass. B) Each element has a unique atomic weight. C) Each element has a unique number of protons in its nucleus. D) Each element has a unique number of neutrons in its nucleus. E) Each element has different radioactive properties.",
    back: "C",
  },
  {
    front:
      "Knowing just the atomic mass of an element allows inferences about which of the following? A) the chemical properties of the element B) the number of protons in the element C) the number of neutrons in the element D) the number of protons plus neutrons in the element E) both the number of protons and the chemical properties of the element",
    back: "D",
  },
  {
    front:
      "In what way are elements in the same column of the periodic table the same? A) They have the same number of protons. B) They have the same number of neutrons. C) They have the same number of electrons. D) They have the same number of electrons in their valence shell. E) They have the same number of electron shells.",
    back: "D",
  },
  {
    front:
      "Oxygen has an atomic number of 8 and a mass number of 16. Thus, what is the atomic mass of an oxygen atom? A) exactly 8 grams B) exactly 8 daltons C) approximately 16 grams D) approximately 16 daltons E) 24 amu (atomic mass units)",
    back: "D",
  },
  {
    front:
      "The nucleus of a nitrogen atom contains 7 neutrons and 7 protons. Which of the following is a correct statement concerning nitrogen? A) The nitrogen atom has a mass number of approximately 7 daltons and an atomic mass of 14. B) The nitrogen atom has a mass number of approximately 14 daltons and an atomic mass of 7. C) The nitrogen atom has a mass number of 14 and an atomic mass of 7 grams. D) The nitrogen atom has a mass number of 7 and an atomic number of 14. E) The nitrogen atom has a mass number of 14 and an atomic mass of approximately 14 daltons.",
    back: "E",
  },
  {
    front:
      "Molybdenum has an atomic number of 42. Several common isotopes exist, with mass numbers of 92, 94, 95, 96, 97, 98, and 100. Therefore, which of the following can be true? A) Molybdenum atoms can have between 50 and 58 neutrons. B) The isotopes of molybdenum have different electron configurations. C) The isotopes of molybdenum can have between 50 and 58 protons. D) The isotopes of molybdenum have between 50 and 58 neutrons and have different electron configurations. E) The isotopes of molybdenum have between 50 and 58 protons and have different electron configurations.",
    back: "A",
  },
  {
    front:
      "Carbon-12 is the most common isotope of carbon, and has an atomic mass of 12 daltons. A mole of carbon in naturally occurring coal, however, weighs slightly more than 12 grams. Why? A) The atomic mass does not include the mass of electrons. B) Some carbon atoms in nature have an extra proton. C) Some carbon atoms in nature have more neutrons. D) Some carbon atoms in nature have a different valence electron distribution. E) Some carbon atoms in nature have undergone radioactive decay.",
    back: "C",
  },
  {
    front:
      "Which of the following best describes the relationship between the atoms described below? [SEE IMAGE] A) They are isomers. B) They are polymers. C) They are isotopes. D) They contain 1 and 3 protons, respectively. E) They each contain 1 neutron.",
    back: "C",
  },
  {
    front:
      "The precise weight of a mole of some pure elements like silicon (Si) can vary slightly from the standard atomic mass, or even from sample to sample. Why? A) The element may undergo radioactive decay. B) The element may react with itself and gain or lose subatomic particles. C) The atoms of the element form chemical bonds with each other, and that changes the weight of the element. D) The element may have multiple stable isotopes, and the isotopic composition may vary from sample to sample. E) The amount of energy absorbed by the element affects the mass of its electrons, and thus the atomic mass can vary slightly.",
    back: "D",
  },
  {
    front:
      "One difference between carbon-12 (12/6 C) is that carbon-14 (14/6 C) has A) two more protons than carbon-12. B) two more electrons than carbon-12. C) two more neutrons than carbon-12. D) two more protons and two more neutrons than carbon-12. E) two more electrons and two more neutrons than carbon-12.",
    back: "C",
  },
  {
    front:
      "An atom has 6 electrons in its outer shell. How many unpaired electrons does it have? A) 0 B) 2 C) 4 D) 6 E) 2 or 4",
    back: "B",
  },
  {
    front:
      "The atomic number of nitrogen is 7. Nitrogen-15 is heavier than nitrogen-14 because the atomic nucleus of nitrogen-15 contains how many neutrons? A) 6 B) 7 C) 8 D) 12 E) 14",
    back: "C",
  },
  {
    front:
      "Electrons exist only at fixed levels of potential energy. However, if an atom absorbs sufficient energy, a possible result is that A) an electron may move to an electron shell farther away from the nucleus. B) an electron may move to an electron shell closer to the nucleus. C) the atom may become a radioactive isotope. D) the atom would become a positively charged ion, or cation, and become a radioactive isotope. E) the atom would become a negatively charged ion, or anion.",
    back: "A",
  },
  {
    front:
      "The atomic number of neon is 10. Therefore, which of the following is most correct about an atom of neon? A) It has 8 electrons in its outer electron shell. B) It is inert. C) It has an atomic mass of 10 daltons. D) It has 8 electrons in its outer electron shell and it is inert. E) It has 8 electrons in its outer electron shell, it is inert, and it has an atomic mass of 10 daltons.",
    back: "D",
  },
  {
    front:
      "From its atomic number of 15, it is possible to predict that the phosphorus atom has A) 15 neutrons. B) 15 protons. C) 15 electrons. D) 8 electrons in its outermost electron shell. E) 15 protons and 15 electrons.",
    back: "E",
  },
  {
    front:
      "Atoms whose outer electron shells contain 8 electrons tend to A) form ions in aqueous solutions. B) form hydrogen bonds in aqueous solutions. C) be stable and chemically nonreactive, or inert. D) be gaseous at room temperature. E) be both chemically inert and gaseous at room temperature.",
    back: "E",
  },
  {
    front:
      "The atomic number of each atom is given to the left of each of the elements below. Which of the atoms has the same valence as carbon (12/6 C)? A) \u2087N nitrogen B) \u2089F flourine C) \u2081\u2080Ne neon D) \u2081\u2082Mg magnesium E) \u2081\u2084Si silicon",
    back: "E",
  },
  {
    front:
      "Two atoms appear to have the same mass number. These atoms A) must have the same atomic number. B) must have the same number of electrons. C) must have the same chemical properties. D) must have the same number of protons + neutrons. E) must have the same atomic number, the same number of protons + neutrons, the same number of electrons, and the same chemical properties.",
    back: "D",
  },
  {
    front:
      "Fluorine has an atomic number of 9 and a mass number of 19. How many electrons are needed to complete the valence shell of a fluorine atom? A) 1 B) 3 C) 0 D) 7 E) 9",
    back: "A",
  },
  {
    front:
      "24) What is the maximum number of electrons in a single 2 p orbital of an atom? A) 1 B) 2 C) 3 D) 4 E) 5",
    back: "B",
  },
  {
    front:
      "The organic molecules in living organisms have a measurably lower ratio of carbon-13/carbon-12, two stable isotopes of carbon that comprise approximately 1.1% and 98.9% of atmospheric carbon, respectively. What is a reasonable explanation for this phenomenon? A) Photosynthesis preferentially uses carbon dioxide molecules with carbon-12, and the lower carbon-13/carbon-12 ratio propagates through the food chain. B) Carbon dioxide molecules with carbon-13 stay in the upper atmosphere and are less available to terrestrial plants and algae. C) Carbon-13 has a different valence electron configuration and is therefore less chemically reactive than carbon-12. D) Oxygen atoms preferentially react with carbon-13, thereby enriching the atmosphere with carbon dioxide molecules containing carbon-13 atoms. E) Carbon dioxide molecules containing carbon-13 are heavier and sink into the ocean depths, making them less available to living organisms.",
    back: "A",
  },
  {
    front:
      "Phosphorus-32, a radioactive isotope of phosphorus-31 (atomic number 15), undergoes a form of radioactive decay whereby a neutron turns into a proton and emits radiation in the form of an electron. What is the product of such radioactive decay of phosphorus-32? A) phosphorus-31 B) a positively charged phosphorus-31 ion C) a negatively charged phosphorus-32 ion D) sulfur-32 (atomic number 16) E) the conversion of the phosphorus-32 atom into pure energy",
    back: "D",
  },
  {
    front:
      "An atom with atomic number 12 would have what type of chemical behavior in bonding with other elements? A) It would form ions with a +1 charge. B) It would form ions with a +2 charge. C) It would form ions with a -1 charge. D) It would form ions with a -2 charge. E) It would form two covalent bonds with other atoms.",
    back: "B",
  },
  {
    front:
      "If a salamander relied on hydrogen bonds to cling to surfaces, what type of surface would cause the most problems for this animal? A) a surface coated with a thin film of water B) a surface made with carbon and hydrogen atoms covalently bonded together C) a surface made with carbon, hydrogen, and oxygen atoms covalently bonded together D) a surface made with carbon, hydrogen, nitrogen, and oxygen atoms covalently bonded together E) a surface made with silicon and oxygen atoms covalently bonded together",
    back: "B",
  },
  {
    front:
      "A covalent chemical bond is one in which A) electrons are removed from one atom and transferred to another atom so that the two atoms become oppositely charged. B) protons and neutrons are shared by two atoms so as to satisfy the requirements of both atoms. C) outer-shell electrons of two atoms are shared so as to satisfactorily fill the outer electron shells of both atoms. D) outer-shell electrons of one atom are transferred to fill the inner electron shell of another atom. E) an electron occupies a hybrid orbital located between the nuclei of two atoms.",
    back: "C",
  },
  {
    front:
      "If an atom of sulfur (atomic number 16) were allowed to react with atoms of hydrogen (atomic number 1), which of the molecules below would be formed?  [SEE IMAGE FOR CHOICES]",
    back: "B",
  },
  {
    front:
      "What is the maximum number of covalent bonds an element with atomic number 8 can make with hydrogen? A) 1 B) 2 C) 3 D) 4 E) 6",
    back: "B",
  },
  {
    front:
      "Nitrogen (N) is much more electronegative than hydrogen (H). Which of the following statements is correct about the atoms in ammonia (NH\u2083)? A) Each hydrogen atom has a partial positive charge; the nitrogen atom has a partial negative charge. B) The nitrogen atom has a strong positive charge; each hydrogen atom has a strong positive charge. C) Each hydrogen atom has a slight negative charge; the nitrogen atom has a strong positive charge. D) The nitrogen atom has a slight positive charge; each hydrogen atom has a slight negative charge. E) There are covalent bonds between the hydrogen atoms and polar bonds between each hydrogen atom and the nitrogen atom.",
    back: "A",
  },
  {
    front:
      "When two atoms are equally electronegative, they will interact to form A) hydrogen bonds. B) van der Waals interactions. C) polar covalent bonds. D) nonpolar covalent bonds. E) ionic bonds.",
    back: "D",
  },
  {
    front:
      "What results from an unequal sharing of electrons between atoms? A) a nonpolar covalent bond B) a polar covalent bond C) an ionic bond D) a hydrogen bond E) a hydrophobic interaction",
    back: "B",
  },
  {
    front:
      "A covalent bond is likely to be polar when A) one of the atoms sharing electrons is much more electronegative than the other atom. B) the two atoms sharing electrons are equally electronegative. C) oxygen is one of the two atoms sharing electrons. D) one of the atoms has absorbed more energy than the other atom. E) the two atoms sharing electrons are different elements.",
    back: "A",
  },
  {
    front:
      "Which of the following molecules contains the most polar covalent bond? A) H\u2082 B) O\u2082 C) CO\u2082 D) H\u2082O E) CH\u2084",
    back: "D",
  },
  {
    front:
      "In comparing covalent bonds and ionic bonds, which of the following would you expect? A) An atom can form covalent bonds with multiple partner atoms, but only a single ionic bond with a single partner atom. B) Covalent bonds and ionic bonds occupy opposite ends of a continuous spectrum, from nearly equal to completely unequal sharing of electrons. C) Both involve electrical attraction between the electrons of one atom and the nucleus of the other atom. D) Ionic interactions remain when covalent bonds are broken in water. Ionic bonds are much stronger than covalent bonds.",
    back: "B",
  },
  {
    front:
      "What is the difference between covalent bonds and ionic bonds? A) Covalent bonds are formed between atoms to form molecules; ionic bonds are formed between atoms to form compounds. B) Covalent bonds involve the sharing of pairs of electrons between atoms; ionic bonds involve the sharing of single electrons between atoms. C) Covalent bonds involve the sharing of electrons between atoms; ionic bonds involve the electrical attraction between atoms. D) Covalent bonds involve the sharing of electrons between atoms; ionic bonds involve the sharing of protons between atoms. E) Covalent bonds involve the transfer of electrons between atoms; ionic bonds involve the sharing of electrons between atoms.",
    back: "C",
  },
  {
    front:
      "In ammonium chloride salt (NH\u2084Cl) the anion is a single chloride ion, Cl. What is the cation of NH\u2084Cl? A) N, with a charge of +1 B) NH, with a charge of +1 C) H\u2083, with a charge of +1 D) NH\u2084, with a charge of +1 E) NH\u2084, with a charge of +4",
    back: "D",
  },
  {
    front:
      "The atomic number of chlorine is 17. The atomic number of magnesium is 12. What is the formula for magnesium chloride? A) MgCl B) MgCl\u2082 C) Mg\u2082Cl D) Mg\u2082Cl\u2082 E) MgCl\u2083",
    back: "B",
  },
  {
    front:
      "How many electron pairs are shared between carbon atoms in a molecule that has the formula C\u2082H\u2084? A) 0 B) 1 C) 2 D) 3 E) 4",
    back: "C",
  },
  {
    front:
      "Which bond or interaction would be difficult to disrupt when compounds are put into water? A) covalent bond B) hydrogen bond C) van der Waals interaction D) ionic bond E) either covalent bonds or ionic bonds",
    back: "A",
  },
  {
    front:
      "Which of the following explains most specifically the attraction of water molecules to one another? A) nonpolar covalent bond B) polar covalent bond C) ionic bond D) hydrogen bond E) hydrophobic interaction",
    back: "D",
  },
  {
    front:
      "Van der Waals interactions result when A) hybrid orbitals overlap. B) electrons are not symmetrically distributed in a molecule. C) molecules held by ionic bonds react with water. D) two polar covalent bonds react. E) a hydrogen atom loses an electron.",
    back: "B",
  },
  {
    front:
      "What bonding or interaction is most likely to occur among a broad array of molecules of various types (polar, nonpolar, hydrophilic, hydrophobic)? A) covalent bonding B) polar covalent bonding C) ionic bonding D) hydrogen bonding E) van der Waals interactions",
    back: "E",
  },
  {
    front:
      "Which of the following is not considered to be a weak molecular interaction? A) a covalent bond B) a van der Waals interaction C) an ionic bond in the presence of water D) a hydrogen bond E) both a hydrogen bond and a covalent bond",
    back: "A",
  },
  {
    front:
      "Which of the following would be regarded as compounds? A) H\u2082O, O\u2082, and CH\u2084 B) H\u2082O and O\u2082 C) O\u2082 and CH\u2084 D) CH\u2084 and O\u2082, but not H\u2082O E) H\u2082O and CH\u2084, but not O\u2082",
    back: "E",
  },
  {
    front:
      "What is the maximum number of hydrogen atoms that can be covalently bonded in a molecule containing two carbon atoms? A) 2 B) 3 C) 4 D) 6 E) 8",
    back: "D",
  },
  {
    front:
      "Which of the following is true for this reaction? 3 H\u2082 + N\u2082 \u2194 2 NH\u2083 A) The reaction is nonreversible. B) Hydrogen and nitrogen are the reactants of the reverse reaction. C) Hydrogen and nitrogen are the products of the forward reaction. D) Ammonia is being formed and decomposed. E) Hydrogen and nitrogen are being decomposed.",
    back: "D",
  },
  {
    front:
      "Which of the following correctly describes chemical equilibrium? A) Forward and reverse reactions continue with no effect on the concentrations of the reactants and products. B) Concentrations of products are higher than the concentrations of the reactants. C) Forward and reverse reactions have stopped so that the concentration of the reactants equals the concentration of the products. D) Reactions stop only when all reactants have been converted to products. E) There are equal concentrations of reactants and products, and the reactions have stopped.",
    back: "A",
  },
  {
    front:
      "Which of the following correctly describes any reaction that has reached chemical equilibrium? A) The concentration of the reactants equals the concentration of the products. B) The rate of the forward reaction is equal to the rate of the reverse reaction. C) All of the reactants have been converted to the products of the reaction. D) All of the products have been converted to the reactants of the reaction. E) Both the forward and the reverse reactions have stopped with no net effect on the concentration of the reactants and the products.",
    back: "B",
  },
  {
    front:
      "Which of these systems is least likely to be at chemical equilibrium? A) a test tube of living cells B) a test tube of organic molecules, kept in the freezer C) a test tube of dry organic molecules, kept at room temperature D) a test tube of organic molecules dissolved in water, kept at room temperature E) a test tube of dead cells in water, kept at room temperature",
    back: "A",
  },
  {
    front:
      "Refer to the figure above (first three rows of the periodic table). If life arose on a planet where carbon is absent, which element might fill the role of carbon? A) boron B) silicon C) nitrogen D) aluminum E) phosphorus",
    back: "B",
  },
  {
    front:
      "Which drawing in the figure above depicts the electron configuration of an element with chemical properties most similar to Helium (\u2082He)? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "Which drawing in the figure above depicts the electron configuration of an atom that can form covalent bonds with two hydrogen atoms? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "Which drawing in the figure above depicts the electron configuration of an atom capable of forming three covalent bonds with other atoms? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Which drawing in the figure above is of the electron configuration of a sodium \u2081\u2081Na\u207a ion? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "Which drawing in the figure above depicts the most electronegative atom? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "Which drawing in the figure above depicts an atom with a valence of 3? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Which drawing in the figure above depicts an atom with a valence of 2? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "In the figure above, how many electrons does nitrogen have in its valence shell? A) 2 B) 5 C) 7 D) 8 E) 14",
    back: "B",
  },
  {
    front:
      "In the figure above, how many unpaired electrons does phosphorus have in its valence shell? A) 15 B) 2 C) 3 D) 7 E) 5",
    back: "C",
  },
  {
    front:
      "How many neutrons are present in the nucleus of a phosphorus-32 (\u00b3\u00b2P) atom (see the figure above)? A) 5 B) 15 C) 16 D) 17 E) 32",
    back: "D",
  },
  {
    front:
      "How many electrons does an atom of sulfur have in its valence shell (see the figure above)? A) 4 B) 6 C) 8 D) 16 E) 32",
    back: "B",
  },
  {
    front:
      "Based on electron configuration, which of these elements in the figure above would exhibit a chemical behavior most like that of oxygen? A) carbon B) hydrogen C) nitrogen D) sulfur E) phosphorus",
    back: "D",
  },
  {
    front:
      "The illustration above shows a representation of formic acid. A formic acid molecule A) will form hydrogen bonds with water molecules. B) has a tetrahedral configuration of hybrid electron orbitals for the carbon atom. C) consists of largely nonpolar covalent bonds. D) is held together by hydrogen bonds. E) has a tetrahedral shape and will form hydrogen bonds with water molecules.",
    back: "A",
  },
  {
    front:
      "What results from the chemical reaction illustrated above? A) a cation with a net charge of +1 B) a cation with a net charge of -1 C) an anion with a net charge of +1 D) an anion with a net charge of -1 E) a cation with a net charge of +1 and an anion with a net charge of -1",
    back: "E",
  },
  {
    front:
      "What is the atomic number of the cation formed in the reaction illustrated above? A) 1 B) 8 C) 10 D) 11 E) 16",
    back: "D",
  },
  {
    front:
      "What causes the shape of the molecule shown above? A) the configuration of the 2 p orbitals in the carbon atom B) the configuration of the 1 s orbital in the carbon atom C) the configuration of the sp hybrid orbitals of the electrons shared between the carbon and hydrogen atoms D) the packing of the carbon and hydrogen atoms in a crystal lattice E) hydrogen bonding configurations between the carbon and hydrogen atoms",
    back: "C",
  },
  {
    front:
      "In the methane molecule shown in the figure above, bonds have formed that include both the s orbital valence electrons of the hydrogen atoms and the p orbital valence electrons of the carbon. The electron orbitals in these bonds are said to be A) double orbitals. B) tetrahedral orbitals. C) complex orbitals. D) hybrid orbitals. E) polar orbitals.",
    back: "D",
  },
  {
    front:
      "Which one of the atoms shown would be most likely to form a cation with a charge of +1?  [SEE IMAGE FOR CHOICES]",
    back: "A",
  },
  {
    front:
      "Which one of the atoms shown would be most likely to form an anion with a charge of -1?  [SEE IMAGE FOR CHOICES]",
    back: "D",
  },
  {
    front:
      "Which of the following pairs of atoms would be most likely to form a polar covalent bond?  [SEE IMAGE FOR CHOICES]",
    back: "A",
  },
  {
    front:
      "Which of the following pairs of atoms would be most likely to form an ionic bond?  [SEE IMAGE FOR CHOICES]",
    back: "B",
  },
  {
    front:
      "A group of molecular biologists is trying to synthesize a new artificial compound to mimic the effects of a known hormone that influences sexual behavior. They have turned to you for advice. Which of the following compounds is most likely to mimic the effects of the hormone? A) a compound with the same number of carbon atoms as the hormone B) a compound with the same molecular mass (measured in daltons) as the hormone C) a compound with the same three-dimensional shape as part of the hormone D) a compound with the same number of orbital electrons as the hormone E) a compound with the same number of hydrogen and nitrogen atoms as the hormone",
    back: "C",
  },
  {
    front:
      "In the term trace element, the modifier trace means that A) the element is required in very small amounts. B) the element can be used as a label to trace atoms through an organism's metabolism. C) the element is very rare on Earth. D) the element enhances health but is not essential for the organism's long-term survival. E) the element passes rapidly through the organism.",
    back: "A",
  },
  {
    front:
      "Compared with \u00b3\u00b9P, the radioactive isotope \u00b3\u00b2P has A) a different atomic number. B) a different charge. C) one more proton. D) one more electron. E) one more neutron.",
    back: "E",
  },
  {
    front:
      "The reactivity of an atom arises from A) the average distance of the outermost electron shell from the nucleus. B) the existence of unpaired electrons in the valence shell. C) the sum of the potential energies of all the electron shells. D) the potential energy of the valence shell. E) the energy difference between the s and p orbitals.",
    back: "B",
  },
  {
    front:
      "Which statement is true of all atoms that are anions? A) The atom has more electrons than protons. B) The atom has more protons than electrons. C) The atom has fewer protons than does a neutral atom of the same element. D) The atom has more neutrons than protons. E) The net charge is 1-.",
    back: "A",
  },
  {
    front:
      "Which of the following statements correctly describes any chemical reaction that has reached equilibrium? A) The concentrations of products and reactants are equal. B) The reaction is now irreversible. C) Both forward and reverse reactions have halted. D) The rates of the forward and reverse reactions are equal. E) No reactants remain.",
    back: "D",
  },
  {
    front:
      "We can represent atoms by listing the number of protons, neutrons, and electrons: for example, 2p\u207a; 2n\u2070; 2e\u207b for helium. Which of the following represents the 18O isotope of oxygen? A) 6p\u207a, 8n\u2070, 6e\u207b B) 8p\u207a, 10n\u2070, 8e\u207b C) 9p\u207a, 9n\u2070, 9e\u207b D) 7p\u207a, 2n\u2070, 9e\u207b E) 10p\u207a, 8n\u2070, 9e\u207b",
    back: "B",
  },
  {
    front:
      "The atomic number of sulfur is 16. Sulfur combines with hydrogen by covalent bonding to form a compound, hydrogen sulfide. Based on the number of valence electrons in a sulfur atom, predict the molecular formula of the compound: A) HS B) HS\u2082 C) H\u2082S D) H\u2083S\u2082 E) H\u2084S",
    back: "C",
  },
  {
    front:
      "What coefficients must be placed in the following blanks so that all atoms are accounted for in the products? C\u2086H\u2081\u2082O\u2086 \u2192 ____ C\u2082H\u2086O + ____ CO\u2082 A) 1; 2 B) 3; 1 C) 1; 3 D) 1; 1 E) 2; 2",
    back: "E",
  },
  {
    front:
      "In a single molecule of water, two hydrogen atoms are bonded to a single oxygen atom by A) hydrogen bonds. B) nonpolar covalent bonds. C) polar covalent bonds. D) ionic bonds. E) van der Waals interactions.",
    back: "C",
  },
  {
    front:
      "The slight negative charge at one end of one water molecule is attracted to the slight positive charge of another water molecule. What is this attraction called? A) a covalent bond B) a hydrogen bond C) an ionic bond D) a hydrophilic bond E) a van der Waals interaction",
    back: "B",
  },
  {
    front:
      "The partial negative charge in a molecule of water occurs because A) the oxygen atom acquires an additional electron. B) the electrons shared between the oxygen and hydrogen atoms spend more time around the oxygen atom nucleus than around the hydrogen atom nucleus. C) the oxygen atom has two pairs of electrons in its valence shell that are not neutralized by hydrogen atoms. D) the oxygen atom forms hybrid orbitals that distribute electrons unequally around the oxygen nucleus. E) one of the hydrogen atoms donates an electron to the oxygen atom.",
    back: "B",
  },
  {
    front:
      "Sulfur is in the same column of the periodic table as oxygen, but has electronegativity similar to carbon. Compared to water molecules, molecules of H\u2082S A) will ionize more readily. B) will have greater cohesion to other molecules of H\u2082S. C) will have a greater tendency to form hydrogen bonds with each other. D) will have a higher capacity to absorb heat for the same change in temperature. E) will not form hydrogen bonds with each other.",
    back: "E",
  },
  {
    front:
      "Water molecules are able to form hydrogen bonds with A) compounds that have polar covalent bonds. B) oils. C) oxygen gas (O\u2082) molecules. D) chloride ions. E) any compound that is not soluble in water.",
    back: "A",
  },
  {
    front:
      "Which of the following effects is produced by the high surface tension of water? A) Lakes don't freeze solid in winter, despite low temperatures. B) A water strider can walk across the surface of a small pond. C) Organisms resist temperature changes, although they give off heat due to chemical reactions. D) Evaporation of sweat from the skin helps to keep people from overheating. E) Water flows upward from the roots to the leaves in plants.",
    back: "B",
  },
  {
    front:
      "Which of the following takes place as an ice cube cools a drink? A) Molecular collisions in the drink increase. B) Kinetic energy in the drink decreases. C) A calorie of heat energy is transferred from the ice to the water of the drink. D) The specific heat of the water in the drink decreases. E) Evaporation of the water in the drink increases.",
    back: "B",
  },
  {
    front:
      "A dietary Calorie equals 1 kilocalorie. Which of the following statements correctly defines 1 kilocalorie? A) 1,000 calories, or the amount of heat required to raise the temperature of 1 g of water by 1,000\u00b0C B) 100 calories, or the amount of heat required to raise the temperature of 100 g of water by 1\u00b0C C) 10,000 calories, or the amount of heat required to raise the temperature of 1 kg of water by 1\u00b0F D) 1,000 calories, or the amount of heat required to raise the temperature of 1 kg of water by 1\u00b0C E) 1,000 calories, or the amount of heat required to raise the temperature of 100 g of water by 100\u00b0C",
    back: "D",
  },
  {
    front:
      "The nutritional information on a cereal box shows that one serving of a dry cereal has 200 kilocalories. If one were to burn one serving of the cereal, the amount of heat given off would be sufficient to raise the temperature of 20 kg of water how many degrees Celsius? A) 0.2\u00b0C B) 1.0\u00b0C C) 2.0\u00b0C D) 10.0\u00b0C E) 20.0\u00b0C",
    back: "D",
  },
  {
    front:
      "Liquid water's high specific heat is mainly a consequence of the A) small size of the water molecules. B) high specific heat of oxygen and hydrogen atoms. C) absorption and release of heat when hydrogen bonds break and form. D) fact that water is a poor heat conductor. E) higher density of liquid water than solid water (ice).",
    back: "C",
  },
  {
    front:
      "Which type of bond must be broken for water to vaporize? A) ionic bonds B) both hydrogen bonds and ionic bonds C) polar covalent bonds D) hydrogen bonds E) both polar covalent bonds and hydrogen bonds",
    back: "D",
  },
  {
    front:
      "Temperature usually increases when water condenses. Which behavior of water is most directly responsible for this phenomenon? A) the change in density when it condenses to form a liquid or solid B) reactions with other atmospheric compounds C) the release of heat by the formation of hydrogen bonds D) the release of heat by the breaking of hydrogen bonds E) the high surface tension of water",
    back: "C",
  },
  {
    front:
      "Why does evaporation of water from a surface cause cooling of the surface? A) The breaking of bonds between water molecules absorbs heat. B) The water molecules with the most heat energy evaporate more readily. C) The solute molecules left behind absorb heat. D) Water molecules absorb heat from the surface in order to acquire enough energy to evaporate. E) The expansion of water vapor extracts heat from the surface.",
    back: "B",
  },
  {
    front:
      "Why does ice float in liquid water? A) The high surface tension of liquid water keeps the ice on top. B) The ionic bonds between the molecules in ice prevent the ice from sinking. C) Ice always has air bubbles that keep it afloat. D) Hydrogen bonds stabilize and keep the molecules of ice farther apart than the water molecules of liquid water. E) The crystalline lattice of ice causes it to be denser than liquid water.",
    back: "D",
  },
  {
    front:
      "Hydrophobic substances such as vegetable oil are A) nonpolar substances that repel water molecules. B) nonpolar substances that have an attraction for water molecules. C) polar substances that repel water molecules. D) polar substances that have an affinity for water. E) charged molecules that hydrogen-bond with water molecules.",
    back: "A",
  },
  {
    front:
      "One mole (mol) of glucose (molecular mass = 180 daltons) is A) 180 \u00d7 10\u00b2\u00b3 molecules of glucose. B) 1 kg of glucose dissolved in 1 L of solution. C) the largest amount of glucose that can be dissolved in 1 L of solution. D) 180 kilograms of glucose. E) both 180 grams of glucose and 6.02 \u00d7 10\u00b2\u00b3 molecules of glucose.",
    back: "E",
  },
  {
    front:
      "How many molecules of glucose (C\u2086H\u2081\u2082O\u2086 molecular mass = 180 daltons) would be present in 90 grams of glucose? A) 90 \u00d7 10\u00b2\u00b3 B) (6.02/180) \u00d7 10\u00b2\u00b3 C) (6.02/90) \u00d7 10\u00b2\u00b3 D) (90 x 6.02) \u00d7 10\u00b2\u00b3 E) (90/180) \u00d7 6.02 \u00d7 10\u00b2\u00b3",
    back: "E",
  },
  {
    front:
      "How many molecules of glycerol (C\u2083H\u2088O\u2083; molecular mass = 92) would be present in 1 L of a 1 M glycerol solution? A) 1 \u00d7 10\u2076 B) 14 \u00d7 6.02 \u00d7 10\u00b2\u00b3 C) 92 \u00d7 6.02 \u00d7 10\u00b2\u00b3 D) 6.02 \u00d7 10\u00b2\u2076 E) 6.02 \u00d7 10\u00b2\u00b3",
    back: "E",
  },
  {
    front:
      "When an ionic compound such as sodium chloride (NaCl) is placed in water, the component atoms of the NaCl crystal dissociate into individual sodium ions (Na\u207a) and chloride ions (Cl\u207b). In contrast, the atoms of covalently bonded molecules (e.g., glucose, sucrose, glycerol) do not generally dissociate when placed in aqueous solution. Which of the following solutions would be expected to contain the greatest number of solute particles (molecules or ions)? A) 1 L of 0.5 M NaCl B) 1 L of 0.5 M glucose C) 1 L of 1.0 M NaCl D) 1 L of 1.0 M glucose E) 1 L of 1.0 M NaCl and 1 L of 1.0 M glucose will contain equal numbers of solute particles.",
    back: "C",
  },
  {
    front:
      "The molar mass of glucose is 180 g/mol. Which of the following procedures should you carry out to make a 1 M solution of glucose? A) Dissolve 1 g of glucose in 1 L of water. B) Dissolve 180 g of glucose in 1 L of water. C) Dissolve 180 g of glucose in 180 g of water. D) Dissolve 180 milligrams (mg) of glucose in 1 L of water. E) Dissolve 180 g of glucose in 0.8 L of water, and then add more water until the total volume of the solution is 1 L.",
    back: "E",
  },
  {
    front:
      "The molar mass of glucose (C\u2086H\u2081\u2082O\u2086) is 180 g/mol. Which of the following procedures should you carry out to make a 0.5 M solution of glucose? A) Dissolve 0.5 g of glucose in a small volume of water, and then add more water until the total volume of solution is 1 L. B) Dissolve 90 g of glucose in a small volume of water, and then add more water until the total volume of the solution is 1 L. C) Dissolve 180 g of glucose in a small volume of water, and then add more water until the total volume of the solution is 1 L. D) Dissolve 0.5 g of glucose in 1 L of water. E) Dissolve 180 g of glucose in 0.5 L of water.",
    back: "B",
  },
  {
    front:
      "You have a freshly prepared 0.1 M solution of glucose in water. Each liter of this solution contains how many glucose molecules? A) 6.02 \u00d7 10\u00b2\u00b3 B) 3.01 \u00d7 10\u00b2\u00b3 C) 6.02 \u00d7 10\u00b2\u2074 D) 12.04 \u00d7 10\u00b2\u00b3 E) 6.02 \u00d7 10\u00b2\u00b2",
    back: "E",
  },
  {
    front:
      "The molecular weight of water is 18 daltons. What is the molarity of 1 liter of pure water? (Hint: What is the mass of 1 liter of pure water?) A) 55.6 M B) 18 M C) 37 M D) 0.66 M E) 1.0 M",
    back: "A",
  },
  {
    front:
      "You have a freshly prepared 1 M solution of glucose in water. You carefully pour out a 100 mL sample of that solution. How many glucose molecules are included in that 100 mL sample? A) 6.02 \u00d7 10\u00b2\u00b3 B) 3.01 \u00d7 10\u00b2\u00b3 C) 6.02 \u00d7 10\u00b2\u2074 D) 12.04 \u00d7 10\u00b2\u00b3 E) 6.02 \u00d7 10\u00b2\u00b2",
    back: "E",
  },
  {
    front:
      "A strong acid like HCl A) ionizes completely in an aqueous solution. B) increases the pH when added to an aqueous solution. C) reacts with strong bases to create a buffered solution. D) is a strong buffer at low pH. E) both ionizes completely in aqueous solutions and is a strong buffer at low pH.",
    back: "A",
  },
  {
    front:
      "Which of the following ionizes completely in solution and is considered to be a strong base (alkali)? A) NaCl B) HCl C) NH\u2083 D) H\u2082CO\u2083 E) NaOH",
    back: "E",
  },
  {
    front:
      "A 0.01 M solution of a substance has a pH of 2. What can you conclude about this substance? A) It is a strong acid that ionizes completely in water. B) It is a strong base that ionizes completely in water. C) It is a weak acid. D) It is a weak base. E) It is neither an acid nor a base.",
    back: "A",
  },
  {
    front:
      "A given solution contains 0.0001(10\u207b\u2074) moles of hydrogen ions [H\u207a] per liter. Which of the following best describes this solution? A) acidic: will accept H\u207a from both strong and weak acids B) basic: will accept H\u207a from both strong and weak acids C) acidic: will give H\u207a to weak acids, but accept H+ from strong acids D) basic: will give H\u207a to weak acids, but accept H\u207a from weak acids E) acidic: will give H\u207a to both strong and weak acids",
    back: "C",
  },
  {
    front:
      "A solution contains 0.0000001(10\u207b\u2077) moles of hydroxyl ions [OH\u207b] per liter. Which of the following best describes this solution? A) acidic: H\u207a acceptor B) basic: H\u207a acceptor C) acidic: H\u207a donor D) basic: H\u207a donor E) neutral",
    back: "E",
  },
  {
    front:
      "What is the pH of a solution with a hydroxyl ion [OH\u207b] concentration of 10\u207b\u00b9\u00b2 M? A) pH 2 B) pH 4 C) pH 10 D) pH 12 E) pH 14",
    back: "A",
  },
  {
    front:
      "What is the pH of a 1 millimolar NaOH solution? A) pH 3 B) pH 8 C) pH 9 D) pH 10 E) pH 11",
    back: "E",
  },
  {
    front:
      "Which of the following solutions would require the greatest amount of base to be added to bring the solution to neutral pH? A) gastric juice at pH 2 B) vinegar at pH 3 C) tomato juice at pH 4 D) black coffee at pH 5 E) household bleach at pH 12",
    back: "A",
  },
  {
    front:
      "What is the hydrogen ion [H\u207a] concentration of a solution of pH 8? A) 8 M B) 8 x 10\u207b\u2076 M C) 0.01 M D) 10\u207b\u2078 M E) 10\u207b\u2076 M",
    back: "D",
  },
  {
    front:
      "If the pH of a solution is decreased from 9 to 8, it means that the A) concentration of H\u207a has decreased to one-tenth (1/10) what it was at pH 9. B) concentration of H\u207a has increased tenfold (10X) compared to what it was at pH 9. C) concentration of OH\u207b has increased tenfold (10X) compared to what it was at pH 9. D) concentration of OH\u207b has decreased to one-tenth (1/10) what it was at pH 9. E) concentration of H\u207a has increased tenfold (10X) and the concentration of OH\u207b has decreased to one-tenth (1/10) what they were at pH 9.",
    back: "E",
  },
  {
    front:
      "If the pH of a solution is increased from pH 5 to pH 7, it means that the A) concentration of H\u207a is twice (2X) what it was at pH 5. B) concentration of H\u207a is one-half (1/2) what it was at pH 5. C) concentration of OH\u207b is 100 times greater than what it was at pH 5. D) concentration of OH\u207b is one-hundredth (0.01X) what it was at pH 5. E) concentration of H\u207a is 100 times greater and the concentration of OH\u207b is one-hundredth what they were at pH 5.",
    back: "C",
  },
  {
    front:
      "One liter of a solution of pH 2 has how many more hydrogen ions (H\u207a) than 1 L of a solution of pH 6? A) 4 times more B) 16 times more C) 40,000 times more D) 10,000 times more E) 100,000 times more",
    back: "D",
  },
  {
    front:
      "One liter of a solution of pH 9 has how many more hydroxyl ions (OH\u207b) than 1 L of a solution of pH 4? A) 5 times more B) 32 times more C) 50,000 times more D) 10,000 times more E) 100,000 times more",
    back: "E",
  },
  {
    front:
      "Which of the following statements is true about buffer solutions? A) They maintain a constant pH when bases are added to them but not when acids are added to them. B) They maintain a constant pH when acids are added to them but not when bases are added to them. C) They maintain a relatively constant pH of approximately 7 when either acids or bases are added to them. D) They maintain a relatively constant pH when either acids or bases are added to them. E) They are found only in living systems and biological fluids.",
    back: "D",
  },
  {
    front:
      "Buffers are substances that help resist shifts in pH by A) releasing H\u207a to a solution when acids are added. B) donating H\u207a to a solution when bases are added. C) releasing OH\u207b to a solution when bases are added. D) accepting H\u207a from a solution when acids are added. E) both donating H\u207a to a solution when bases are added, and accepting H\u207a when acids are added.",
    back: "E",
  },
  {
    front:
      "One of the buffers that contribute to pH stability in human blood is carbonic acid (H\u2082CO\u2083). Carbonic acid is a weak acid that dissociates into a bicarbonate ion (HCO\u2083\u207b) and a hydrogen ion (H\u207a). Thus,  H\u2082CO\u2083 \u2194 HCO\u2083\u207b + H\u207a  If the pH of the blood drops, one would expect A) a decrease in the concentration of H\u2082CO\u2083 and an increase in the concentration of HCO\u2083\u207b. B) the concentration of hydroxide ion (OH\u207b) to increase. C) the concentration of bicarbonate ion (HCO\u2083\u207b) to increase. D) the HCO\u2083\u207b to act as a base and remove excess H\u207a with the formation of H\u2082CO\u2083. E) the HCO\u2083\u207b to act as an acid and remove excess H\u207a with the formation of H\u2082CO\u2083.",
    back: "D",
  },
  {
    front:
      "One of the buffers that contribute to pH stability in human blood is carbonic acid (H\u2082CO\u2083). Carbonic acid is a weak acid that, when placed in an aqueous solution, dissociates into a bicarbonate ion (HCO\u2083\u207b and a hydrogen ion (H\u207a). Thus,  H\u2082CO\u2083 \u2194 HCO\u2083\u207b + H\u207a  If the pH of the blood increases, one would expect A) a decrease in the concentration of H\u2082CO\u2083 and an increase in the concentration of HCO\u2083\u207b. B) an increase in the concentration of H\u2082CO\u2083 and a decrease in the concentration of HCO\u2083\u207b. C) a decrease in the concentration of HCO\u2083\u207b and an increase in the concentration of H\u207a. D) an increase in the concentration of HCO\u2083\u207b and a decrease in the concentration of OH\u207b. E) a decrease in the concentration of HCO\u2083\u207b and an increase in the concentration of both HH\u2082CO\u2083 and H\u207a.",
    back: "A",
  },
  {
    front:
      "Assume that acid rain has lowered the pH of a particular lake to pH 4.0. What is the hydroxyl ion concentration of this lake? A) 1 \u00d7 10\u207b\u00b9\u2070 mol of hydroxyl ion per liter of lake water B) 1 \u00d7 10\u207b\u2074 mol of hydroxyl ion per liter of lake water C) 10.0 M with regard to hydroxyl ion concentration D) 4.0 M with regard to hydroxyl ion concentration E) 1 \u00d7 10\u207b\u2074 mol of hydroxyl ion per liter of lake water and 4.0 M with regard to hydrogen ion concentration",
    back: "A",
  },
  {
    front:
      "Research indicates that acid precipitation can damage living organisms by A) buffering aquatic systems such as lakes and streams. B) decreasing the H\u207a concentration of lakes and streams. C) increasing the OH\u207b concentration of lakes and streams. D) washing away certain mineral ions that help buffer soil solution and are essential nutrients for plant growth. E) both decreasing the H\u207a concentration of lakes and streams and increasing the OH\u207b concentration of lakes and streams.",
    back: "D",
  },
  {
    front:
      "Consider two solutions: solution X has a pH of 4; solution Y has a pH of 7. From this information, we can reasonably conclude that A) solution Y has no free hydrogen ions (H\u207a). B) the concentration of hydrogen ions in solution X is 30 times as great as the concentration of hydrogen ions in solution Y. C) the concentration of hydrogen ions in solution Y is 1,000 times as great as the concentration of hydrogen ions in solution X. D) the concentration of hydrogen ions in solution X is 3 times as great as the concentration of hydrogen ions in solution Y. E) the concentration of hydrogen ions in solution X is 1,000 times as great as the concentration of hydrogen ions in solution Y.",
    back: "E",
  },
  {
    front:
      "If a solution has a pH of 7, this means that A) there are no H\u207a ions in the water. B) this is a solution of pure water. C) the concentration of H\u207a ions in the water equals the concentration of OH\u207b ions in the water. D) this is a solution of pure water, and the concentration of H\u207a ions in the water is 10\u207b\u2077 M. E) this is a solution of pure water, and the concentration of H\u207a ions equals the concentration of OH\u207b ions in the water.",
    back: "C",
  },
  {
    front:
      "Carbon dioxide (CO\u2082) is readily soluble in water, according to the equation CO\u2082 + H\u2082O \u2194 H\u2082CO\u2083. Carbonic acid (H\u2082CO\u2083) is a weak acid. Respiring cells release CO\u2082 into the bloodstream. What will be the effect on pH of blood as that blood first comes in contact with respiring cells? A) Blood pH will decrease slightly. B) Blood pH will increase slightly. C) Blood pH will remain unchanged. D) Blood pH will first increase, then decrease as CO\u2082 combines with hemoglobin. E) Blood pH will first decrease, then increase sharply as CO\u2082 combines with hemoglobin.",
    back: "A",
  },
  {
    front:
      "A beaker contains 100 mL of NaOH solution at pH = 13. A technician carefully pours into the beaker 10 mL of HCl at pH = 1. Which of the following statements correctly describes the results of this mixing? A) The concentration of Na\u207a ion rises. B) The concentration of Cl\u207b ion will be 0.1 M. C) The concentration of undissociated H\u2082O molecules remains unchanged. D) The pH of the beaker's contents will be neutral. E) The pH of the beaker's contents falls.",
    back: "E",
  },
  {
    front:
      "Equal volumes (5 mL) of vinegar from a freshly opened bottle are added to each of the following solutions. After complete mixing, which of the mixtures will have the highest pH? A) 100 mL of pure water B) 100 mL of freshly brewed coffee C) 100 mL of household cleanser containing 0.5 M ammonia D) 100 mL of freshly squeezed orange juice E) 100 mL of tomato juice",
    back: "C",
  },
  {
    front:
      "Increased atmospheric CO\u2082 concentrations might have what effect on seawater? A) Seawater will become more acidic, and bicarbonate concentrations will decrease. B) Seawater will become more alkaline, and carbonate concentrations will decrease. C) There will be no change in the pH of seawater, because carbonate will turn to bicarbonate. D) Seawater will become more acidic, and carbonate concentrations will decrease. E) Seawater will become more acidic, and carbonate concentrations will increase.",
    back: "D",
  },
  {
    front:
      "How would acidification of seawater affect marine organisms? A) Acidification would increase dissolved carbonate concentrations and promote faster growth of corals and shell-building animals. B) Acidification would decrease dissolved carbonate concentrations and promote faster growth of corals and shell-building animals. C) Acidification would increase dissolved carbonate concentrations and hinder growth of corals and shell-building animals. D) Acidification would decrease dissolved carbonate concentrations and hinder growth of corals and shell-building animals. E) Acidification would increase dissolved bicarbonate concentrations, and cause increased calcification of corals and shellfish.",
    back: "D",
  },
  {
    front:
      "One idea to mitigate the effects of burning fossil fuels on atmospheric CO\u2082 concentrations is to pipe liquid CO\u2082 into the ocean at depths of 2,500 feet or greater. At the high pressures at such depths, CO\u2082 is heavier than water. What potential effects might result from implementing such a scheme? A) increased photosynthetic carbon fixation because of the increased dissolved carbon dioxide in the deep water B) increased carbonate concentrations in the deep waters C) reduced growth of corals from a change in the carbonate\u2014bicarbonate equilibrium D) no effect because carbon dioxide is not soluble in water E) both increased acidity of the deep waters and changes in the growth of bottom-dwelling organisms with calcium carbonate shells",
    back: "E",
  },
  {
    front:
      "If the cytoplasm of a cell is at pH 7, and the mitochondrial matrix is at pH 8, this means that A) the concentration of H\u207a ions is tenfold higher in the cytoplasm than in the mitochondrial matrix. B) the concentration of H\u207a ions is tenfold higher in the mitochondrial matrix than in the cytoplasm. C) the concentration of H\u207a ions in the cytoplasm is 7/8 the concentration in the mitochondrial matrix. D) the mitochondrial matrix is more acidic than the cytoplasm. E) the concentration of H\u207a ions in the cytoplasm is 8/7 the concentration in the mitochondrial matrix.",
    back: "A",
  },
  {
    front:
      "Based on your knowledge of the polarity of water molecules, the solute molecule depicted here is most likely A) positively charged. B) negatively charged. C) without charge. D) hydrophobic. E) nonpolar.",
    back: "A",
  },
  {
    front:
      "How many grams would be equal to 1 mol of the compound shown in the figure above? (carbon = 12, oxygen = 16, hydrogen = 1) A) 29 B) 30 C) 60 D) 150 E) 342",
    back: "C",
  },
  {
    front:
      "How many grams of the compound in the figure above would be required to make 1 L of a 0.5 M solution? (carbon = 12, oxygen = 16, hydrogen = 1) A) 29 B) 30 C) 60 D) 150 E) 342",
    back: "B",
  },
  {
    front:
      "How many grams of the compound in the figure above would be required to make 2.5 L of a 1 M solution? (carbon = 12, oxygen = 16, hydrogen = 1) A) 29 B) 30 C) 60 D) 150 E) 342",
    back: "D",
  },
  {
    front:
      "A small birthday candle is weighed, then lighted and placed beneath a metal can containing 100 mL of water. Careful records are kept as the temperature of the water rises. Data from this experiment are shown on the graph. What amount of heat energy is released in the burning of candle wax? A) 0.5 kilocalories per gram of wax burned B) 5 kilocalories per gram of wax burned C) 10 kilocalories per gram of wax burned D) 20 kilocalories per gram of wax burned E) 50 kilocalories per gram of wax burned",
    back: "A",
  },
  {
    front:
      "Identical heat lamps are arranged to shine on identical containers of water and methanol (wood alcohol), so that each liquid absorbs the same amount of energy minute by minute. The covalent bonds of methanol molecules are nonpolar, so there are no hydrogen bonds among methanol molecules. Which of the following graphs correctly describes what will happen to the temperature of the water and the methanol?  [SEE IMAGE FOR CHOICES]",
    back: "B",
  },
  {
    front: "Which of these molecules would be soluble in water?",
    back: "B",
  },
  {
    front:
      "Carbon dioxide (CO\u2082) is readily soluble in water, according to the equation CO\u2082 + H\u2082O \u2194 H\u2082CO\u2083. Carbonic acid (H\u2082CO\u2083) is a weak acid. If CO\u2082 is bubbled into a beaker containing pure, freshly distilled water, which of the following graphs correctly describes the results?",
    back: "B",
  },
  {
    front:
      "You have two beakers. One contains pure water, the other contains pure methanol (wood alcohol). The covalent bonds of methanol molecules are nonpolar, so there are no hydrogen bonds among methanol molecules. You pour crystals of table salt (NaCl) into each beaker. Predict what will happen. A) Equal amounts of NaCl crystals will dissolve in both water and methanol. B) NaCl crystals will NOT dissolve in either water or methanol. C) NaCl crystals will dissolve readily in water but will not dissolve in methanol. D) NaCl crystals will dissolve readily in methanol but will not dissolve in water. E) When the first crystals of NaCl are added to water or to methanol, they will not dissolve; but as more crystals are added, the crystals will begin to dissolve faster and faster.",
    back: "C",
  },
  {
    front:
      "You have two beakers. One contains a solution of HCl at pH = 1.0. The other contains a solution of NaOH at pH = 13. Into a third beaker, you slowly and cautiously pour 20 mL of the HCl and 20 mL of the NaOH. After complete stirring, the pH of the mixture will be A) 2.0. B) 12.0. C) 7.0. D) 5.0. E) 9.0.",
    back: "C",
  },
  {
    front:
      "Many mammals control their body temperature by sweating. Which property of water is most directly responsible for the ability of sweat to lower body temperature? A) water's change in density when it condenses B) water's ability to dissolve molecules in the air C) the release of heat by the formation of hydrogen bonds D) the absorption of heat by the breaking of hydrogen bonds E) water's high surface tension",
    back: "D",
  },
  {
    front:
      "The bonds that are broken when water vaporizes are A) ionic bonds. B) hydrogen bonds between water molecules. C) covalent bonds between atoms within water molecules. D) polar covalent bonds. E) nonpolar covalent bonds.",
    back: "B",
  },
  {
    front:
      "Which of the following is a hydrophobic material? A) paper B) table salt C) wax D) sugar E) pasta",
    back: "C",
  },
  {
    front:
      "We can be sure that a mole of table sugar and a mole of vitamin C are equal in their A) mass in daltons. B) mass in grams. C) volume. D) number of atoms. E) number of molecules.",
    back: "E",
  },
  {
    front:
      "Measurements show that the pH of a particular lake is 4.0. What is the hydrogen ion concentration of the lake? A) 4.0 M B) 10\u207b\u00b9\u2070 M C) 10\u207b\u2074 M D) 10\u2074 M E) 4%",
    back: "C",
  },
  {
    front:
      "Measurements show that the pH of a particular lake is 4.0. What is the hydroxide ion concentration of the lake? A) 10\u207b\u00b9\u2070 M B) 10\u207b\u2074 M C) 10\u207b\u2077 M D) 10\u207b\u00b9\u2074 M E) 10 M",
    back: "A",
  },
  {
    front:
      "A slice of pizza has 500 kcal. If we could burn the pizza and use all the heat to warm a 50-L container of cold water, what would be the approximate increase in the temperature of the water? (Note: A liter of cold water weighs about 1 kg.) A) 50\u00b0C B) 5\u00b0C C) 1\u00b0C D) 100\u00b0C E) 10\u00b0C",
    back: "E",
  },
  {
    front:
      "How many grams of acetic acid (C\u2082H\u2084O\u2082) would you use to make 10 L of a 0.1 M aqueous solution of acetic acid? (Note: The atomic masses, in daltons, are approximately 12 for carbon, 1 for hydrogen, and 16 for oxygen.) A) 10 g B) 0.1 g C) 6.0 g D) 60 g E) 0.6 g",
    back: "D",
  },
  {
    front:
      "The element present in all organic molecules is A) hydrogen. B) oxygen. C) carbon. D) nitrogen. E) phosphorus.",
    back: "C",
  },
  {
    front:
      "The complexity and variety of organic molecules is due to A) the chemical versatility of carbon atoms. B) the variety of rare elements in organic molecules. C) the fact that they can be synthesized only in living organisms. D) their interaction with water. E) their tremendously large sizes.",
    back: "A",
  },
  {
    front:
      "The experimental approach taken in current biological investigations presumes that A) simple organic compounds can be synthesized in the laboratory from inorganic precursors, but complex organic compounds like carbohydrates and proteins can only be synthesized by living organisms. B) a life force ultimately controls the activities of living organisms and this life force cannot be studied by physical or chemical methods. C) although a life force, or vitalism, exists in living organisms, this life force cannot be studied by physical or chemical methods. D) living organisms are composed of the same elements present in nonliving things, plus a few special trace elements found only in living organisms or their products. E) living organisms can be understood in terms of the same physical and chemical laws that can be used to explain all natural phenomena.",
    back: "E",
  },
  {
    front:
      "Differences among organisms are caused by A) large differences in elemental composition from organism to organism. B) differences in the types and relative amounts of organic molecules synthesized by each organism. C) differences in the elements that bond with carbon in each organism. D) differences in the sizes of the organic molecules in each organism. E) differences in inorganic compounds present in each organism.",
    back: "B",
  },
  {
    front:
      "Which of the following people was the first to synthesize an organic compound, urea, from inorganic starting materials? A) Stanley Miller B) Jakob Berzelius C) Friedrich Wohler D) Hermann Kolbe E) August Kekul\u00e9",
    back: "C",
  },
  {
    front:
      "Stanley Miller's 1953 experiments proved that A) life arose on Earth from simple inorganic molecules. B) organic molecules can be synthesized abiotically under conditions that may have existed on early Earth. C) life arose on Earth from simple organic molecules, with energy from lightning and volcanoes. D) the conditions on early Earth were conducive to the origin of life. E) the conditions on early Earth were conducive to the abiotic synthesis of organic molecules.",
    back: "B",
  },
  {
    front:
      "Hermann Kolbe's synthesis of an organic compound, acetic acid, from inorganic substances that had been prepared directly from pure elements was a significant milestone for what reason? A) It solved an industrial shortage of acetic acid. B) It proved that organic compounds could be synthesized from inorganic compounds. C) It disproved the concept of vitalism. D) It showed that life originated from simple inorganic chemicals. E) It proved that organic compounds could be synthesized from inorganic compounds and disproved the concept of vitalism.",
    back: "E",
  },
  {
    front:
      "Stanley Miller's 1953 experiments assumed that early Earth's atmosphere contained A) hydrogen cyanide, formaldehyde, hydrogen gas, and water vapor. B) ammonia, methane, hydrogen gas, and water vapor. C) ammonia, methane, oxygen gas, and water vapor. D) amino acids, methane, hydrogen cyanide, and water vapor. E) methane, formaldehyde, ammonia, and carbon dioxide.",
    back: "B",
  },
  {
    front:
      "When Stanley Miller applied heat and electrical sparks to a mixture of simple inorganic compounds such as methane, hydrogen gas, ammonia, and water vapor, what compounds were produced? A) mostly amino acids B) only simple organic compounds such as formaldehyde and cyanide C) mostly hydrocarbons D) only simple inorganic compounds E) both simple organic compounds and more complex organic compounds such as amino acids and hydrocarbons",
    back: "E",
  },
  {
    front:
      "How many electron pairs does carbon share in order to complete its valence shell? A) 1 B) 2 C) 3 D) 4 E) 8",
    back: "D",
  },
  {
    front:
      "A carbon atom is most likely to form what kind of bond(s) with other atoms? A) ionic B) hydrogen C) covalent D) covalent bonds and hydrogen bonds E) ionic bonds, covalent bonds, and hydrogen bonds",
    back: "C",
  },
  {
    front:
      "Which of the following statements best describes the carbon atoms present in a seed-eating bird? A) They were incorporated into organic molecules by plants. B) They were processed into sugars through photosynthesis. C) They are ultimately derived from carbon dioxide. D) They were incorporated into organic molecules by plants, and they are ultimately derived from carbon dioxide. E) They were incorporated into organic molecules by plants, they were processed into sugars through photosynthesis, and they are ultimately derived from carbon dioxide.",
    back: "E",
  },
  {
    front:
      "Which of the following statements best describes the carbon atoms present in a seed-eating bird? A) Inorganic carbon atoms in the seeds were incorporated into organic molecules by the bird. B) The carbon atoms ultimately came from the soil. C) The carbon atoms are ultimately derived from coal. D) The carbon atoms ultimately came from carbon dioxide incorporated into sugars through photosynthesis. E) The carbon atoms ultimately came from simple organic compounds that formed abiotically from inorganic carbon, hydrogen, oxygen, and nitrogen atoms.",
    back: "D",
  },
  {
    front:
      "Why are hydrocarbons insoluble in water? A) The majority of their bonds are polar covalent carbon-to-hydrogen linkages. B) The majority of their bonds are nonpolar covalent carbon-to-hydrogen linkages. C) They are hydrophilic. D) They exhibit considerable molecular complexity and diversity. E) They are lighter than water.",
    back: "B",
  },
  {
    front:
      "How many structural isomers are possible for a substance having the molecular formula C\u2084H\u2081\u2080? A) 1 B) 2 C) 4 D) 3 E) 11",
    back: "B",
  },
  {
    front:
      "Which of the following statements correctly describes cis-trans isomers? A) They have variations in arrangement around a double bond. B) They have an asymmetric carbon that makes them mirror images. C) They have the same chemical properties. D) They have different molecular formulas. E) Their atoms and bonds are arranged in different sequences.",
    back: "A",
  },
  {
    front:
      "Research indicates that ibuprofen, a drug used to relieve inflammation and pain, is a mixture of two enantiomers; that is, molecules that A) have identical chemical formulas but differ in the branching of their carbon skeletons. B) are mirror images of one another. C) exist in either linear chain or ring forms. D) differ in the location of their double bonds. E) differ in the arrangement of atoms around their double bonds.",
    back: "B",
  },
  {
    front:
      "What determines whether a carbon atom's covalent bonds to other atoms are in a tetrahedral configuration or a planar configuration? A) the presence or absence of bonds with oxygen atoms B) the presence or absence of double bonds between the carbon atom and other atoms C) the polarity of the covalent bonds between carbon and other atoms D) the presence or absence of bonds with nitrogen atoms E) the solvent that the organic molecule is dissolved in",
    back: "B",
  },
  {
    front:
      "Compared to a hydrocarbon chain where all the carbon atoms are linked by single bonds, a hydrocarbon chain with the same number of carbon atoms, but with one or more double bonds, will A) be more flexible in structure. B) be more constrained in structure. C) be more polar. D) have more hydrogen atoms. E) have fewer structurally distinct isomers.",
    back: "B",
  },
  {
    front:
      "Organic molecules with only hydrogens and five carbon atoms can have different structures in all of the following ways except A) by branching of the carbon skeleton. B) by varying the number of double bonds between carbon atoms. C) by varying the position of double bonds between carbon atoms. D) by forming a ring. E) by forming enantiomers.",
    back: "E",
  },
  {
    front:
      "A compound contains hydroxyl groups as its predominant functional group. Which of the following statements is true concerning this compound? A) It lacks an asymmetric carbon, and it is probably a fat or lipid. B) It should dissolve in water. C) It should dissolve in a nonpolar solvent. D) It won't form hydrogen bonds with water. E) It is hydrophobic.",
    back: "B",
  },
  {
    front:
      "Which of the following is a false statement concerning amino groups? A) They are basic in pH. B) They are found in amino acids. C) They contain nitrogen. D) They are nonpolar. E) They are components of urea.",
    back: "D",
  },
  {
    front:
      "Which two functional groups are always found in amino acids? A) ketone and methyl B) carbonyl and amino C) carboxyl and amino D) amino and sulfhydryl E) hydroxyl and carboxyl",
    back: "C",
  },
  {
    front:
      "Amino acids are acids because they always possess which functional group? A) amino B) carbonyl C) carboxyl D) phosphate E) hydroxyl",
    back: "C",
  },
  {
    front:
      "A carbon skeleton is covalently bonded to both an amino group and a carboxyl group. When placed in water it A) would function only as an acid because of the carboxyl group. B) would function only as a base because of the amino group. C) would function as neither an acid nor a base. D) would function as both an acid and a base. E) is impossible to determine how it would function.",
    back: "D",
  },
  {
    front:
      "Which functional groups can act as acids? A) amino and sulfhydryl B) carbonyl and carboxyl C) carboxyl and phosphate D) hydroxyl and aldehyde E) ketone and amino",
    back: "C",
  },
  {
    front:
      "Testosterone and estradiol are A) soluble in water. B) structural isomers of each other. C) proteins. D) lipids. E) enantiomers of each other.",
    back: "B",
  },
  {
    front:
      "Testosterone and estradiol are male and female sex hormones, respectively, in many vertebrates. In what way(s) do these molecules differ from each other? A) Testosterone and estradiol are structural isomers but have the same molecular formula. B) Testosterone and estradiol are cis-trans isomers but have the same molecular formula. C) Testosterone and estradiol have different functional groups attached to the same carbon skeleton. D) Testosterone and estradiol have distinctly different chemical structures, with one including four fused rings of carbon atoms, while the other has three rings. E) Testosterone and estradiol are enantiomers of the same organic molecule.",
    back: "C",
  },
  {
    front:
      "Which of the following people used this apparatus to study the formation of organic compounds? A) Stanley Miller B) Jakob Berzelius C) Friedrich Wohler D) Hermann Kolbe E) August Kekul\u00e9",
    back: "A",
  },
  {
    front:
      "The two molecules shown in the figure above are best described as A) optical isomers. B) enantiomers. C) structural isomers. D) cis-trans isomers. E) chain length isomers.",
    back: "C",
  },
  {
    front:
      "The figure above shows the structures of glucose and fructose. These two molecules differ in the A) number of carbon, hydrogen, and oxygen atoms. B) types of carbon, hydrogen, and oxygen atoms. C) arrangement of carbon, hydrogen, and oxygen atoms. D) number of oxygen atoms joined to carbon atoms by double covalent bonds. E) number of carbon, hydrogen, and oxygen atoms; the types of carbon, hydrogen, and oxygen atoms; and the arrangement of carbon, hydrogen, and oxygen atoms.",
    back: "C",
  },
  {
    front:
      "The figure above shows the structures of glucose and fructose. These two molecules are A) geometric isotopes. B) enantiomers. C) cis-trans isomers. D) structural isomers. E) nonisotopic isomers.",
    back: "D",
  },
  {
    front:
      "The two molecules shown in the figure above are best described as A) enantiomers. B) radioactive isotopes. C) structural isomers. D) nonisotopic isomers. E) cis-trans isomers.",
    back: "E",
  },
  {
    front:
      "Three or four of the following illustrations depict different structural isomers of the organic compound with molecular formula C\u2086H\u2081\u2084. For clarity, only the carbon skeletons are shown; hydrogen atoms that would be attached to the carbons have been omitted. Which one, if any, is NOT a structural isomer of this compound?  [SEE IMAGE FOR CHOICES]",
    back: "C",
  },
  {
    front:
      "Which of the pairs of molecular structures shown below depict enantiomers (enantiomeric forms) of the same molecule?  [SEE IMAGE FOR CHOICES]",
    back: "D",
  },
  {
    front:
      "Which of the pairs of molecular structures shown below do NOT depict enantiomers (enantiomeric forms) of the same molecule?  [SEE IMAGE FOR CHOICES]",
    back: "C",
  },
  {
    front:
      "Which pair of molecules shown below are not enantiomers of a single molecule?  [SEE IMAGE FOR CHOICES]",
    back: "B",
  },
  {
    front:
      "Thalidomide and L-dopa, shown below, are examples of pharmaceutical drugs that occur as enantiomers, or molecules that A) have identical three-dimensional shapes. B) are mirror images of one another. C) are structural isomers. D) are mirror images of one another and have the same biological activity. E) are cis-trans isomers.",
    back: "B",
  },
  {
    front:
      "What is the name of the functional group shown in the figure above? A) carbonyl B) ketone C) aldehyde D) carboxyl E) hydroxyl",
    back: "D",
  },
  {
    front:
      "Which of the structures illustrated above is an impossible covalently bonded molecule? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "Which of the structures illustrated above contain(s) a carbonyl functional group? A) A B) C and D C) C D) D E) C and E",
    back: "D",
  },
  {
    front:
      "In which of the structures illustrated above are the atoms bonded by ionic bonds? A) A B) B C) C D) C, D, and E only E) none of the structures",
    back: "E",
  },
  {
    front:
      "Which of the structures illustrated above cannot form hydrogen bonds with water molecules? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Which functional group shown above is characteristic of alcohols? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "Which functional group(s) shown above is (are) present in all amino acids? A) A and B B) B and D C) C only D) D only E) C and D",
    back: "E",
  },
  {
    front:
      "Which of the groups shown above is a carbonyl functional group? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Which of the groups shown above is a functional group that helps stabilize proteins by forming covalent cross-links within or between protein molecules? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "Which of the groups above is a carboxyl functional group? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "Which of the groups above is an acidic functional group that can dissociate and release H\u207a into a solution? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "Which of the groups above is a basic functional group that can accept H\u207a and become positively charged? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "Which molecule shown above would have a positive charge in aqueous solution at pH 7? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "Which molecule(s) shown above is (are) ionized in aqueous solution at pH 7? A) A B) B and D C) D and E D) D E) E",
    back: "A",
  },
  {
    front:
      "Which molecules shown above contain a carbonyl group? A) A and B B) B and C C) B, C, and D D) D and E E) E and A",
    back: "B",
  },
  {
    front:
      "Which molecule shown above has a carbonyl functional group in the form of a ketone? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "Which molecule shown above has a carbonyl functional group in the form of an aldehyde? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Which molecule shown above contains a carboxyl group? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "Which molecule shown above can increase the concentration of hydrogen ions in a solution and is therefore an organic acid? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "Which molecule shown above can form a dimer linked by a covalent bond? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Which molecules shown above will form hydrogen bonds with water? A) Only D will form hydrogen bonds with water. B) All of these molecules will form hydrogen bonds with water. C) None of these molecules will form hydrogen bonds with water. D) All of these molecules except B will form hydrogen bonds with water. E) Only C, D, and E will form hydrogen bonds with water.",
    back: "D",
  },
  {
    front:
      "Which molecule shown above contains an amino functional group, but is not an amino acid? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front: "Which molecule shown above is a thiol? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Which molecule shown above contains a functional group that cells use to transfer energy between organic molecules? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "Which molecule shown above can function as a base? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "A chemist wishes to make an organic molecule less acidic. Which of the following functional groups should be added to the molecule in order to do so? A) carboxyl B) sulfhydryl C) hydroxyl D) amino E) phosphate",
    back: "D",
  },
  {
    front:
      "Organic chemistry is currently defined as A) the study of compounds made only by living cells. B) the study of carbon compounds. C) the study of vital forces. D) the study of natural (as opposed to synthetic) compounds. E) the study of hydrocarbons.",
    back: "B",
  },
  {
    front:
      "Which functional group is not present in this molecule? A) carboxyl B) sulfhydryl C) hydroxyl D) amino",
    back: "B",
  },
  {
    front:
      "Which chemical group is most likely to be responsible for an organic molecule behaving as a base? A) hydroxyl B) carbonyl C) carboxyl D) amino E) phosphate",
    back: "D",
  },
  {
    front:
      "Which of the following hydrocarbons has a double bond in its carbon skeleton? A) C\u2083H\u2088 B) C\u2082H\u2086 C) CH\u2084 D) C\u2082H\u2084 E) C\u2082H\u2082",
    back: "D",
  },
  {
    front:
      "Choose the term that correctly describes the relationship between these two sugar molecules: A) structural isomers B) cis-trans isomers C) enantiomers D) isotopes",
    back: "A",
  },
  {
    front:
      "Identify the asymmetric carbon in this molecule. A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "Which action could produce a carbonyl group? A) the replacement of the OH of a carboxyl group with hydrogen B) the addition of a thiol to a hydroxyl C) the addition of a hydroxyl to a phosphate D) the replacement of the nitrogen of an amine with oxygen E) the addition of a sulfhydryl to a carboxyl",
    back: "A",
  },
  {
    front:
      "Humans and mice differ because A) their cells have different small organic molecules. B) their cells make different types of large biological molecules. C) their cells make different types of lipids. D) their cells have some differences in the sequence of nucleotides in their nucleic acids. E) their cells make different types of proteins.",
    back: "D",
  },
  {
    front:
      "Molecules with which functional groups may form polymers via dehydration reactions? A) hydroxyl groups B) carbonyl groups C) carboxyl groups D) either carbonyl or carboxyl groups E) either hydroxyl or carboxyl groups",
    back: "E",
  },
  {
    front:
      "Which of these molecules is not formed by dehydration reactions? A) fatty acids B) disaccharides C) DNA D) protein E) amylose",
    back: "A",
  },
  {
    front:
      "In animal metabolism, most of the monomers released by digestion of food macromolecules are metabolized to provide energy. Only a small portion of these monomers are used for synthesis of new macromolecules. The net result is that A) water is generated by animal metabolism. B) water is consumed by animal metabolism. C) the water consumed is exactly balanced by the water generated, to maintain homeostasis. D) water is consumed during homeostasis, but water is generated during periods of growth. E) water is generated during homeostasis, but water is consumed during periods of growth.",
    back: "B",
  },
  {
    front:
      "Which of these classes of biological molecules consist of both small molecules and macromolecular polymers? A) lipids B) carbohydrates C) proteins D) nucleic acids E) lipids, carbohydrates, proteins, and nucleic acids all consist of only macromolecular polymers",
    back: "B",
  },
  {
    front:
      "Which of the following is not a polymer? A) glucose B) starch C) cellulose D) chitin E) DNA",
    back: "A",
  },
  {
    front:
      "What is the chemical reaction mechanism by which cells make polymers from monomers? A) phosphodiester linkages B) hydrolysis C) dehydration reactions D) ionic bonding of monomers E) the formation of disulfide bridges between monomers",
    back: "C",
  },
  {
    front:
      "How many molecules of water are needed to completely hydrolyze a polymer that is 11 monomers long? A) 12 B) 11 C) 10 D) 9 E) 8",
    back: "C",
  },
  {
    front:
      "Which of the following best summarizes the relationship between dehydration reactions and hydrolysis? A) Dehydration reactions assemble polymers, and hydrolysis reactions break down polymers. B) Dehydration reactions eliminate water from lipid membranes, and hydrolysis makes lipid membranes water permeable. C) Dehydration reactions can occur only after hydrolysis. D) Hydrolysis creates monomers, and dehydration reactions break down polymers. E) Dehydration reactions ionize water molecules and add hydroxyl groups to polymers; hydrolysis reactions release hydroxyl groups from polymers.",
    back: "A",
  },
  {
    front:
      "Which of the following polymers contain nitrogen? A) starch B) glycogen C) cellulose D) chitin E) amylopectin",
    back: "D",
  },
  {
    front:
      "The molecular formula for glucose is C\u2086H\u20812O\u2086. What would be the molecular formula for a molecule made by linking three glucose molecules together by dehydration reactions? A) C\u2081\u2088H\u2083\u2086O\u2081\u2088 B) C\u2081\u2088H\u2083\u2082O\u2081\u2086 C) C\u2086H\u2081\u2080O\u2085 D) C1\u2088H\u2081\u2080O\u2081\u2085 E) C\u2083H\u2086O\u2083",
    back: "B",
  },
  {
    front:
      "The enzyme amylase can break glycosidic linkages between glucose monomers only if the monomers are the \u03b1 form. Which of the following could amylase break down? A) glycogen B) cellulose C) chitin D) glycogen and chitin only E) glycogen, cellulose, and chitin",
    back: "A",
  },
  {
    front:
      "On food packages, to what does the term insoluble fiber refer? A) cellulose B) polypeptides C) starch D) amylopectin E) chitin",
    back: "A",
  },
  {
    front:
      "A molecule with the chemical formula C\u2086H\u2081\u2082O\u2086 is probably a A) carbohydrate. B) lipid. C) monosaccharide D) carbohydrate and lipid only. E) carbohydrate and monosaccharide only.",
    back: "E",
  },
  {
    front:
      "Lactose, a sugar in milk, is composed of one glucose molecule joined by a glycosidic linkage to one galactose molecule. How is lactose classified? A) as a pentose B) as a hexose C) as a monosaccharide D) as a disaccharide E) as a polysaccharide",
    back: "D",
  },
  {
    front:
      "All of the following are polysaccharides except A) lactose. B) glycogen. C) chitin. D) cellulose. E) amylopectin.",
    back: "A",
  },
  {
    front:
      "Which of the following is true of both starch and cellulose? A) They are both polymers of glucose. B) They are cis-trans isomers of each other. C) They can both be digested by humans. D) They are both used for energy storage in plants. E) They are both structural components of the plant cell wall.",
    back: "A",
  },
  {
    front:
      "Which of the following is true of cellulose? A) It is a polymer composed of enantiomers of glucose. B) It is a storage polysaccharide for energy in plant cells. C) It is digestible by bacteria in the human gut. D) It is a major structural component of plant cell walls. E) It is a polymer composed of enantiomers of glucose, it is a storage polysaccharide for energy in plant cells, it is digestible by bacteria in the human gut, and it is a major structural component of plant cell walls.",
    back: "D",
  },
  {
    front:
      "Humans can digest starch but not cellulose because A) the monomer of starch is glucose, while the monomer of cellulose is galactose. B) humans have enzymes that can hydrolyze the \u03b2 glycosidic linkages of starch but not the \u03b1 glycosidic linkages of cellulose. C) humans have enzymes that can hydrolyze the \u03b1 glycosidic linkages of starch but not the \u03b2 glycosidic linkages of cellulose. D) humans harbor starch-digesting bacteria in the digestive tract. E) the monomer of starch is glucose, while the monomer of cellulose is glucose with a nitrogen-containing group.",
    back: "C",
  },
  {
    front:
      "Which of the following statements concerning saturated fats is not true? A) They are more common in animals than in plants. B) They have multiple double bonds in the carbon chains of their fatty acids. C) They generally solidify at room temperature. D) They contain more hydrogen than unsaturated fats having the same number of carbon atoms. E) They are one of several factors that contribute to atherosclerosis.",
    back: "B",
  },
  {
    front:
      "A molecule with the formula C\u2081\u2088H3\u2086O\u2082 is probably a A) carbohydrate. B) fatty acid. C) protein. D) nucleic acid. E) hydrocarbon.",
    back: "B",
  },
  {
    front:
      "Which of the following statements is true for the class of biological molecules known as lipids? A) They are insoluble in water. B) They are made from glycerol, fatty acids, and phosphate. C) They contain less energy than proteins and carbohydrates. D) They are made by dehydration reactions. E) They contain nitrogen.",
    back: "A",
  },
  {
    front:
      'The label on a container of margarine lists "hydrogenated vegetable oil" as the major ingredient. What is the result of adding hydrogens to vegetable oil? A) The hydrogenated vegetable oil has a lower melting point. B) The hydrogenated vegetable oil stays solid at room temperature. C) The hydrogenated vegetable oil has more "kinks" in the fatty acid chains. D) The hydrogenated vegetable oil has fewer trans fatty acids. E) The hydrogenated vegetable oil is less likely to clog arteries.',
    back: "B",
  },
  {
    front:
      "Which of the following is true regarding saturated fatty acids? A) They are the predominant fatty acid in corn oil. B) They have double bonds between carbon atoms of the fatty acids. C) They are the principal molecules in lard and butter. D) They are usually liquid at room temperature. E) They are usually produced by plants.",
    back: "C",
  },
  {
    front:
      "Large organic molecules are usually assembled by polymerization of a few kinds of simple subunits. Which of the following is an exception to this statement? A) a steroid B) cellulose C) DNA D) an enzyme E) a contractile protein",
    back: "A",
  },
  {
    front:
      "Which modifications of fatty acids will best keep triglycerides solid at warmer temperatures? A) creating cis double bonds to the fatty acids B) adding hydrogens to the fatty acids C) creating trans double bonds to the fatty acids D) adding hydrogens and trans double bonds to the fatty acids E) adding cis double bonds and trans double bonds to the fatty acids",
    back: "D",
  },
  {
    front:
      "Why are human sex hormones considered to be lipids? A) They are essential components of cell membranes. B) They are not soluble in water. C) They are made of fatty acids. D) They are hydrophilic compounds. E) They contribute to atherosclerosis.",
    back: "B",
  },
  {
    front:
      "All of the following contain amino acids except A) hemoglobin. B) cholesterol. C) antibodies. D) enzymes. E) insulin.",
    back: "B",
  },
  {
    front:
      "The bonding of two amino acid molecules to form a larger molecule requires A) the release of a water molecule. B) the release of a carbon dioxide molecule. C) the addition of a nitrogen atom. D) the addition of a water molecule. E) the release of a nitrous oxide molecule.",
    back: "A",
  },
  {
    front:
      "There are 20 different amino acids. What makes one amino acid different from another? A) different side chains (R groups) attached to a carboxyl carbon B) different side chains (R groups) attached to the amino groups C) different side chains (R groups) attached to an \u03b1 carbon D) different structural and optical isomers E) different asymmetric carbons",
    back: "C",
  },
  {
    front:
      "The bonding of two amino acid molecules to form a larger molecule requires which of the following? A) removal of a water molecule B) addition of a water molecule C) formation of a glycosidic bond D) formation of a hydrogen bond E) both removal of a water molecule and formation of a hydrogen bond",
    back: "A",
  },
  {
    front:
      "Polysaccharides, triacylglycerides, and proteins are similar in that they A) are synthesized from monomers by the process of hydrolysis. B) are synthesized from subunits by dehydration reactions. C) are synthesized as a result of peptide bond formation between monomers. D) are decomposed into their subunits by dehydration reactions. E) all contain nitrogen in their monomer building blocks.",
    back: "B",
  },
  {
    front:
      "Dehydration reactions are used in forming which of the following compounds? A) triacylglycerides B) polysaccharides C) proteins D) triacylglycerides and proteins only E) triacylglycerides, polysaccharides, and proteins",
    back: "E",
  },
  {
    front:
      "Upon chemical analysis, a particular polypeptide was found to contain 100 amino acids. How many peptide bonds are present in this protein? A) 101 B) 100 C) 99 D) 98 E) 97",
    back: "C",
  },
  {
    front:
      "What aspects of protein structure are stabilized or assisted by hydrogen bonds? A) primary structure B) secondary structure C) tertiary structure D) quaternary structure E) secondary, tertiary, and quaternary structures, but not primary structure",
    back: "E",
  },
  {
    front:
      "How many different kinds of polypeptides, each composed of 12 amino acids, could be synthesized using the 20 common amino acids? A) 4\u00b9\u00b2 B) 12\u00b2\u2070 C) 240 D) 20 E) 20\u00b9\u00b2",
    back: "E",
  },
  {
    front:
      "Which bonds are created during the formation of the primary structure of a protein? A) peptide bonds B) hydrogen bonds C) disulfide bonds D) phosphodiester bonds E) peptide bonds, hydrogen bonds, and disulfide bonds",
    back: "A",
  },
  {
    front:
      "What maintains the secondary structure of a protein? A) peptide bonds B) hydrogen bonds between the amino group of one peptide bond and the carboxyl group of another peptide bond C) disulfide bonds D) hydrophobic interactions E) hydrogen bonds between the R groups",
    back: "B",
  },
  {
    front:
      "Which type of interaction stabilizes the \u03b1 helix and the \u03b2 pleated sheet structures of proteins? A) hydrophobic interactions B) disulfide bonds C) ionic bonds D) hydrogen bonds E) peptide bonds",
    back: "D",
  },
  {
    front:
      "Which level of protein structure do the \u03b1 helix and the \u03b2 pleated sheet represent? A) primary B) secondary C) tertiary D) quaternary E) primary, secondary, tertiary, and quaternary",
    back: "B",
  },
  {
    front:
      "The amino acids of the protein keratin are arranged predominantly in an \u03b1 helix. This secondary structure is stabilized by A) covalent bonds. B) peptide bonds. C) ionic bonds. D) polar bonds. E) hydrogen bonds.",
    back: "E",
  },
  {
    front:
      "The tertiary structure of a protein is the A) bonding together of several polypeptide chains by weak bonds. B) order in which amino acids are joined in a polypeptide chain. C) unique three-dimensional shape of the fully folded polypeptide. D) organization of a polypeptide chain into an \u03b1 helix or \u03b2 pleated sheet. E) overall protein structure resulting from the aggregation of two or more polypeptide subunits.",
    back: "C",
  },
  {
    front:
      "What type of covalent bond between amino acid side chains (R groups) functions in maintaining a polypeptide's specific three-dimensional shape? A) ionic bond B) hydrophobic interaction C) van der Waals interaction D) disulfide bond E) hydrogen bond",
    back: "D",
  },
  {
    front:
      "At which level of protein structure are interactions between the side chains (R groups) most important? A) primary B) secondary C) tertiary D) quaternary E) all of the above",
    back: "C",
  },
  {
    front:
      "The R group or side chain of the amino acid serine is \u2013CH\u2082\u2013OH. The R group or side chain of the amino acid leucine is \u2013CH\u2082\u2013CH\u2013(CH\u2083)\u2082. Where would you expect to find these amino acids in a globular protein in aqueous solution? A) Serine would be in the interior, and leucine would be on the exterior of the globular protein. B) Leucine would be in the interior, and serine would be on the exterior of the globular protein. C) Both serine and leucine would be in the interior of the globular protein. D) Both serine and leucine would be on the exterior of the globular protein. E) Both serine and leucine would be in the interior and on the exterior of the globular protein.",
    back: "B",
  },
  {
    front:
      "Misfolding of polypeptides is a serious problem in cells. Which of the following diseases are associated with an accumulation of misfolded polypeptides? A) Alzheimer's only B) Parkinson's only C) diabetes mellitus only D) Alzheimer's and Parkinson's only E) Alzheimer's, Parkinson's, and diabetes mellitus",
    back: "D",
  },
  {
    front:
      "Changing a single amino acid in a protein consisting of 325 amino acids would A) alter the primary structure of the protein, but not its tertiary structure or function. B) cause the tertiary structure of the protein to unfold. C) always alter the biological activity or function of the protein. D) always alter the primary structure of the protein and disrupt its biological activity. E) always alter the primary structure of the protein, sometimes alter the tertiary structure of the protein, and affect its biological activity.",
    back: "E",
  },
  {
    front:
      "Normal hemoglobin is a tetramer, consisting of two molecules of \u03b2 hemoglobin and two molecules of \u03b1 hemoglobin. In sickle-cell disease, as a result of a single amino acid change, the mutant hemoglobin tetramers associate with each other and assemble into large fibers. Based on this information alone, we can conclude that sickle-cell hemoglobin exhibits A) altered primary structure. B) altered secondary structure. C) altered tertiary structure. D) altered quaternary structure. E) altered primary structure and altered quaternary structure; the secondary and tertiary structures may or may not be altered.",
    back: "E",
  },
  {
    front:
      "What methods may be used to elucidate the structures of purified proteins? A) X-ray crystallography B) bioinformatics C) analysis of amino acid sequence of small fragments D) NMR spectroscopy E) both X-ray crystallography and NMR spectroscopy",
    back: "E",
  },
  {
    front:
      "In a normal cellular protein, where would you expect to find a hydrophobic amino acid like valine? A) in the interior of the folded protein, away from water B) on the exterior surface of the protein, interacting with water C) in the transmembrane portion interacting with lipid fatty acid chains D) in the interior of the folded protein, away from water, or in a transmembrane portion interacting with lipid fatty acid chains E) anywhere in the protein, with equal probability",
    back: "D",
  },
  {
    front:
      "Which of the following techniques uses the amino acid sequences of polypeptides to predict a protein's three-dimensional structure? A) X-ray crystallography B) bioinformatics C) analysis of amino acid sequence of small fragments D) NMR spectroscopy E) high-speed centrifugation",
    back: "B",
  },
  {
    front:
      "If cells are grown in a medium containing radioactive \u00b3\u2075S, which of these molecules will be labeled? A) phospholipids B) nucleic acids C) proteins D) amylose E) both proteins and nucleic acids",
    back: "C",
  },
  {
    front:
      "What is the term used for a protein molecule that assists in the proper folding of other proteins? A) tertiary protein B) chaperonin C) enzyme protein D) renaturing protein E) denaturing protein",
    back: "B",
  },
  {
    front:
      "DNAase is an enzyme that catalyzes the hydrolysis of the covalent bonds that join nucleotides together. What would first happen to DNA molecules treated with DNAase? A) The two strands of the double helix would separate. B) The phosphodiester bonds between deoxyribose sugars would be broken. C) The purines would be separated from the deoxyribose sugars. D) The pyrimidines would be separated from the deoxyribose sugars. E) All bases would be separated from the deoxyribose sugars.",
    back: "B",
  },
  {
    front:
      "Which of the following statements about the 5' end of a polynucleotide strand of DNA is correct? A) The 5' end has a hydroxyl group attached to the number 5 carbon of ribose. B) The 5' end has a phosphate group attached to the number 5 carbon of ribose. C) The 5' end has phosphate attached to the number 5 carbon of the nitrogenous base. D) The 5' end has a carboxyl group attached to the number 5 carbon of ribose. E) The 5' end is the fifth position on one of the nitrogenous bases.",
    back: "B",
  },
  {
    front:
      "One of the primary functions of RNA molecules is to A) transmit genetic information to offspring. B) function in the synthesis of proteins. C) make a copy of itself, thus ensuring genetic continuity. D) act as a pattern or blueprint to form DNA. E) form the genes of higher organisms.",
    back: "B",
  },
  {
    front:
      "If \u00b9\u2074C-labeled uridine triphosphate is added to the growth medium of cells, what macromolecules will be labeled? A) phospholipids B) DNA C) RNA D) both DNA and RNA E) proteins",
    back: "C",
  },
  {
    front:
      "Which of the following descriptions best fits the class of molecules known as nucleotides? A) a nitrogenous base and a phosphate group B) a nitrogenous base and a pentose sugar C) a nitrogenous base, a phosphate group, and a pentose sugar D) a phosphate group and an adenine or uracil E) a pentose sugar and a purine or pyrimidine",
    back: "C",
  },
  {
    front:
      "Which of the following are nitrogenous bases of the pyrimidine type? A) guanine and adenine B) cytosine and uracil C) thymine and guanine D) ribose and deoxyribose E) adenine and thymine",
    back: "B",
  },
  {
    front:
      "Which of the following are nitrogenous bases of the purine type? A) cytosine and guanine B) guanine and adenine C) adenine and thymine D) thymine and uracil E) uracil and cytosine",
    back: "B",
  },
  {
    front:
      "If a DNA sample were composed of 10% thymine, what would be the percentage of guanine? A) 10 B) 20 C) 40 D) 80 E) impossible to tell from the information given",
    back: "C",
  },
  {
    front:
      "A double-stranded DNA molecule contains a total of 120 purines and 120 pyrimidines. This DNA molecule could be composed of A) 120 adenine and 120 uracil molecules. B) 120 thymine and 120 adenine molecules. C) 120 cytosine and 120 thymine molecules. D) 120 adenine and 120 cytosine molecules. E) 120 guanine and 120 thymine molecules.",
    back: "B",
  },
  {
    front:
      "The difference between the sugar in DNA and the sugar in RNA is that the sugar in DNA A) is a six-carbon sugar and the sugar in RNA is a five-carbon sugar. B) can form a double-stranded molecule. C) is an aldehyde sugar and the sugar in RNA is a keto sugar. D) is in the \u03b1 configuration and the sugar in RNA is in the \u03b2 configuration. E) contains one less oxygen atom.",
    back: "E",
  },
  {
    front:
      "Which of the following statements best summarizes the differences between DNA and RNA? A) DNA encodes hereditary information, whereas RNA does not. B) The bases in DNA form base-paired duplexes, whereas the bases in RNA do not. C) DNA nucleotides contain a different sugar than RNA nucleotides. D) DNA contains the base uracil, whereas RNA contains the base thymine. E) DNA encodes hereditary information, whereas RNA does not; the bases in DNA form base-paired duplexes, whereas the bases in RNA do not; and DNA nucleotides contain a different sugar than RNA nucleotides.",
    back: "C",
  },
  {
    front:
      "If one strand of a DNA molecule has the sequence of bases 5'ATTGCA3', the other complementary strand would have the sequence A) 5'TAACGT3'. B) 5'TGCAAT3'. C) 5'UAACGU3'. D) 3'UAACGU5'. E) 5'UGCAAU3'.",
    back: "B",
  },
  {
    front:
      "What is the structural feature that allows DNA to replicate? A) sugar-phosphate backbone B) complementary pairing of the nitrogenous bases C) disulfide bonding (bridging) of the two helixes D) twisting of the molecule to form an \u03b1 helix E) three-component structure of the nucleotides",
    back: "B",
  },
  {
    front:
      "A new organism is discovered in the forests of Costa Rica. Scientists there determine that the polypeptide sequence of hemoglobin from the new organism has 72 amino acid differences from humans, 65 differences from a gibbon, 49 differences from a rat, and 5 differences from a frog. These data suggest that the new organism A) is more closely related to humans than to frogs. B) is more closely related to frogs than to humans. C) evolved at about the same time as frogs, which is much earlier than primates and mammals. D) is more closely related to humans than to rats. E) is more closely related to frogs than to humans and also evolved at about the same time as frogs, which is much earlier than primates and mammals.",
    back: "B",
  },
  {
    front:
      "Which of the following is an example of hydrolysis? A) the reaction of two monosaccharides, forming a disaccharide with the release of water B) the synthesis of two amino acids, forming a peptide with the release of water C) the reaction of a fat, forming glycerol and fatty acids with the release of water D) the reaction of a fat, forming glycerol and fatty acids with the consumption of water E) the synthesis of a nucleotide from a phosphate, a pentose sugar, and a nitrogenous base with the production of a molecule of water",
    back: "D",
  },
  {
    front:
      "If cells are grown in a medium containing radioactive \u00b3\u00b2P-labeled phosphate, which of these molecules will be labeled? A) phospholipids B) nucleic acids C) proteins D) amylose E) both phospholipids and nucleic acids",
    back: "E",
  },
  {
    front:
      "If cells are grown in a medium containing radioactive \u00b9\u2075N, which of these molecules will be labeled? A) fatty acids only B) nucleic acids only C) proteins only D) amylase only E) both proteins and nucleic acids",
    back: "E",
  },
  {
    front:
      "How will brief heating (to 95\u00b0C) affect macromolecular structures in aqueous solution? A) DNA duplexes will unwind and separate. B) Proteins will unfold (denature). C) Starch will hydrolyze into monomeric sugars. D) Proteins will hydrolyze into amino acids. E) DNA duplexes will unwind and separate, and proteins will unfold (denature).",
    back: "E",
  },
  {
    front:
      "Which of the following is not a monomer/polymer pairing? A) monosaccharide/polysaccharide B) amino acid/protein C) triglyceride/phospholipid bilayer D) deoxyribonucleotide/DNA E) ribonucleotide/RNA",
    back: "C",
  },
  {
    front:
      "card image If two molecules of the general type shown in Figure 5.1 were linked together, carbon-1 of one molecule to carbon-4 of the other, the single molecule that would result would be A) maltose. B) fructose. C) glucose. D) galactose. E) sucrose.",
    back: "A",
  },
  {
    front:
      "card image Which of the following descriptors is true of the molecule shown in Figure 5.1? A) hexose B) fructose C) glucose D) hexose and fructose only E) hexose and glucose only",
    back: "E",
  },
  {
    front:
      "card image Which of the following statements is true regarding the molecule illustrated in Figure 5.2? A) It is a saturated fatty acid. B) A diet rich in this molecule may contribute to atherosclerosis. C) Molecules of this type are usually liquid at room temperature. D) It is a saturated fatty acid and a diet rich in this molecule may contribute to atherosclerosis. E) It is a saturated fatty acid, a diet rich in this molecule may contribute to atherosclerosis, and molecules of this type are usually liquid at room temperature.",
    back: "D",
  },
  {
    front:
      "card image Which of the following statements is true regarding the molecule illustrated in Figure 5.3? A) It is a saturated fatty acid. B) A diet rich in this molecule may contribute to atherosclerosis. C) Molecules of this type are usually liquid at room temperature. D) It is a saturated fatty acid and a diet rich in this molecule may contribute to atherosclerosis. E) It is a saturated fatty acid, a diet rich in this molecule may contribute to atherosclerosis, and molecules of this type are usually liquid at room temperature.",
    back: "C",
  },
  {
    front:
      "card image The molecule shown in Figure 5.3 is a A) polysaccharide. B) polypeptide. C) saturated fatty acid. D) triacylglycerol. E) unsaturated fatty acid.",
    back: "E",
  },
  {
    front:
      "card image What is the structure shown in Figure 5.4? A) pentose molecule B) fatty acid molecule C) steroid molecule D) oligosaccharide molecule E) phospholipid molecule",
    back: "C",
  },
  {
    front:
      "card image Which of the following statements is/are true regarding the chemical reaction illustrated in Figure 5.5? A) It is a hydrolysis reaction. B) It results in a peptide bond. C) It joins two fatty acids together. D) It is a hydrolysis reaction and it results in a peptide bond. E) It is a hydrolysis reaction, it results in a peptide bond, and it joins two fatty acids together.",
    back: "B",
  },
  {
    front:
      "card image At which bond would water need to be added to achieve hydrolysis of the peptide, back to its component amino acid? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front: "card image Which bond is a peptide bond? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "card image Which bond is closest to the amino terminus of the molecule? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "card image The structure depicted in Figure 5.7 shows the A) 1-4 linkage of the \u03b1 glucose monomers of starch. B) 1-4 linkage of the \u03b2 glucose monomers of cellulose. C) double-helical structure of a DNA molecule. D) \u03b1 helix secondary structure of a polypeptide. E) \u03b2 pleated sheet secondary structure of a polypeptide.",
    back: "D",
  },
  {
    front:
      "card image Which molecule has both hydrophilic and hydrophobic properties and would be found in plasma membranes? A) 1 B) 5 C) 6 D) 12 E) 14",
    back: "B",
  },
  {
    front:
      "card image Which of the following combinations could be linked together to form a nucleotide? A) 1, 2, and 11 B) 3, 7, and 8 C) 5, 9, and 10 D) 11, 12, and 13 E) 12, 14, and 15",
    back: "D",
  },
  {
    front:
      "card image Which of the following molecules contain(s) an aldehyde type of carbonyl functional group? A) 1 B) 4 C) 8 D) 10 E) 1 and 4",
    back: "E",
  },
  {
    front: "card image Which molecule is glycerol? A) 1 B) 6 C) 10 D) 14 E) 15",
    back: "C",
  },
  {
    front:
      "card image Which molecule is a saturated fatty acid? A) 1 B) 5 C) 6 D) 8 E) 9",
    back: "E",
  },
  {
    front:
      "card image Which of the following molecules is a purine type of nitrogenous base? A) 2 B) 3 C) 5 D) 12 E) 13",
    back: "E",
  },
  {
    front:
      "card image Which of the following molecules act as building blocks (monomers) of polypeptides? A) 1, 4, and 6 B) 2, 7, and 8 C) 7, 8, and 13 D) 11, 12, and 13 E) 12, 13, and 15",
    back: "B",
  },
  {
    front:
      "card image Which of the following molecules is an amino acid with a hydrophobic R group or side chain? A) 3 B) 7 C) 8 D) 12 E) 13",
    back: "B",
  },
  {
    front:
      "card image Which of the following molecules could be joined together by a peptide bond as a result of a dehydration reaction? A) 2 and 3 B) 3 and 7 C) 7 and 8 D) 8 and 9 E) 12 and 13",
    back: "C",
  },
  {
    front:
      "card image A fat (or triacylglycerol) would be formed as a result of a dehydration reaction between A) one molecule of 9 and three molecules of 10. B) three molecules of 9 and one molecule of 10. C) one molecule of 5 and three molecules of 9. D) three molecules of 5 and one molecule of 9. E) one molecule of 5 and three molecules of 10.",
    back: "B",
  },
  {
    front:
      "card image Which of the following molecules could be joined together by a phosphodiester type of covalent bond? A) 3 and 4 B) 3 and 8 C) 6 and 15 D) 11 and 12 E) 11 and 13",
    back: "D",
  },
  {
    front:
      "card image Which of the following molecules is the pentose sugar found in RNA? A) 1 B) 4 C) 6 D) 12 E) 13",
    back: "D",
  },
  {
    front:
      "card image Which of the following molecules contains a glycosidic linkage type of covalent bond? A) 4 B) 6 C) 12 D) 13 E) 15",
    back: "E",
  },
  {
    front:
      "card image Which of the following molecules has a functional group that frequently forms covalent bonds that maintain the tertiary structure of a protein? A) 2 B) 3 C) 7 D) 8 E) 9",
    back: "A",
  },
  {
    front:
      'card image Which of the following molecules consists of a hydrophilic "head" region and a hydrophobic "tail" region? A) 2 B) 5 C) 7 D) 9 E) 11',
    back: "B",
  },
  {
    front:
      "card image Which of the following statements is false? A) Molecules 1 and 4 could be joined together by a glycosidic linkage to form a disaccharide. B) Molecules 9 and 10 could be joined together by ester bonds to form a triacylglycerol. C) Molecules 2 and 7 could be joined together to form a short peptide. D) Molecules 2, 7, and 8 could be joined together to form a short peptide. E) Molecules 14 and 15 could be joined together to form a polypeptide.",
    back: "E",
  },
  {
    front:
      "Approximately 32 different monomeric carbohydrate subunits are found in various natural polysaccharides. Proteins are composed of 20 different amino acids. DNA and RNA are each synthesized from four nucleotides.   Among these biological polymers, which has the least structural variety? A) polysaccharides B) proteins C) DNA D) RNA",
    back: "C",
  },
  {
    front:
      "Which class of biological polymer has the greatest functional variety? A) polysaccharides B) proteins C) DNA D) RNA",
    back: "B",
  },
  {
    front:
      "Professor Jamey Marth at the University of California, Santa Barbara, identified 70 molecules that are used to build cellular macromolecules and structures. These include at least 34 saccharides, 8 nucleosides, and 20 amino acids. In theory, then, which class of biological polymer has the greatest information-coding capacity? A) polysaccharides B) proteins C) DNA D) RNA",
    back: "A",
  },
  {
    front:
      "Which of the following categories includes all others in the list? A) monosaccharide B) disaccharide C) starch D) carbohydrate E) polysaccharide",
    back: "D",
  },
  {
    front:
      "The enzyme amylase can break glycosidic linkages between glucose monomers only if the monomers are in the \u03b1 form. Which of the following could amylase break down? A) glycogen, starch, and amylopectin B) glycogen and cellulose C) cellulose and chitin D) starch and chitin E) starch, amylopectin, and cellulose",
    back: "A",
  },
  {
    front:
      "Which of the following statements concerning unsaturated fats is true? A) They are more common in animals than in plants. B) They have double bonds in the carbon chains of their fatty acids. C) They generally solidify at room temperature. D) They contain more hydrogen than do saturated fats having the same number of carbon atoms. E) They have fewer fatty acid molecules per fat molecule.",
    back: "B",
  },
  {
    front:
      "The structural level of a protein least affected by a disruption in hydrogen bonding is the A) primary level. B) secondary level. C) tertiary level. D) quaternary level. E) All structural levels are equally affected.",
    back: "A",
  },
  {
    front:
      "Enzymes that break down DNA catalyze the hydrolysis of the covalent bonds that join nucleotides together. What would happen to DNA molecules treated with these enzymes? A) The two strands of the double helix would separate. B) The phosphodiester linkages of the polynucleotide backbone would be broken. C) The purines would be separated from the deoxyribose sugars. D) The pyrimidines would be separated from the deoxyribose sugars. E) All bases would be separated from the deoxyribose sugars.",
    back: "B",
  },
  {
    front:
      "The molecular formula for glucose is C\u2086H\u2081\u2082O\u2086. What would be the molecular formula for a polymer made by linking ten glucose molecules together by dehydration reactions? A) C\u2086\u2080H\u2081\u2082\u2080O\u2086\u2080 B) C\u2086H\u2081\u2082O\u2086 C) C\u2086\u2080H\u2081\u2080\u2082O\u2085\u2081 D) C\u2086\u2080H\u2081\u2080\u2080O\u2085\u2080 E) C\u2086\u2080H\u2081\u2081\u2081O\u2085\u2081",
    back: "C",
  },
  {
    front:
      "Which of the following pairs of base sequences could form a short stretch of a normal double helix of DNA? A) 5'-purine-pyrimidine-purine-pyrimidine-3' with 3'-purine-pyrimidine-purine-pyrimidine-5' B) 5'-AGCT-3' with 5'-TCGA-3' C) 5'-GCGC-3' with 5'-TATA-3' D) 5'-ATGC-3' with 5'-GCAT-3' E) All of these pairs are correct.",
    back: "D",
  },
  {
    front:
      "Who was/were the first to propose that cell membranes are phospholipid bilayers? A) H. Davson and J. Danielli B) I. Langmuir C) C. Overton D) S. Singer and G. Nicolson E) E. Gorter and F. Grendel",
    back: "E",
  },
  {
    front:
      "Some regions of the plasma membrane, called lipid rafts, have a higher concentration of cholesterol molecules. As a result, these lipid rafts A) are more fluid than the surrounding membrane. B) are more rigid than the surrounding membrane. C) are able to flip from inside to outside. D) detach from the plasma membrane and clog arteries. E) have higher rates of lateral diffusion of lipids and proteins into and out of the lipid rafts.",
    back: "B",
  },
  {
    front:
      "Singer and Nicolson's fluid mosaic model of the membrane proposed that A) membranes are a phospholipid bilayer. B) membranes are a phospholipid bilayer between two layers of hydrophilic proteins. C) membranes are a single layer of phospholipids and proteins. D) membranes consist of protein molecules embedded in a fluid bilayer of phospholipids. E) membranes consist of a mosaic of polysaccharides and proteins.",
    back: "D",
  },
  {
    front:
      "Which of the following types of molecules are the major structural components of the cell membrane? A) phospholipids and cellulose B) nucleic acids and proteins C) phospholipids and proteins D) proteins and cellulose E) glycoproteins and cholesterol",
    back: "C",
  },
  {
    front:
      "When biological membranes are frozen and then fractured, they tend to break along the middle of the bilayer. The best explanation for this is that A) the integral membrane proteins are not strong enough to hold the bilayer together. B) water that is present in the middle of the bilayer freezes and is easily fractured. C) hydrophilic interactions between the opposite membrane surfaces are destroyed on freezing. D) the carbon-carbon bonds of the phospholipid tails are easily broken. E) the hydrophobic interactions that hold the membrane together are weakest at this point.",
    back: "E",
  },
  {
    front:
      "The presence of cholesterol in the plasma membranes of some animals A) enables the membrane to stay fluid more easily when cell temperature drops. B) enables the animal to remove hydrogen atoms from saturated phospholipids. C) enables the animal to add hydrogen atoms to unsaturated phospholipids. D) makes the membrane less flexible, allowing it to sustain greater pressure from within the cell. E) makes the animal more susceptible to circulatory disorders.",
    back: "A",
  },
  {
    front:
      "According to the fluid mosaic model of cell membranes, which of the following is a true statement about membrane phospholipids? A) They can move laterally along the plane of the membrane. B) They frequently flip-flop from one side of the membrane to the other. C) They occur in an uninterrupted bilayer, with membrane proteins restricted to the surface of the membrane. D) They are free to depart from the membrane and dissolve in the surrounding solution. E) They have hydrophilic tails in the interior of the membrane.",
    back: "A",
  },
  {
    front:
      "Which of the following is one of the ways that the membranes of winter wheat are able to remain fluid when it is extremely cold? A) by increasing the percentage of unsaturated phospholipids in the membrane B) by increasing the percentage of cholesterol molecules in the membrane C) by decreasing the number of hydrophobic proteins in the membrane D) by cotransport of glucose and hydrogen E) by using active transport",
    back: "A",
  },
  {
    front:
      "In order for a protein to be an integral membrane protein it would have to be A) hydrophilic. B) hydrophobic. C) amphipathic, with at least one hydrophobic region. D) completely covered with phospholipids. E) exposed on only one surface of the membrane.",
    back: "C",
  },
  {
    front:
      "When a membrane is freeze-fractured, the bilayer splits down the middle between the two layers of phospholipids. In an electron micrograph of a freeze-fractured membrane, the bumps seen on the fractured surface of the membrane are A) peripheral proteins. B) phospholipids. C) carbohydrates. D) integral proteins. E) cholesterol molecules.",
    back: "D",
  },
  {
    front:
      "Which of the following is a reasonable explanation for why unsaturated fatty acids help keep any membrane more fluid at lower temperatures? A) The double bonds form kinks in the fatty acid tails, preventing adjacent lipids from packing tightly. B) Unsaturated fatty acids have a higher cholesterol content and therefore more cholesterol in membranes. C) Unsaturated fatty acids are more polar than saturated fatty acids. D) The double bonds block interaction among the hydrophilic head groups of the lipids. E) The double bonds result in shorter fatty acid tails and thinner membranes.",
    back: "A",
  },
  {
    front:
      "Which of the following is true of integral membrane proteins? A) They lack tertiary structure. B) They are loosely bound to the surface of the bilayer. C) They are usually transmembrane proteins. D) They are not mobile within the bilayer. E) They serve only a structural role in membranes.",
    back: "C",
  },
  {
    front:
      "The primary function of polysaccharides attached to the glycoproteins and glycolipids of animal cell membranes is A) to facilitate diffusion of molecules down their concentration gradients. B) to actively transport molecules against their concentration gradients. C) to maintain the integrity of a fluid mosaic membrane. D) to maintain membrane fluidity at low temperatures. E) to mediate cell-to-cell recognition.",
    back: "E",
  },
  {
    front:
      "An animal cell lacking oligosaccharides on the external surface of its plasma membrane would likely be impaired in which function? A) transporting ions against an electrochemical gradient B) cell-cell recognition C) maintaining fluidity of the phospholipid bilayer D) attaching to the cytoskeleton E) establishing the diffusion barrier to charged molecules",
    back: "B",
  },
  {
    front:
      "In the years since the proposal of the fluid mosaic model of the cell membrane, which of the following observations has been added to the model? A) The membrane is only fluid across a very narrow temperature range. B) Proteins rarely move, even though they possibly can do so. C) Unsaturated lipids are excluded from the membranes. D) The concentration of protein molecules is now known to be much higher. E) The proteins are known to be made of only acidic amino acids.",
    back: "D",
  },
  {
    front:
      "A protein that spans the phospholipid bilayer one or more times is A) a transmembrane protein. B) an integral protein. C) a peripheral protein. D) an integrin. E) a glycoprotein.",
    back: "A",
  },
  {
    front:
      "Which of these are not embedded in the hydrophobic portion of the lipid bilayer at all? A) transmembrane proteins B) integral proteins C) peripheral proteins D) integrins E) glycoproteins",
    back: "C",
  },
  {
    front:
      "The cell membranes of Antarctic ice fish might have which of the following adaptations? A) very long chain fatty acids B) branched isoprenoid lipids C) a high percentage of polyunsaturated fatty acids D) a higher percentage of trans-fatty acids E) no cholesterol",
    back: "C",
  },
  {
    front:
      "In a paramecium, cell surface integral membrane proteins are synthesized A) in the cytoplasm by free ribosomes. B) by ribosomes in the nucleus. C) by ribosomes bound to the rough endoplasmic reticulum. D) by ribosomes in the Golgi vesicles. E) by ribosomes bound to the inner surface of the plasma membrane.",
    back: "C",
  },
  {
    front:
      "The formulation of a model for a structure or for a process serves which of the following purposes? A) It asks a scientific question. B) It functions as a testable hypothesis. C) It records observations. D) It serves as a data point among results. E) It can only be arrived at after years of experimentation.",
    back: "B",
  },
  {
    front:
      'Cell membranes are asymmetrical. Which of the following is the most likely explanation? A) The cell membrane forms a border between one cell and another in tightly packed tissues such as epithelium. B) Cell membranes communicate signals from one organism to another. C) The two sides of a cell membrane face different environments and carry out different functions. D) The "innerness" and "outerness" of membrane surfaces are predetermined by genes. E) Proteins can only be associated with the cell membranes on the cytoplasmic side.',
    back: "C",
  },
  {
    front:
      "Which of the following is true of the evolution of cell membranes? A) Cell membranes have stopped evolving now that they are fluid mosaics. B) Cell membranes cannot evolve if the membrane proteins do not. C) The evolution of cell membranes is driven by the evolution of glycoproteins and glycolipids. D) All components of membranes evolve in response to natural selection. E) An individual organism selects its preferred type of cell membrane for particular functions.",
    back: "D",
  },
  {
    front:
      "Why are lipids and proteins free to move laterally in membranes? A) The interior of the membrane is filled with liquid water. B) Lipids and proteins repulse each other in the membrane. C) Hydrophilic portions of the lipids are in the interior of the membrane. D) There are only weak hydrophobic interactions in the interior of the membrane. E) Molecules such as cellulose can pull them in various directions.",
    back: "D",
  },
  {
    front:
      "What kinds of molecules pass through a cell membrane most easily? A) large and hydrophobic B) small and hydrophobic C) large polar D) ionic E) monosaccharides such as glucose",
    back: "B",
  },
  {
    front:
      "Which of the following is a characteristic feature of a carrier protein in a plasma membrane? A) It is a peripheral membrane protein. B) It exhibits a specificity for a particular type of molecule. C) It requires the expenditure of cellular energy to function. D) It works against diffusion. E) It has few, if any, hydrophobic amino acids.",
    back: "B",
  },
  {
    front:
      "Nitrous oxide gas molecules diffusing across a cell's plasma membrane is an example of A) diffusion across the lipid bilayer. B) facilitated diffusion. C) active transport. D) osmosis. E) cotransport.",
    back: "A",
  },
  {
    front:
      "Which of the following would likely move through the lipid bilayer of a plasma membrane most rapidly? A) CO\u2082 B) an amino acid C) glucose D) K\u207a E) starch",
    back: "A",
  },
  {
    front:
      "Which of the following statements is correct about diffusion? A) It is very rapid over long distances. B) It requires an expenditure of energy by the cell. C) It is a passive process in which molecules move from a region of higher concentration to a region of lower concentration. D) It is an active process in which molecules move from a region of lower concentration to one of higher concentration. E) It requires integral proteins in the cell membrane.",
    back: "C",
  },
  {
    front:
      "Water passes quickly through cell membranes because A) the bilayer is hydrophilic. B) it moves through hydrophobic channels. C) water movement is tied to ATP hydrolysis. D) it is a small, polar, charged molecule. E) it moves through aquaporins in the membrane.",
    back: "E",
  },
  {
    front:
      "Celery stalks that are immersed in fresh water for several hours become stiff and hard. Similar stalks left in a 0.15 M salt solution become limp and soft. From this we can deduce that the cells of the celery stalks are A) hypotonic to both fresh water and the salt solution. B) hypertonic to both fresh water and the salt solution. C) hypertonic to fresh water but hypotonic to the salt solution. D) hypotonic to fresh water but hypertonic to the salt solution. E) isotonic with fresh water but hypotonic to the salt solution.",
    back: "C",
  },
  {
    front:
      "Mammalian blood contains the equivalent of 0.15 M NaCl. Seawater contains the equivalent of 0.45 M NaCl. What will happen if red blood cells are transferred to seawater? A) Water will leave the cells, causing them to shrivel and collapse. B) NaCl will be exported from the red blood cells by facilitated diffusion. C) The blood cells will take up water, swell, and eventually burst. D) NaCl will passively diffuse into the red blood cells. E) The blood cells will expend ATP for active transport of NaCl into the cytoplasm.",
    back: "A",
  },
  {
    front:
      "Which of the following statements correctly describes the normal tonicity conditions for typical plant and animal cells? A) The animal cell is in a hypotonic solution, and the plant cell is in an isotonic solution. B) The animal cell is in an isotonic solution, and the plant cell is in a hypertonic solution. C) The animal cell is in a hypertonic solution, and the plant cell is in an isotonic solution. D) The animal cell is in an isotonic solution, and the plant cell is in a hypotonic solution. E) The animal cell is in a hypertonic solution, and the plant cell is in a hypotonic solution.",
    back: "D",
  },
  {
    front:
      "In which of the following would there be the greatest need for osmoregulation? A) an animal connective tissue cell bathed in isotonic body fluid B) cells of a tidepool animal such as an anemone C) a red blood cell surrounded by plasma D) a lymphocyte before it has been taken back into lymph fluid E) a plant being grown hydroponically (in a watery mixture of designated nutrients)",
    back: "B",
  },
  {
    front:
      "When a plant cell, such as one from a peony stem, is submerged in a very hypotonic solution, what is likely to occur? A) The cell will burst. B) The cell membrane will lyse. C) Plasmolysis will shrink the interior. D) The cell will become flaccid. E) The cell will become turgid.",
    back: "E",
  },
  {
    front:
      "Which of the following membrane activities require energy from ATP hydrolysis? A) facilitated diffusion of chloride ions across the membrane through a chloride channel B) movement of water into a cell C) Na\u207a ions moving out of a mammalian cell bathed in physiological saline D) movement of glucose molecules into a bacterial cell from a medium containing a higher concentration of glucose than inside the cell E) movement of carbon dioxide out of a paramecium",
    back: "C",
  },
  {
    front:
      "The phosphate transport system in bacteria imports phosphate into the cell even when the concentration of phosphate outside the cell is much lower than the cytoplasmic phosphate concentration. Phosphate import depends on a pH gradient across the membrane\u2013more acidic outside the cell than inside the cell. Phosphate transport is an example of A) passive diffusion. B) facilitated diffusion. C) active transport. D) osmosis. E) cotransport.",
    back: "E",
  },
  {
    front:
      "Glucose diffuses slowly through artificial phospholipid bilayers. The cells lining the small intestine, however, rapidly move large quantities of glucose from the glucose-rich food into their glucose-poor cytoplasm. Using this information, which transport mechanism is most probably functioning in the intestinal cells? A) simple diffusion B) phagocytosis C) active transport pumps D) exocytosis E) facilitated diffusion",
    back: "E",
  },
  {
    front:
      "What is the voltage across a membrane called? A) water potential B) chemical gradient C) membrane potential D) osmotic potential E) electrochemical gradient",
    back: "C",
  },
  {
    front:
      "In most cells, there are electrochemical gradients of many ions across the plasma membrane even though there are usually only one or two electrogenic pumps present in the membrane. The gradients of the other ions are most likely accounted for by A) cotransport proteins. B) ion channels. C) carrier proteins. D) passive diffusion across the plasma membrane. E) cellular metabolic reactions that create or destroy ions.",
    back: "A",
  },
  {
    front:
      "The sodium-potassium pump is called an electrogenic pump because it A) pumps equal quantities of Na\u207a and K\u207a across the membrane. B) pumps hydrogen ions out of the cell. C) contributes to the membrane potential. D) ionizes sodium and potassium atoms. E) is used to drive the transport of other molecules against a concentration gradient.",
    back: "C",
  },
  {
    front:
      "Which of the following is most likely true of a protein that cotransports glucose and sodium ions into the intestinal cells of an animal? A) The sodium ions are moving down their electrochemical gradient while glucose is moving up. B) Glucose entering the cell along its concentration gradient provides energy for uptake of sodium ions against the electrochemical gradient. C) Sodium ions can move down their electrochemical gradient through the cotransporter whether or not glucose is present outside the cell. D) The cotransporter can also transport potassium ions. E) A substance that blocks sodium ions from binding to the cotransport protein will also block the transport of glucose.",
    back: "E",
  },
  {
    front:
      "The movement of potassium into an animal cell requires A) low cellular concentrations of sodium. B) high cellular concentrations of potassium. C) an energy source such as ATP. D) a cotransport protein. E) a potassium channel protein.",
    back: "C",
  },
  {
    front:
      "Ions diffuse across membranes through specific ion channels A) down their chemical gradients. B) down their concentration gradients. C) down the electrical gradients. D) down their electrochemical gradients. E) down the osmotic potential gradients.",
    back: "D",
  },
  {
    front:
      "Which of the following would increase the electrochemical potential across a membrane? A) a chloride channel B) a sucrose-proton cotransporter C) a proton pump D) a potassium channel E) both a proton pump and a potassium channel",
    back: "C",
  },
  {
    front:
      "The sodium-potassium pump in animal cells requires cytoplasmic ATP to pump ions across the plasma membrane. When the proteins of the pump are first synthesized in the rough ER, what side of the ER membrane will the ATP binding site be on? A) It will be on the cytoplasmic side of the ER. B) It will be on the side facing the interior of the ER. C) It could be facing in either direction because proteins are properly reoriented in the Golgi apparatus. D) It doesn't matter, because the pump is not active in the ER.",
    back: "A",
  },
  {
    front:
      "Proton pumps are used in various ways by members of every domain of organisms: Bacteria, Archaea, and Eukarya. What does this most probably mean? A) Proton pumps must have evolved before any living organisms were present on Earth. B) Proton gradients across a membrane were used by cells that were the common ancestor of all three domains of life. C) The high concentration of protons in the ancient atmosphere must have necessitated a pump mechanism. D) Cells of each domain evolved proton pumps independently when oceans became more acidic. E) Proton pumps are necessary to all cell membranes.",
    back: "B",
  },
  {
    front:
      "Several epidemic microbial diseases of earlier centuries incurred high death rates because they resulted in severe dehydration due to vomiting and diarrhea. Today they are usually not fatal because we have developed which of the following? A) antiviral medications that are efficient and work well with all viruses B) antibiotics against the viruses in question C) intravenous feeding techniques D) medication to prevent blood loss E) hydrating drinks that include high concentrations of salts and glucose",
    back: "E",
  },
  {
    front:
      "An organism with a cell wall would most likely be unable to take in materials through A) diffusion. B) osmosis. C) active transport. D) phagocytosis. E) facilitated diffusion.",
    back: "D",
  },
  {
    front:
      "White blood cells engulf bacteria through what process? A) exocytosis B) phagocytosis C) pinocytosis D) osmosis E) receptor-mediated exocytosis",
    back: "B",
  },
  {
    front:
      "Familial hypercholesterolemia is characterized by which of the following? A) defective LDL receptors on the cell membranes B) poor attachment of the cholesterol to the extracellular matrix of cells C) a poorly formed lipid bilayer that cannot incorporate cholesterol into cell membranes D) inhibition of the cholesterol active transport system in red blood cells E) a general lack of glycolipids in the blood cell membranes",
    back: "A",
  },
  {
    front:
      "The difference between pinocytosis and receptor-mediated endocytosis is that A) pinocytosis brings only water molecules into the cell, but receptor-mediated endocytosis brings in other molecules as well. B) pinocytosis increases the surface area of the plasma membrane whereas receptor-mediated endocytosis decreases the plasma membrane surface area. C) pinocytosis is nonselective in the molecules it brings into the cell, whereas receptor-mediated endocytosis offers more selectivity. D) pinocytosis requires cellular energy, but receptor-mediated endocytosis does not. E) pinocytosis can concentrate substances from the extracellular fluid, but receptor-mediated endocytosis cannot.",
    back: "C",
  },
  {
    front:
      "In receptor-mediated endocytosis, receptor molecules initially project to the outside of the cell. Where do they end up after endocytosis? A) on the outside of vesicles B) on the inside surface of the cell membrane C) on the inside surface of the vesicle D) on the outer surface of the nucleus E) on the ER",
    back: "C",
  },
  {
    front:
      "A bacterium engulfed by a white blood cell through phagocytosis will be digested by enzymes contained in A) peroxisomes. B) lysosomes. C) Golgi vesicles. D) vacuoles. E) secretory vesicles.",
    back: "B",
  },
  {
    front:
      "card image Which component is the peripheral protein? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "card image Which component is cholesterol? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "card image Which component is the fiber of the extracellular matrix? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "card image Which component is a microfilament of the cytoskeleton? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "card image Which component is a glycolipid? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "card image The solutions in the two arms of this U-tube are separated by a membrane that is permeable to water and glucose but not to sucrose. Side A is half-filled with a solution of 2 M sucrose and 1 M glucose. Side B is half-filled with 1 M sucrose and 2 M glucose. Initially, the liquid levels on both sides are equal.   Initially, in terms of tonicity, the solution in side A with respect to that in side B is A) hypotonic. B) plasmolyzed. C) isotonic. D) saturated. E) hypertonic.",
    back: "C",
  },
  {
    front:
      "card image After the system reaches equilibrium, what changes are observed? A) The molarity of sucrose and glucose are equal on both sides. B) The molarity of glucose is higher in side A than in side B. C) The water level is higher in side A than in side B. D) The water level is unchanged. E) The water level is higher in side B than in side A.",
    back: "C",
  },
  {
    front:
      "card image The solutions in the arms of a U-tube are separated at the bottom of the tube by a selectively permeable membrane. The membrane is permeable to sodium chloride but not to glucose. Side A is filled with a solution of 0.4 M glucose and 0.5 M sodium chloride (NaCl), and side B is filled with a solution containing 0.8 M glucose and 0.4 M sodium chloride. Initially, the volume in both arms is the same.   At the beginning of the experiment, A) side A is hypertonic to side B. B) side A is hypotonic to side B. C) side A is isotonic to side B. D) side A is hypertonic to side B with respect to glucose. E) side A is hypotonic to side B with respect to sodium chloride.",
    back: "B",
  },
  {
    front:
      "card image If you examine side A after three days, you should find A) a decrease in the concentration of NaCl and glucose and an increase in the water level. B) a decrease in the concentration of NaCl, an increase in water level, and no change in the concentration of glucose. C) no net change in the system. D) a decrease in the concentration of NaCl and a decrease in the water level. E) no change in the concentration of NaCl and glucose and an increase in the water level.",
    back: "D",
  },
  {
    front:
      "card image Five dialysis bags, constructed from a semipermeable membrane that is impermeable to sucrose, were filled with various concentrations of sucrose and then placed in separate beakers containing an initial concentration of 0.6 M sucrose solution. At 10-minute intervals, the bags were massed (weighed) and the percent change in mass of each bag was graphed.   Which line in the graph represents the bag that contained a solution isotonic to the 0.6 M solution at the beginning of the experiment? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "card image Which line in the graph represents the bag with the highest initial concentration of sucrose? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "card image Which line or lines in the graph represent(s) bags that contain a solution that is hypertonic at 50 minutes? A) A and B B) B C) C D) D E) D and E",
    back: "B",
  },
  {
    front:
      "card image Human immunodeficiency virus (HIV) infects cells that have both CD4 and CCR5 cell surface molecules. The viral nucleic acid molecules are enclosed in a protein capsid, and the protein capsid is itself contained inside an envelope consisting of a lipid bilayer membrane and viral glycoproteins. One hypothesis for viral entry into cells is that binding of HIV membrane glycoproteins to CD4 and CCR5 initiates fusion of the HIV membrane with the plasma membrane, releasing the viral capsid into the cytoplasm. An alternative hypothesis is that HIV gains entry into the cell via receptor-mediated endocytosis, and membrane fusion occurs in the endocytotic vesicle. To test these alternative hypotheses for HIV entry, researchers labeled the lipids on the HIV membrane with a red fluorescent dye.   What would be observed by live-cell fluorescence microscopy if the red fluorescent lipid dye-labeled HIV membrane fuses with the target cell plasma membrane? A) A spot of red fluorescence will remain on the infected cell's plasma membrane, marking the site of membrane fusion and HIV entry. B) The red fluorescent dye-labeled lipids will diffuse in the infected cell's plasma membrane and become difficult to detect. C) A spot of red fluorescence will move into the infected cell's cytoplasm. D) A spot of red fluorescence will remain outside the cell after delivering the viral capsid. E) Fluorescence microscopy does not have enough resolution to visualize fluorescently labeled HIV virus particles.",
    back: "B",
  },
  {
    front:
      "card image What would be observed by live-cell fluorescence microscopy if HIV is endocytosed first, and then fuses with the endocytotic vesicle membrane? A) A spot of red fluorescence will remain on the infected cell's plasma membrane, marking the site of membrane fusion and HIV entry. B) The red fluorescent dye-labeled lipids will diffuse in the endocytotic vesicle membrane and become difficult to detect. C) A spot of red fluorescence will move into the infected cell's interior. D) A spot of red fluorescence will remain outside the cell after delivering the viral capsid. E) Fluorescence microscopy does not have enough resolution to visualize fluorescently labeled HIV virus particles.",
    back: "C",
  },
  {
    front:
      "card image Using live-cell fluorescence microscopy, researchers observed that a red fluorescent spot moved from the plasma membrane into the interior of target cells when red fluorescent dye-labeled HIV was added to the cells. What is the best conclusion from these observations? A) The hypothesis that HIV enters the cell via fusion with the target cell plasma membrane is proved. B) The hypothesis that HIV enters the cell via fusion with the target cell plasma membrane is not supported. C) The hypothesis that HIV enters the cell via endocytosis is proved. D) The hypothesis that HIV enters the cell via endocytosis is not supported. E) Neither hypothesis is supported by these results.",
    back: "B",
  },
  {
    front:
      "card image If HIV first enters the cell in an endocytotic vesicle, instead of directly fusing with the plasma membrane, then A) HIV infection should be hindered by microtubule polymerization inhibitors such as nocodazole. B) HIV infection should be more efficient at lower temperatures. C) intact cortical actin microfilaments should interfere with HIV infection. D) cells lacking integrins should be resistant to HIV infection. E) addition of ligands for other cell-surface receptors to stimulate their endocytosis should increase the efficiency of HIV infection.",
    back: "A",
  },
  {
    front:
      "card image In an HIV-infected cell producing HIV virus particles, the viral glycoprotein is expressed on the plasma membrane. How do the viral glycoproteins get to the plasma membrane? A) They are synthesized on ribosomes on the plasma membrane. B) They are synthesized by ribosomes in the rough ER, and arrive at the plasma membrane in the membrane of secretory vesicles. C) They are synthesized on free cytoplasmic ribosomes, and then inserted into the plasma membrane. D) They are synthesized by ribosomes in the rough ER, secreted from the cell, and inserted into the plasma membrane from the outside. E) They are synthesized by ribosomes on the HIV viral membrane, which fuses with the plasma membrane from inside the cell.",
    back: "B",
  },
  {
    front:
      "Cystic fibrosis is a genetic disease in humans in which the CFTR protein, which functions as a chloride ion channel, is missing or nonfunctional in cell membranes.   71) The CFTR protein belongs to what category of membrane proteins? A) gap junctions B) aquaporins C) electrogenic ion pumps D) cotransporters E) hydrophilic channels",
    back: "C",
  },
  {
    front:
      "If the sodium ion concentration outside the cell increases, and the CFTR channel is open, in what direction will chloride ions and water move across the cell membrane? A) Chloride ions will move out of the cell, and water will move into the cell. B) Both chloride ions and water will move out of the cell. C) Chloride ions will move into the cell, and water will move out of the cell. D) Both chloride ions and water will move into the cell. E) The movement of chloride ions and water molecules will not be affected by changes in sodium ion concentration outside the cell.",
    back: "B",
  },
  {
    front:
      "In the small airways of the lung, a thin layer of liquid is needed between the epithelial cells and the mucus layer in order for cilia to beat and move the mucus and trapped particles out of the lung. One hypothesis is that the volume of this airway surface liquid is regulated osmotically by transport of sodium and chloride ions across the epithelial cell membrane. How would the lack of a functional chloride channel in cystic fibrosis patients affect sodium ion transport and the volume of the airway surface liquid? A) Sodium ion transport will increase; higher osmotic potential will increase airway surface liquid volume. B) Sodium ion transport will increase; higher osmotic potential will decrease airway surface liquid volume. C) Sodium ion transport will decrease; lower osmotic potential will decrease airway surface liquid volume. D) Sodium ion transport will decrease; lower osmotic potential will increase the airway surface liquid volume. E) Sodium ion transport will be unaffected; lack of chloride transport still reduces osmotic potential and decreases the airway surface liquid volume.",
    back: "C",
  },
  {
    front:
      "A patient has had a serious accident and lost a lot of blood. In an attempt to replenish body fluids, distilled water\u2013equal to the volume of blood lost\u2013is transferred directly into one of his veins. What will be the most probable result of this transfusion? A) It will have no unfavorable effect as long as the water is free of viruses and bacteria. B) The patient's red blood cells will shrivel up because the blood fluid has become hypotonic compared to the cells. C) The patient's red blood cells will swell because the blood fluid has become hypotonic compared to the cells. D) The patient's red blood cells will shrivel up because the blood fluid has become hypertonic compared to the cells. E) The patient's red blood cells will burst because the blood fluid has become hypertonic compared to the cells.",
    back: "C",
  },
  {
    front:
      "You are working on a team that is designing a new drug. In order for this drug to work, it must enter the cytoplasm of specific target cells. Which of the following would be a factor that determines whether the molecule selectively enters the target cells? A) blood or tissue type of the patient B) hydrophobicity of the drug molecule C) lack of charge on the drug molecule D) similarity of the drug molecule to other molecules transported by the target cells E) lipid composition of the target cells' plasma membrane",
    back: "D",
  },
  {
    front:
      "In what way do the membranes of a eukaryotic cell vary? A) Phospholipids are found only in certain membranes. B) Certain proteins are unique to each membrane. C) Only certain membranes of the cell are selectively permeable. D) Only certain membranes are constructed from amphipathic molecules. E) Some membranes have hydrophobic surfaces exposed to the cytoplasm, while others have hydrophilic surfaces facing the cytoplasm.",
    back: "B",
  },
  {
    front:
      "According to the fluid mosaic model of membrane structure, proteins of the membrane are mostly A) spread in a continuous layer over the inner and outer surfaces of the membrane. B) confined to the hydrophobic interior of the membrane. C) embedded in a lipid bilayer. D) randomly oriented in the membrane, with no fixed inside-outside polarity. E) free to depart from the fluid membrane and dissolve in the surrounding solution.",
    back: "C",
  },
  {
    front:
      "Which of the following factors would tend to increase membrane fluidity? A) a greater proportion of unsaturated phospholipids B) a greater proportion of saturated phospholipids C) a lower temperature D) a relatively high protein content in the membrane E) a greater proportion of relatively large glycolipids compared with lipids having smaller molecular masses",
    back: "A",
  },
  {
    front:
      "Which of the following processes includes all others? A) osmosis B) diffusion of a solute across a membrane C) facilitated diffusion D) passive transport E) transport of an ion down its electrochemical gradient",
    back: "D",
  },
  {
    front:
      "card image Based on the figure above, which of these experimental treatments would increase the rate of sucrose transport into the cell? A) decreasing extracellular sucrose concentration B) decreasing extracellular pH C) decreasing cytoplasmic pH D) adding an inhibitor that blocks the regeneration of ATP E) adding a substance that makes the membrane more permeable to hydrogen ions",
    back: "B",
  },
  {
    front:
      "Which term most precisely describes the cellular process of breaking down large molecules into smaller ones? A) catalysis B) metabolism C) anabolism D) dehydration E) catabolism",
    back: "E",
  },
  {
    front:
      "Which of the following is (are) true for anabolic pathways? A) They do not depend on enzymes. B) They are usually highly spontaneous chemical reactions. C) They consume energy to build up polymers from monomers. D) They release energy as they degrade polymers to monomers. E) They consume energy to decrease the entropy of the organism and its environment.",
    back: "C",
  },
  {
    front:
      "Which of the following is a statement of the first law of thermodynamics? A) Energy cannot be created or destroyed. B) The entropy of the universe is decreasing. C) The entropy of the universe is constant. D) Kinetic energy is stored energy that results from the specific arrangement of matter. E) Energy cannot be transferred or transformed.",
    back: "A",
  },
  {
    front:
      "For living organisms, which of the following is an important consequence of the first law of thermodynamics? A) The energy content of an organism is constant. B) The organism ultimately must obtain all of the necessary energy for life from its environment. C) The entropy of an organism decreases with time as the organism grows in complexity. D) Organisms grow by converting energy into organic matter. E) Life does not obey the first law of thermodynamics.",
    back: "B",
  },
  {
    front:
      "Living organisms increase in complexity as they grow, resulting in a decrease in the entropy of an organism. How does this relate to the second law of thermodynamics? A) Living organisms do not obey the second law of thermodynamics, which states that entropy must increase with time. B) Life obeys the second law of thermodynamics because the decrease in entropy as the organism grows is exactly balanced by an increase in the entropy of the universe. C) Living organisms do not follow the laws of thermodynamics. D) As a consequence of growing, organisms cause a greater increase in entropy in their environment than the decrease in entropy associated with their growth. E) Living organisms are able to transform energy into entropy.",
    back: "D",
  },
  {
    front:
      "Whenever energy is transformed, there is always an increase in the A) free energy of the system. B) free energy of the universe. C) entropy of the system. D) entropy of the universe. E) enthalpy of the universe.",
    back: "D",
  },
  {
    front:
      "Which of the following statements is a logical consequence of the second law of thermodynamics? A) If the entropy of a system increases, there must be a corresponding decrease in the entropy of the universe. B) If there is an increase in the energy of a system, there must be a corresponding decrease in the energy of the rest of the universe. C) Every energy transfer requires activation energy from the environment. D) Every chemical reaction must increase the total entropy of the universe. E) Energy can be transferred or transformed, but it cannot be created or destroyed.",
    back: "D",
  },
  {
    front:
      "Which of the following statements is representative of the second law of thermodynamics? A) Conversion of energy from one form to another is always accompanied by some gain of free energy. B) Heat represents a form of energy that can be used by most organisms to do work. C) Without an input of energy, organisms would tend toward decreasing entropy. D) Cells require a constant input of energy to maintain their high level of organization. E) Every energy transformation by a cell decreases the entropy of the universe.",
    back: "D",
  },
  {
    front:
      "Which of the following types of reactions would decrease the entropy within a cell? A) anabolic reactions B) hydrolysis C) respiration D) digestion E) catabolic reactions",
    back: "A",
  },
  {
    front:
      "Biological evolution of life on Earth, from simple prokaryote-like cells to large, multicellar eukaryotic organisms, A) has occurred in accordance with the laws of thermodynamics. B) has caused an increase in the entropy of the planet. C) has been made possible by expending Earth's energy resources. D) has occurred in accordance with the laws of thermodynamics, by expending Earth's energy resources and causing an increase in the entropy of the planet. E) violates the laws of thermodynamics because Earth is a closed system.",
    back: "A",
  },
  {
    front:
      "Which of the following is an example of potential rather than kinetic energy? A) the muscle contractions of a person mowing grass B) water rushing over Niagara Falls C) light flashes emitted by a firefly D) a molecule of glucose E) the flight of an insect foraging for food",
    back: "D",
  },
  {
    front:
      "Which of the following is the smallest closed system? A) a cell B) an organism C) an ecosystem D) Earth E) the universe",
    back: "E",
  },
  {
    front:
      "Which of the following is true of metabolism in its entirety in all organisms? A) Metabolism depends on a constant supply of energy from food. B) Metabolism depends on an organism's adequate hydration. C) Metabolism uses all of an organism's resources. D) Metabolism consists of all the energy transformation reactions in an organism. E) Metabolism manages the increase of entropy in an organism.",
    back: "D",
  },
  {
    front:
      "The mathematical expression for the change in free energy of a system is \u0394G =\u0394H - T\u0394S. Which of the following is (are) correct? A) \u0394S is the change in enthalpy, a measure of randomness. B) \u0394H is the change in entropy, the energy available to do work. C) \u0394G is the change in free energy. D) T is the temperature in degrees Celsius.",
    back: "C",
  },
  {
    front:
      "A system at chemical equilibrium A) consumes energy at a steady rate. B) releases energy at a steady rate. C) consumes or releases energy, depending on whether it is exergonic or endergonic. D) has zero kinetic energy. E) can do no work.",
    back: "E",
  },
  {
    front:
      "Which of the following is true for all exergonic reactions? A) The products have more total energy than the reactants. B) The reaction proceeds with a net release of free energy. C) The reaction goes only in a forward direction: all reactants will be converted to products, but no products will be converted to reactants. D) A net input of energy from the surroundings is required for the reactions to proceed. E) The reactions are rapid.",
    back: "B",
  },
  {
    front:
      "Chemical equilibrium is relatively rare in living cells. Which of the following could be an example of a reaction at chemical equilibrium in a cell? A) a reaction in which the free energy at equilibrium is higher than the energy content at any point away from equilibrium B) a chemical reaction in which the entropy change in the reaction is just balanced by an opposite entropy change in the cell's surroundings C) an endergonic reaction in an active metabolic pathway where the energy for that reaction is supplied only by heat from the environment D) a chemical reaction in which both the reactants and products are not being produced or used in any active metabolic pathway E) no possibility of having chemical equilibrium in any living cell",
    back: "D",
  },
  {
    front:
      "Which of the following shows the correct changes in thermodynamic properties for a chemical reaction in which amino acids are linked to form a protein? A) +\u0394H, +\u0394S, +\u0394G B) +\u0394H, -\u0394S, -\u0394G C) +\u0394H, -\u0394S, +\u0394G D) -\u0394H, -\u0394S, +\u0394G E) -\u0394H, +\u0394S, +\u0394G",
    back: "C",
  },
  {
    front:
      "When glucose monomers are joined together by glycosidic linkages to form a cellulose polymer, the changes in free energy, total energy, and entropy are as follows: A) +\u0394G, +\u0394H, +\u0394S. B) +\u0394G, +\u0394H, -\u0394S. C) +\u0394G, -\u0394H, -\u0394S. D) -\u0394G, +\u0394H, +\u0394S. E) -\u0394G, -\u0394H, -\u0394S.",
    back: "B",
  },
  {
    front:
      "A chemical reaction that has a positive \u0394G is correctly described as A) endergonic. B) endothermic. C) enthalpic. D) spontaneous. E) exothermic.",
    back: "A",
  },
  {
    front:
      "Which of the following best describes enthalpy (H)? A) the total kinetic energy of a system B) the heat content of a chemical system C) the system's entropy D) the cell's energy equilibrium E) the condition of a cell that is not able to react",
    back: "B",
  },
  {
    front:
      "For the hydrolysis of ATP to ADP + Pi, the free energy change is -7.3 kcal/mol under standard conditions (1 M concentration of both reactants and products). In the cellular environment, however, the free energy change is about -13 kcal/mol. What can we conclude about the free energy change for the formation of ATP from ADP and Pi under cellular conditions? A) It is +7.3 kcal/mol. B) It is less than +7.3 kcal/mol. C) It is about +13 kcal/mol. D) It is greater than +13 kcal/mol. E) The information given is insufficient to deduce the free energy change.",
    back: "C",
  },
  {
    front:
      "Why is ATP an important molecule in metabolism? A) Its hydrolysis provides an input of free energy for exergonic reactions. B) It provides energy coupling between exergonic and endergonic reactions. C) Its terminal phosphate group contains a strong covalent bond that, when hydrolyzed, releases free energy. D) Its terminal phosphate bond has higher energy than the other two. E) It is one of the four building blocks for DNA synthesis.",
    back: "B",
  },
  {
    front:
      "When 10,000 molecules of ATP are hydrolyzed to ADP and Pi in a test tube, about twice as much heat is liberated as when a cell hydrolyzes the same amount of ATP. Which of the following is the best explanation for this observation? A) Cells are open systems, but a test tube is a closed system. B) Cells are less efficient at heat production than nonliving systems. C) The hydrolysis of ATP in a cell produces different chemical products than does the reaction in a test tube. D) The reaction in cells must be catalyzed by enzymes, but the reaction in a test tube does not need enzymes. E) Reactant and product concentrations in the test tube are different from those in the cell.",
    back: "E",
  },
  {
    front:
      "Which of the following is most similar in structure to ATP? A) a pentose sugar B) a DNA nucleotide C) an RNA nucleotide D) an amino acid with three phosphate groups attached E) a phospholipid",
    back: "C",
  },
  {
    front:
      "Which of the following statements is true concerning catabolic pathways? A) They combine molecules into more energy-rich molecules. B) They supply energy, primarily in the form of ATP, for the cell's work. C) They are endergonic. D) They are spontaneous and do not need enzyme catalysis. E) They build up complex molecules such as protein from simpler compounds.",
    back: "B",
  },
  {
    front:
      "When chemical, transport, or mechanical work is done by an organism, what happens to the heat generated? A) It is used to power yet more cellular work. B) It is used to store energy as more ATP. C) It is used to generate ADP from nucleotide precursors. D) It is lost to the environment. E) It is transported to specific organs such as the brain.",
    back: "D",
  },
  {
    front:
      "When ATP releases some energy, it also releases inorganic phosphate. What purpose does this serve (if any) in the cell? A) The phosphate is released as an excretory waste. B) The phosphate can only be used to regenerate more ATP. C) The phosphate can be added to water and excreted as a liquid. D) The phosphate may be incorporated into any molecule that contains phosphate. E) It enters the nucleus to affect gene expression.",
    back: "D",
  },
  {
    front:
      "A number of systems for pumping ions across membranes are powered by ATP. Such ATP-powered pumps are often called ATPases although they don't often hydrolyze ATP unless they are simultaneously transporting ions. Because small increases in calcium ions in the cytosol can trigger a number of different intracellular reactions, cells keep the cytosolic calcium concentration quite low under normal conditions, using ATP-powered calcium pumps. For example, muscle cells transport calcium from the cytosol into the membranous system called the sarcoplasmic reticulum (SR). If a resting muscle cell's cytosol has a free calcium ion concentration of 10\u207b\u2077 while the concentration in the SR is 10\u207b\u00b2, then how is the ATPase acting? A) ATPase activity must be powering an inflow of calcium from the outside of the cell into the SR. B) ATPase activity must be transferring Pi to the SR to enable this to occur. C) ATPase activity must be pumping calcium from the cytosol to the SR against the concentration gradient. D) ATPase activity must be opening a channel for the calcium ions to diffuse back into the SR along the concentration gradient. E) ATPase activity must be routing calcium ions from the SR to the cytosol, and then to the cell's environment.",
    back: "C",
  },
  {
    front:
      "What is the difference (if any) between the structure of ATP and the structure of the precursor of the A nucleotide in RNA? A) The sugar molecule is different. B) The nitrogen-containing base is different. C) The number of phosphates is three instead of one. D) The number of phosphates is three instead of two. E) There is no difference.",
    back: "E",
  },
  {
    front:
      "Which of the following statements is true about enzyme-catalyzed reactions? A) The reaction is faster than the same reaction in the absence of the enzyme. B) The free energy change of the reaction is opposite from the reaction that occurs in the absence of the enzyme. C) The reaction always goes in the direction toward chemical equilibrium. D) Enzyme-catalyzed reactions require energy to activate the enzyme. E) Enzyme-catalyzed reactions release more free energy than noncatalyzed reactions.",
    back: "A",
  },
  {
    front:
      "Reactants capable of interacting to form products in a chemical reaction must first overcome a thermodynamic barrier known as the reaction's A) entropy. B) activation energy. C) endothermic level. D) equilibrium point. E) free-energy content.",
    back: "B",
  },
  {
    front:
      "A solution of starch at room temperature does not readily decompose to form a solution of simple sugars because A) the starch solution has less free energy than the sugar solution. B) the hydrolysis of starch to sugar is endergonic. C) the activation energy barrier for this reaction cannot be surmounted. D) starch cannot be hydrolyzed in the presence of so much water. E) starch hydrolysis is nonspontaneous.",
    back: "C",
  },
  {
    front:
      "Which of the following statements regarding enzymes is true? A) Enzymes increase the rate of a reaction by making the reaction more exergonic. B) Enzymes increase the rate of a reaction by lowering the activation energy barrier. C) Enzymes increase the rate of a reaction by reducing the rate of reverse reactions. D) Enzymes change the equilibrium point of the reactions they catalyze. E) Enzymes make the rate of a reaction independent of substrate concentrations.",
    back: "B",
  },
  {
    front:
      "During a laboratory experiment, you discover that an enzyme-catalyzed reaction has a \u2206G of -20 kcal/mol. If you double the amount of enzyme in the reaction, what will be the \u2206G for the new reaction? A) -40 kcal/mol B) -20 kcal/mol C) 0 kcal/mol D) +20 kcal/mol E) +40 kcal/mol",
    back: "B",
  },
  {
    front:
      "The active site of an enzyme is the region that A) binds allosteric regulators of the enzyme. B) is involved in the catalytic reaction of the enzyme. C) binds noncompetitive inhibitors of the enzyme. D) is inhibited by the presence of a coenzyme or a cofactor.",
    back: "B",
  },
  {
    front:
      "According to the induced fit hypothesis of enzyme catalysis, which of the following is correct? A) The binding of the substrate depends on the shape of the active site. B) Some enzymes change their structure when activators bind to the enzyme. C) A competitive inhibitor can outcompete the substrate for the active site. D) The binding of the substrate changes the shape of the enzyme's active site. E) The active site creates a microenvironment ideal for the reaction.",
    back: "D",
  },
  {
    front:
      "Mutations that result in single amino acid substitutions in an enzyme A) can have no effect on the activity or properties of the enzyme. B) will almost always destroy the activity of the enzyme. C) will often cause a change in the substrate specificity of the enzyme. D) may affect the physicochemical properties of the enzyme such as its optimal temperature and pH. E) may, in rare cases, cause the enzyme to run reactions in reverse.",
    back: "D",
  },
  {
    front:
      "Increasing the substrate concentration in an enzymatic reaction could overcome which of the following? A) denaturization of the enzyme B) allosteric inhibition C) competitive inhibition D) saturation of the enzyme activity E) insufficient cofactors",
    back: "C",
  },
  {
    front:
      "Which of the following is true of enzymes? A) Nonprotein cofactors alter the substrate specificity of enzymes. B) Enzyme function is increased if the 3-D structure or conformation of an enzyme is altered. C) Enzyme function is independent of physical and chemical environmental factors such as pH and temperature. D) Enzymes increase the rate of chemical reaction by lowering activation energy barriers. E) Enzymes increase the rate of chemical reaction by providing activation energy to the substrate.",
    back: "D",
  },
  {
    front:
      "Zinc, an essential trace element for most organisms, is present in the active site of the enzyme carboxypeptidase. The zinc most likely functions as a(n) A) competitive inhibitor of the enzyme. B) noncompetitive inhibitor of the enzyme. C) allosteric activator of the enzyme. D) cofactor necessary for enzyme activity. E) coenzyme derived from a vitamin.",
    back: "D",
  },
  {
    front:
      "In order to attach a particular amino acid to the tRNA molecule that will transport it, an enzyme, an aminoacyl-tRNA synthetase, is required, along with ATP. Initially, the enzyme has an active site for ATP and another for the amino acid, but it is not able to attach the tRNA. What must occur in order for the final attachment to occur? A) The ATP must first have to attach to the tRNA. B) The binding of the first two molecules must cause a 3-D change that opens another active site on the enzyme. C) The ATP must be hydrolyzed to allow the amino acid to bind to the synthetase. D) The tRNA molecule must have to alter its shape in order to be able to fit into the active site with the other two molecules. E) The 3' end of the tRNA must have to be cleaved before it can have an attached amino acid.",
    back: "B",
  },
  {
    front:
      "Some of the drugs used to treat HIV patients are competitive inhibitors of the HIV reverse transcriptase enzyme. Unfortunately, the high mutation rate of HIV means that the virus rapidly acquires mutations with amino acid changes that make them resistant to these competitive inhibitors. Where in the reverse transcriptase enzyme would such amino acid changes most likely occur in drug-resistant viruses? A) in or near the active site B) at an allosteric site C) at a cofactor binding site D) in regions of the protein that determine packaging into the virus capsid E) such mutations could occur anywhere with equal probability",
    back: "A",
  },
  {
    front:
      "Protein kinases are enzymes that transfer the terminal phosphate from ATP to an amino acid residue on the target protein. Many are located on the plasma membrane as integral membrane proteins or peripheral membrane proteins. What purpose may be served by their plasma membrane localization? A) ATP is more abundant near the plasma membrane. B) They can more readily encounter and phosphorylate other membrane proteins. C) Membrane localization lowers the activation energy of the phosphorylation reaction. D) They flip back and forth across the membrane to access target proteins on either side. E) They require phospholipids as a cofactor.",
    back: "B",
  },
  {
    front:
      "When you have a severe fever, what grave consequence may occur if the fever is not controlled? A) destruction of your enzymes' primary structure B) removal of amine groups from your proteins C) change in the tertiary structure of your enzymes D) removal of the amino acids in active sites of your enzymes E) binding of your enzymes to inappropriate substrates",
    back: "C",
  },
  {
    front:
      "How does a noncompetitive inhibitor decrease the rate of an enzyme reaction? A) by binding at the active site of the enzyme B) by changing the shape of the enzyme's active site C) by changing the free energy change of the reaction D) by acting as a coenzyme for the reaction E) by decreasing the activation energy of the reaction",
    back: "B",
  },
  {
    front:
      "The mechanism in which the end product of a metabolic pathway inhibits an earlier step in the pathway is most precisely described as A) metabolic inhibition. B) feedback inhibition. C) allosteric inhibition. D) noncooperative inhibition. E) reversible inhibition.",
    back: "B",
  },
  {
    front:
      "Which of the following statements describes enzyme cooperativity? A) A multienzyme complex contains all the enzymes of a metabolic pathway. B) A product of a pathway serves as a competitive inhibitor of an early enzyme in the pathway. C) A substrate molecule bound to an active site of one subunit promotes substrate binding to the active site of other subunits. D) Several substrate molecules can be catalyzed by the same enzyme. E) A substrate binds to an active site and inhibits cooperation between enzymes in a pathway.",
    back: "C",
  },
  {
    front:
      "Allosteric enzyme regulation is usually associated with A) lack of cooperativity. B) feedback inhibition. C) activating activity. D) an enzyme with more than one subunit. E) the need for cofactors.",
    back: "D",
  },
  {
    front:
      "Which of the following is an example of cooperativity? A) the binding of an end product of a metabolic pathway to the first enzyme that acts in the pathway B) one enzyme in a metabolic pathway passing its product to act as a substrate for the next enzyme in the pathway C) a molecule binding at one unit of a tetramer, allowing faster binding at each of the other three D) the effect of increasing temperature on the rate of an enzymatic reaction E) binding of an ATP molecule along with one of the substrate molecules in an active site",
    back: "C",
  },
  {
    front:
      "Protein kinases are enzymes that catalyze phosphorylation of target proteins at specific sites, whereas protein phosphatases catalyze removal of phosphate(s) from phosphorylated proteins. Phosphorylation and dephosphorylation can function as an on-off switch for a protein's activity, most likely through A) the change in a protein's charge leading to a conformational change. B) the change in a protein's charge leading to cleavage. C) a change in the optimal pH at which a reaction will occur. D) a change in the optimal temperature at which a reaction will occur. E) the excision of one or more peptides.",
    back: "A",
  },
  {
    front:
      "Besides turning enzymes on or off, what other means does a cell use to control enzymatic activity? A) cessation of cellular protein synthesis B) localization of enzymes into specific organelles or membranes C) exporting enzymes out of the cell D) connecting enzymes into large aggregates E) hydrophobic interactions",
    back: "B",
  },
  {
    front:
      "An important group of peripheral membrane proteins are enzymes such as the phospholipases that cleave the head groups of phospholipids. What properties must these enzymes exhibit? A) resistance to degradation B) independence from cofactor interaction C) water solubility D) lipid solubility E) membrane-spanning domains",
    back: "C",
  },
  {
    front:
      "In experimental tests of enzyme evolution, where a gene encoding an enzyme is subjected to multiple cycles of random mutagenesis and selection for altered substrate specificity, the resulting enzyme had multiple amino acid changes associated with altered substrate specificity. Where in the enzyme were these amino acid changes located? A) only in the active site B) only in the active site or near the active site C) in or near the active site and at surface sites away from the active site D) only at surface sites away from the active site E) only in the hydrophobic interior of the folded protein",
    back: "C",
  },
  {
    front:
      "How might an amino acid change at a site distant from the active site of the enzyme alter the enzyme's substrate specificity? A) by changing the enzyme's stability B) by changing the enzyme's location in the cell C) by changing the shape of the protein D) by changing the enzyme's pH optimum E) an amino acid change away from the active site cannot alter the enzyme's substrate specificity",
    back: "C",
  },
  {
    front:
      "card image For the enzyme-catalyzed reaction shown in the figure, which of these treatments will cause the greatest increase in the rate of the reaction, if the initial reactant concentration is 1.0 micromolar? A) doubling the activation energy needed B) cooling the reaction by 10\u00b0C C) doubling the concentration of the reactants to 2.0 micromolar D) doubling the enzyme concentration E) increasing the concentration of reactants to 10.0 micromolar, while reducing the concentration of enzyme by 1/2",
    back: "D",
  },
  {
    front:
      "card image In the figure, why does the reaction rate plateau at higher reactant concentrations? A) Feedback inhibition by product occurs at high reactant concentrations. B) Most enzyme molecules are occupied by substrate at high reactant concentrations. C) The reaction nears equilibrium at high reactant concentrations. D) The activation energy for the reaction increases with reactant concentration. E) The rate of the reverse reaction increases with reactant concentration.",
    back: "B",
  },
  {
    front:
      "card image Which curve(s) on the graphs may represent the temperature and pH profiles of an enzyme taken from a bacterium that lives in a mildly alkaline hot springs at temperatures of 70\u00b0C or higher? A) curves 1 and 5 B) curves 2 and 4 C) curves 2 and 5 D) curves 3 and 4 E) curves 3 and 5",
    back: "E",
  },
  {
    front:
      "card image Which temperature and pH profile curves on the graphs were most likely generated from analysis of an enzyme from a human stomach where conditions are strongly acid? A) curves 1 and 4 B) curves 1 and 5 C) curves 2 and 4 D) curves 2 and 5 E) curves 3 and 4",
    back: "A",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Which of the following terms best describes the forward reaction in Figure 8.1? A) endergonic, \u2206G > 0 B) exergonic, \u2206G < 0 C) endergonic, \u2206G < 0 D) exergonic, \u2206G > 0 E) chemical equilibrium, \u2206G = 0",
    back: "B",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Which of the following represents the \u0394G of the reaction in Figure 8.1? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Which of the following in Figure 8.1 would be the same in either an enzyme-catalyzed or a noncatalyzed reaction? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Which of the following represents the activation energy needed for the enzyme-catalyzed reverse reaction, C + D \u2192 A + B, in Figure 8.1? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Which of the following represents the difference between the free-energy content of the reaction and the free-energy content of the products in Figure 8.1? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Which of the following represents the activation energy required for the enzyme-catalyzed reaction in Figure 8.1? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Which of the following represents the activation energy required for a noncatalyzed reaction in Figure 8.1? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Which of the following represents the activation energy needed for the noncatalyzed reverse reaction, C + D \u2192 A + B, in Figure 8.1? A) A B) B C) C D) D E) E",
    back: "E",
  },
  {
    front:
      "card image This question is based on the reaction A + B \u2194 C + D shown in the figure.   Assume that the reaction in Figure 8.1 has a \u0394G of -5.6 kcal/mol. Which of the following would be true? A) The reaction could be coupled to power an endergonic reaction with a \u0394G of +6.2 kcal/mol. B) The reaction could be coupled to power an exergonic reaction with a \u0394G of +8.8 kcal/mol. C) The reaction would result in a decrease in entropy (S) and an increase in the total energy content (H) of the system. D) The reaction would result in an increase in entropy (S) and a decrease in the total energy content (H) of the system. E) The reaction would result in products (C + D) with a greater free-energy content than in the initial reactants (A + B).",
    back: "D",
  },
  {
    front:
      "card image Which of the following is the most correct interpretation of the figure? A) Inorganic phosphate is created from organic phosphate. B) Energy from catabolism can be used directly for performing cellular work. C) ADP + Pi are a set of molecules that store energy for catabolism. D) ATP is a molecule that acts as an intermediary to store energy for cellular work. E) Pi acts as a shuttle molecule to move energy from ATP to ADP.",
    back: "D",
  },
  {
    front:
      "card image How do cells use the ATP cycle shown in the figure? A) Cells use the cycle to recycle ADP and phosphate. B) Cells use the cycle to recycle energy released by ATP hydrolysis. C) Cells use the cycle to recycle ADP, phosphate, and the energy released by ATP hydrolysis. D) Cells use the cycle to generate or consume water molecules as needed. E) Cells use the cycle primarily to generate heat.",
    back: "A",
  },
  {
    front:
      "Succinate dehydrogenase catalyzes the conversion of succinate to fumarate. The reaction is inhibited by malonic acid, which resembles succinate but cannot be acted upon by succinate dehydrogenase. Increasing the ratio of succinate to malonic acid reduces the inhibitory effect of malonic acid.   Based on this information, which of the following is correct? A) Succinate dehydrogenase is the enzyme, and fumarate is the substrate. B) Succinate dehydrogenase is the enzyme, and malonic acid is the substrate. C) Succinate is the substrate, and fumarate is the product. D) Fumarate is the product, and malonic acid is a noncompetitive inhibitor. E) Malonic acid is the product, and fumarate is a competitive inhibitor.",
    back: "C",
  },
  {
    front:
      "Succinate dehydrogenase catalyzes the conversion of succinate to fumarate. The reaction is inhibited by malonic acid, which resembles succinate but cannot be acted upon by succinate dehydrogenase. Increasing the ratio of succinate to malonic acid reduces the inhibitory effect of malonic acid.   What is malonic acid's role with respect to succinate dehydrogenase? A) It is a competitive inhibitor. B) It blocks the binding of fumarate. C) It is a noncompetitive inhibitor. D) It is able to bind to succinate. E) It is an allosteric regulator.",
    back: "A",
  },
  {
    front:
      "A series of enzymes catalyze the reaction X \u2192 Y \u2192 Z \u2192 A. Product A binds to the enzyme that converts X to Y at a position remote from its active site. This binding decreases the activity of the enzyme.   What is substance X? A) a coenzyme B) an allosteric inhibitor C) a substrate D) an intermediate E) the product",
    back: "C",
  },
  {
    front:
      "A series of enzymes catalyze the reaction X \u2192 Y \u2192 Z \u2192 A. Product A binds to the enzyme that converts X to Y at a position remote from its active site. This binding decreases the activity of the enzyme.   With respect to the enzyme that converts X to Y, substance A functions as A) a coenzyme. B) an allosteric inhibitor. C) the substrate. D) an intermediate. E) a competitive inhibitor.",
    back: "B",
  },
  {
    front:
      "Choose the pair of terms that correctly completes this sentence: Catabolism is to anabolism as ________ is to ________. A) exergonic; spontaneous B) exergonic; endergonic C) free energy; entropy D) work; energy E) entropy; enthalpy",
    back: "B",
  },
  {
    front:
      "Most cells cannot harness heat to perform work because A) heat is not a form of energy. B) cells do not have much heat; they are relatively cool. C) temperature is usually uniform throughout a cell. D) heat can never be used to do work. E) heat must remain constant during work.",
    back: "C",
  },
  {
    front:
      "Which of the following metabolic processes can occur without a net influx of energy from some other process? A) ADP + Pi \u2192 ATP + H\u2082O B) C\u2086H\u2081\u2082O\u2086 + 6 O\u2082 \u2192 6 CO\u2082 + 6 H\u2082O C) 6 CO\u2082 + 6 H\u2082O \u2192 C\u2086H\u2081\u2082O\u2086 + 6 O\u2082 D) amino acids \u2192 protein E) glucose + fructose \u2192 sucrose",
    back: "B",
  },
  {
    front:
      "If an enzyme in solution is saturated with substrate, the most effective way to obtain a faster yield of products is to A) add more of the enzyme. B) heat the solution to 90\u00b0C. C) add more substrate. D) add an allosteric inhibitor. E) add a noncompetitive inhibitor.",
    back: "A",
  },
  {
    front:
      "Some bacteria are metabolically active in hot springs because A) they are able to maintain a lower internal temperature. B) high temperatures make catalysis unnecessary. C) their enzymes have high optimal temperatures. D) their enzymes are completely insensitive to temperature. E) they use molecules other than proteins or RNAs as their main catalysts.",
    back: "C",
  },
  {
    front:
      "If an enzyme is added to a solution where its substrate and product are in equilibrium, what will occur? A) Additional product will be formed. B) Additional substrate will be formed. C) The reaction will change from endergonic to exergonic. D) The free energy of the system will change. E) Nothing; the reaction will stay at equilibrium.",
    back: "E",
  },
  {
    front:
      "What is the term for metabolic pathways that release stored energy by breaking down complex molecules? A) anabolic pathways B) catabolic pathways C) fermentation pathways D) thermodynamic pathways E) bioenergetic pathways",
    back: "B",
  },
  {
    front:
      "The molecule that functions as the reducing agent (electron donor) in a redox or oxidation-reduction reaction A) gains electrons and gains potential energy. B) loses electrons and loses potential energy. C) gains electrons and loses potential energy. D) loses electrons and gains potential energy. E) neither gains nor loses electrons, but gains or loses potential energy.",
    back: "B",
  },
  {
    front:
      "When electrons move closer to a more electronegative atom, what happens? A) The more electronegative atom is reduced, and energy is released. B) The more electronegative atom is reduced, and energy is consumed. C) The more electronegative atom is oxidized, and energy is consumed. D) The more electronegative atom is oxidized, and energy is released. E) The more electronegative atom is reduced, and entropy decreases.",
    back: "A",
  },
  {
    front:
      "Why does the oxidation of organic compounds by molecular oxygen to produce CO\u2082 and water release free energy? A) The covalent bonds in organic molecules and molecular oxygen have more kinetic energy than the covalent bonds in water and carbon dioxide. B) Electrons are being moved from atoms that have a lower affinity for electrons (such as C) to atoms with a higher affinity for electrons (such as O). C) The oxidation of organic compounds can be used to make ATP. D) The electrons have a higher potential energy when associated with water and CO\u2082 than they do in organic compounds. E) The covalent bond in O\u2082 is unstable and easily broken by electrons from organic molecules.",
    back: "B",
  },
  {
    front:
      "Which of the following statements describes the results of this reaction? C\u2086H\u2081\u2082O\u2086 + 6 O\u2082 \u2192 6 CO\u2082 + 6 H\u2082O + Energy A) C\u2086H\u2081\u2082O\u2086 is oxidized and O\u2082 is reduced. B) O\u2082 is oxidized and H\u2082O is reduced. C) CO\u2082 is reduced and O\u2082 is oxidized. D) C\u2086H\u2081\u2082O\u2086 is reduced and CO\u2082 is oxidized. E) O\u2082 is reduced and CO\u2082 is oxidized.",
    back: "A",
  },
  {
    front:
      "When a glucose molecule loses a hydrogen atom as the result of an oxidation-reduction reaction, the molecule becomes A) hydrolyzed. B) hydrogenated. C) oxidized. D) reduced. E) an oxidizing agent.",
    back: "C",
  },
  {
    front:
      "When a molecule of NAD\u207a (nicotinamide adenine dinucleotide) gains a hydrogen atom (not a proton), the molecule becomes A) dehydrogenated. B) oxidized. C) reduced. D) redoxed. E) hydrolyzed.",
    back: "C",
  },
  {
    front:
      "Which of the following statements describes NAD\u207a? A) NAD\u207a is reduced to NADH during glycolysis, pyruvate oxidation, and the citric acid cycle. B) NAD\u207a has more chemical energy than NADH. C) NAD\u207a is oxidized by the action of hydrogenases. D) NAD\u207a can donate electrons for use in oxidative phosphorylation. E) In the absence of NAD\u207a, glycolysis can still function.",
    back: "A",
  },
  {
    front:
      "Where does glycolysis take place in eukaryotic cells? A) mitochondrial matrix B) mitochondrial outer membrane C) mitochondrial inner membrane D) mitochondrial intermembrane space E) cytosol",
    back: "E",
  },
  {
    front:
      "The ATP made during glycolysis is generated by A) substrate-level phosphorylation. B) electron transport. C) photophosphorylation. D) chemiosmosis. E) oxidation of NADH to NAD\u207a.",
    back: "A",
  },
  {
    front:
      "The oxygen consumed during cellular respiration is involved directly in which process or event? A) glycolysis B) accepting electrons at the end of the electron transport chain C) the citric acid cycle D) the oxidation of pyruvate to acetyl CoA E) the phosphorylation of ADP to form ATP",
    back: "B",
  },
  {
    front:
      "Which process in eukaryotic cells will proceed normally whether oxygen (O\u2082) is present or absent? A) electron transport B) glycolysis C) the citric acid cycle D) oxidative phosphorylation E) chemiosmosis",
    back: "B",
  },
  {
    front:
      "An electron loses potential energy when it A) shifts to a less electronegative atom. B) shifts to a more electronegative atom. C) increases its kinetic energy. D) increases its activity as an oxidizing agent. E) moves further away from the nucleus of the atom.",
    back: "B",
  },
  {
    front:
      "Why are carbohydrates and fats considered high energy foods? A) They have a lot of oxygen atoms. B) They have no nitrogen in their makeup. C) They can have very long carbon skeletons. D) They have a lot of electrons associated with hydrogen. E) They are easily reduced.",
    back: "D",
  },
  {
    front:
      "Substrate-level phosphorylation accounts for approximately what percentage of the ATP formed by the reactions of glycolysis? A) 0% B) 2% C) 10% D) 38% E) 100%",
    back: "E",
  },
  {
    front:
      "During glycolysis, when each molecule of glucose is catabolized to two molecules of pyruvate, most of the potential energy contained in glucose is A) transferred to ADP, forming ATP. B) transferred directly to ATP. C) retained in the two pyruvates. D) stored in the NADH produced. E) used to phosphorylate fructose to form fructose 6-phosphate.",
    back: "C",
  },
  {
    front:
      "In addition to ATP, what are the end products of glycolysis? A) CO\u2082 and H\u2082O B) CO\u2082 and pyruvate C) NADH and pyruvate D) CO\u2082 and NADH E) H\u2082O, FADH\u2082, and citrate",
    back: "C",
  },
  {
    front:
      "The free energy for the oxidation of glucose to CO\u2082 and water is -686 kcal/mol and the free energy for the reduction of NAD\u207a to NADH is +53 kcal/mol. Why are only two molecules of NADH formed during glycolysis when it appears that as many as a dozen could be formed? A) Most of the free energy available from the oxidation of glucose is used in the production of ATP in glycolysis. B) Glycolysis is a very inefficient reaction, with much of the energy of glucose released as heat. C) Most of the free energy available from the oxidation of glucose remains in pyruvate, one of the products of glycolysis. D) There is no CO\u2082 or water produced as products of glycolysis. E) Glycolysis consists of many enzymatic reactions, each of which extracts some energy from the glucose molecule.",
    back: "C",
  },
  {
    front:
      "Starting with one molecule of glucose, the energy-containing products of glycolysis are A) 2 NAD\u207a, 2 pyruvate, and 2 ATP. B) 2 NADH, 2 pyruvate, and 2 ATP. C) 2 FADH\u2082, 2 pyruvate, and 4 ATP. D) 6 CO\u2082, 2 ATP, and 2 pyruvate. E) 6 CO\u2082, 30 ATP, and 2 pyruvate.",
    back: "B",
  },
  {
    front:
      "In glycolysis, for each molecule of glucose oxidized to pyruvate A) two molecules of ATP are used and two molecules of ATP are produced. B) two molecules of ATP are used and four molecules of ATP are produced. C) four molecules of ATP are used and two molecules of ATP are produced. D) two molecules of ATP are used and six molecules of ATP are produced. E) six molecules of ATP are used and six molecules of ATP are produced.",
    back: "B",
  },
  {
    front:
      "A molecule that is phosphorylated A) has been reduced as a result of a redox reaction involving the loss of an inorganic phosphate. B) has a decreased chemical reactivity; it is less likely to provide energy for cellular work. C) has been oxidized as a result of a redox reaction involving the gain of an inorganic phosphate. D) has an increased chemical potential energy; it is primed to do cellular work. E) has less energy than before its phosphorylation and therefore less energy for cellular work.",
    back: "D",
  },
  {
    front:
      "Which kind of metabolic poison would most directly interfere with glycolysis? A) an agent that reacts with oxygen and depletes its concentration in the cell B) an agent that binds to pyruvate and inactivates it C) an agent that closely mimics the structure of glucose but is not metabolized D) an agent that reacts with NADH and oxidizes it to NAD\u207a E) an agent that blocks the passage of electrons along the electron transport chain",
    back: "C",
  },
  {
    front:
      "Why is glycolysis described as having an investment phase and a payoff phase? A) It both splits molecules and assembles molecules. B) It attaches and detaches phosphate groups. C) It uses glucose and generates pyruvate. D) It shifts molecules from cytosol to mitochondrion. E) It uses stored ATP and then forms a net increase in ATP.",
    back: "E",
  },
  {
    front:
      "The transport of pyruvate into mitochondria depends on the proton-motive force across the inner mitochondrial membrane. How does pyruvate enter the mitochondrion? A) active transport B) diffusion C) facilitated diffusion D) through a channel E) through a pore",
    back: "A",
  },
  {
    front:
      "Which of the following intermediary metabolites enters the citric acid cycle and is formed, in part, by the removal of a carbon (CO\u2082) from one molecule of pyruvate? A) lactate B) glyceraldehydes-3-phosphate C) oxaloacetate D) acetyl CoA E) citrate",
    back: "D",
  },
  {
    front:
      "During cellular respiration, acetyl CoA accumulates in which location? A) cytosol B) mitochondrial outer membrane C) mitochondrial inner membrane D) mitochondrial intermembrane space E) mitochondrial matrix",
    back: "E",
  },
  {
    front:
      "How many carbon atoms are fed into the citric acid cycle as a result of the oxidation of one molecule of pyruvate? A) two B) four C) six D) eight E) ten",
    back: "A",
  },
  {
    front:
      "Carbon dioxide (CO\u2082) is released during which of the following stages of cellular respiration? A) glycolysis and the oxidation of pyruvate to acetyl CoA B) oxidation of pyruvate to acetyl CoA and the citric acid cycle C) the citric acid cycle and oxidative phosphorylation D) oxidative phosphorylation and fermentation E) fermentation and glycolysis",
    back: "B",
  },
  {
    front:
      "A young animal has never had much energy. He is brought to a veterinarian for help and is sent to the animal hospital for some tests. There they discover his mitochondria can use only fatty acids and amino acids for respiration, and his cells produce more lactate than normal. Of the following, which is the best explanation of his condition? A) His mitochondria lack the transport protein that moves pyruvate across the outer mitochondrial membrane. B) His cells cannot move NADH from glycolysis into the mitochondria. C) His cells contain something that inhibits oxygen use in his mitochondria. D) His cells lack the enzyme in glycolysis that forms pyruvate. E) His cells have a defective electron transport chain, so glucose goes to lactate instead of to acetyl CoA.",
    back: "A",
  },
  {
    front:
      "During aerobic respiration, electrons travel downhill in which sequence? A) food \u2192 citric acid cycle \u2192 ATP \u2192 NAD\u207a B) food \u2192 NADH \u2192 electron transport chain \u2192 oxygen C) glucose \u2192 pyruvate \u2192 ATP \u2192 oxygen D) glucose \u2192 ATP \u2192 electron transport chain \u2192 NADH E) food \u2192 glycolysis \u2192 citric acid cycle \u2192 NADH \u2192 ATP",
    back: "B",
  },
  {
    front:
      "What fraction of the carbon dioxide exhaled by animals is generated by the reactions of the citric acid cycle, if glucose is the sole energy source? A) 1/6 B) 1/3 C) 1/2 D) 2/3 E) 100/100",
    back: "D",
  },
  {
    front:
      "Where are the proteins of the electron transport chain located? A) cytosol B) mitochondrial outer membrane C) mitochondrial inner membrane D) mitochondrial intermembrane space E) mitochondrial matrix",
    back: "C",
  },
  {
    front:
      "In cellular respiration, the energy for most ATP synthesis is supplied by A) high energy phosphate bonds in organic molecules. B) a proton gradient across a membrane. C) converting oxygen to ATP. D) transferring electrons from organic molecules to pyruvate. E) generating carbon dioxide and oxygen in the electron transport chain.",
    back: "B",
  },
  {
    front:
      "During aerobic respiration, which of the following directly donates electrons to the electron transport chain at the lowest energy level? A) NAD+ B) NADH C) ATP D) ADP + Pi E) FADH2",
    back: "E",
  },
  {
    front:
      "The primary role of oxygen in cellular respiration is to A) yield energy in the form of ATP as it is passed down the respiratory chain. B) act as an acceptor for electrons and hydrogen, forming water. C) combine with carbon, forming CO\u2082. D) combine with lactate, forming pyruvate. E) catalyze the reactions of glycolysis.",
    back: "B",
  },
  {
    front:
      "Inside an active mitochondrion, most electrons follow which pathway? A) glycolysis \u2192 NADH \u2192 oxidative phosphorylation \u2192 ATP \u2192 oxygen B) citric acid cycle \u2192 FADH\u2082 \u2192 electron transport chain \u2192 ATP C) electron transport chain \u2192 citric acid cycle \u2192 ATP \u2192 oxygen D) pyruvate \u2192 citric acid cycle \u2192 ATP \u2192 NADH \u2192 oxygen E) citric acid cycle \u2192 NADH \u2192 electron transport chain \u2192 oxygen",
    back: "E",
  },
  {
    front:
      "During aerobic respiration, H\u2082O is formed. Where does the oxygen atom for the formation of the water come from? A) carbon dioxide (CO\u2082) B) glucose (C\u2086H\u2081\u2082O\u2086) C) molecular oxygen (O\u2082) D) pyruvate (C\u2083H\u2083O\u2083-) E) lactate (C\u2083H\u2085O\u2083-)",
    back: "C",
  },
  {
    front:
      "In chemiosmotic phosphorylation, what is the most direct source of energy that is used to convert ADP + Pi to ATP? A) energy released as electrons flow through the electron transport system B) energy released from substrate-level phosphorylation C) energy released from movement of protons through ATP synthase, against the electrochemical gradient D) energy released from movement of protons through ATP synthase, down the electrochemical gradient E) No external source of energy is required because the reaction is exergonic.",
    back: "D",
  },
  {
    front:
      "Energy released by the electron transport chain is used to pump H\u207a into which location in eukaryotic cells? A) cytosol B) mitochondrial outer membrane C) mitochondrial inner membrane D) mitochondrial intermembrane space E) mitochondrial matrix",
    back: "D",
  },
  {
    front:
      "The direct energy source that drives ATP synthesis during respiratory oxidative phosphorylation in eukaryotic cells is A) oxidation of glucose to CO\u2082 and water. B) the thermodynamically favorable flow of electrons from NADH to the mitochondrial electron transport carriers. C) the final transfer of electrons to oxygen. D) the proton-motive force across the inner mitochondrial membrane. E) the thermodynamically favorable transfer of phosphate from glycolysis and the citric acid cycle intermediate molecules of ADP.",
    back: "D",
  },
  {
    front:
      "When hydrogen ions are pumped from the mitochondrial matrix across the inner membrane and into the intermembrane space, the result is the A) formation of ATP. B) reduction of NAD\u207a. C) restoration of the Na\u207a/K\u207a balance across the membrane. D) creation of a proton-motive force. E) lowering of pH in the mitochondrial matrix.",
    back: "D",
  },
  {
    front:
      "Where is ATP synthase located in the mitochondrion? A) cytosol B) electron transport chain C) outer membrane D) inner membrane E) mitochondrial matrix",
    back: "D",
  },
  {
    front:
      "It is possible to prepare vesicles from portions of the inner mitochondrial membrane. Which one of the following processes could still be carried on by this isolated inner membrane? A) the citric acid cycle B) oxidative phosphorylation C) glycolysis and fermentation D) reduction of NAD\u207a E) both the citric acid cycle and oxidative phosphorylation",
    back: "B",
  },
  {
    front:
      "How many oxygen molecules (O\u2082) are required each time a molecule of glucose (C\u2086H\u2081\u2082O\u2086) is completely oxidized to carbon dioxide and water via aerobic respiration,? A) 1 B) 3 C) 6 D) 12 E) 30",
    back: "C",
  },
  {
    front:
      "Which of the following produces the most ATP when glucose (C\u2086H\u2081\u2082O\u2086) is completely oxidized to carbon dioxide (CO\u2082) and water? A) glycolysis B) fermentation C) oxidation of pyruvate to acetyl CoA D) citric acid cycle E) oxidative phosphorylation (chemiosmosis)",
    back: "E",
  },
  {
    front:
      "Approximately how many molecules of ATP are produced from the complete oxidation of two molecules of glucose (C\u2086H\u2081\u2082O\u2086) in aerobic cellular respiration? A) 2 B) 4 C) 15 D) 30-32 E) 60-64",
    back: "E",
  },
  {
    front:
      "The synthesis of ATP by oxidative phosphorylation, using the energy released by movement of protons across the membrane down their electrochemical gradient, is an example of A) active transport. B) an endergonic reaction coupled to an exergonic reaction. C) a reaction with a positive \u0394G . D) osmosis. E) allosteric regulation.",
    back: "B",
  },
  {
    front:
      "Chemiosmotic ATP synthesis (oxidative phosphorylation) occurs in A) all cells, but only in the presence of oxygen. B) only eukaryotic cells, in the presence of oxygen. C) only in mitochondria, using either oxygen or other electron acceptors. D) all respiring cells, both prokaryotic and eukaryotic, using either oxygen or other electron acceptors. E) all cells, in the absence of respiration.",
    back: "D",
  },
  {
    front:
      "If a cell is able to synthesize 30 ATP molecules for each molecule of glucose completely oxidized by carbon dioxide and water, how many ATP molecules can the cell synthesize for each molecule of pyruvate oxidized to carbon dioxide and water? A) 0 B) 1 C) 12 D) 14 E) 15",
    back: "C",
  },
  {
    front:
      "What is proton-motive force? A) the force required to remove an electron from hydrogen B) the force exerted on a proton by a transmembrane proton concentration gradient C) the force that moves hydrogen into the intermembrane space D) the force that moves hydrogen into the mitochondrion E) the force that moves hydrogen to NAD\u207a",
    back: "B",
  },
  {
    front:
      "In liver cells, the inner mitochondrial membranes are about five times the area of the outer mitochondrial membranes. What purpose must this serve? A) It allows for an increased rate of glycolysis. B) It allows for an increased rate of the citric acid cycle. C) It increases the surface for oxidative phosphorylation. D) It increases the surface for substrate-level phosphorylation. E) It allows the liver cell to have fewer mitochondria.",
    back: "C",
  },
  {
    front:
      "Brown fat cells produce a protein called thermogenin in their mitochondrial inner membrane. Thermogenin is a channel for facilitated transport of protons across the membrane. What will occur in the brown fat cells when they produce thermogenin? A) ATP synthesis and heat generation will both increase. B) ATP synthesis will increase, and heat generation will decrease. C) ATP synthesis will decrease, and heat generation will increase. D) ATP synthesis and heat generation will both decrease. E) ATP synthesis and heat generation will stay the same.",
    back: "C",
  },
  {
    front:
      "In a mitochondrion, if the matrix ATP concentration is high, and the intermembrane space proton concentration is too low to generate sufficient proton-motive force, then A) ATP synthase will increase the rate of ATP synthesis. B) ATP synthase will stop working. C) ATP synthase will hydrolyze ATP and pump protons into the intermembrane space. D) ATP synthase will hydrolyze ATP and pump protons into the matrix.",
    back: "C",
  },
  {
    front:
      "Which catabolic processes may have been used by cells on ancient Earth before free oxygen became available? A) glycolysis and fermentation only B) glycolysis and the citric acid cycle only C) glycolysis, pyruvate oxidation, and the citric acid cycle D) oxidative phosphorylation only E) glycolysis, pyruvate oxidation, the citric acid cycle, and oxidative phosphorylation, using an electron acceptor other than oxygen",
    back: "E",
  },
  {
    front:
      "Which of the following normally occurs regardless of whether or not oxygen (O\u2082) is present? A) glycolysis B) fermentation C) oxidation of pyruvate to acetyl CoA D) citric acid cycle E) oxidative phosphorylation (chemiosmosis)",
    back: "A",
  },
  {
    front:
      "Which of the following occurs in the cytosol of a eukaryotic cell? A) glycolysis and fermentation B) fermentation and chemiosmosis C) oxidation of pyruvate to acetyl CoA D) citric acid cycle E) oxidative phosphorylation",
    back: "A",
  },
  {
    front:
      "Which metabolic pathway is common to both cellular respiration and fermentation? A) the oxidation of pyruvate to acetyl CoA B) the citric acid cycle C) oxidative phosphorylation D) glycolysis E) chemiosmosis",
    back: "D",
  },
  {
    front:
      "The ATP made during fermentation is generated by which of the following? A) the electron transport chain B) substrate-level phosphorylation C) chemiosmosis D) oxidative phosphorylation E) aerobic respiration",
    back: "B",
  },
  {
    front:
      "In the absence of oxygen, yeast cells can obtain energy by fermentation, resulting in the production of A) ATP, CO\u2082, and ethanol (ethyl alcohol). B) ATP, CO\u2082, and lactate. C) ATP, NADH, and pyruvate. D) ATP, pyruvate, and oxygen. E) ATP, pyruvate, and acetyl CoA.",
    back: "A",
  },
  {
    front:
      "In alcohol fermentation, NAD\u207a is regenerated from NADH by A) reduction of acetaldehyde to ethanol (ethyl alcohol). B) oxidation of pyruvate to acetyl CoA. C) reduction of pyruvate to form lactate. D) oxidation of ethanol to acetyl CoA. E) reduction of ethanol to pyruvate.",
    back: "A",
  },
  {
    front:
      "One function of both alcohol fermentation and lactic acid fermentation is to A) reduce NAD\u207a to NADH. B) reduce FAD\u207a to FADH\u2082. C) oxidize NADH to NAD\u207a. D) reduce FADH\u2082 to FAD\u207a. E) do none of the above.",
    back: "C",
  },
  {
    front:
      "An organism is discovered that thrives both in the presence and absence of oxygen in the air. Curiously, the consumption of sugar increases as oxygen is removed from the organism's environment, even though the organism does not gain much weight. This organism A) must use a molecule other than oxygen to accept electrons from the electron transport chain. B) is a normal eukaryotic organism. C) is photosynthetic. D) is an anaerobic organism. E) is a facultative anaerobe.",
    back: "E",
  },
  {
    front:
      "Which statement best supports the hypothesis that glycolysis is an ancient metabolic pathway that originated before the last universal common ancestor of life on Earth? A) Glycolysis is widespread and is found in the domains Bacteria, Archaea, and Eukarya. B) Glycolysis neither uses nor needs O\u2082. C) Glycolysis is found in all eukaryotic cells. D) The enzymes of glycolysis are found in the cytosol rather than in a membrane-enclosed organelle. E) Ancient prokaryotic cells, the most primitive of cells, made extensive use of glycolysis long before oxygen was present in Earth's atmosphere.",
    back: "A",
  },
  {
    front:
      "Why is glycolysis considered to be one of the first metabolic pathways to have evolved? A) It produces much less ATP than does oxidative phosphorylation. B) It does not involve organelles or specialized structures, does not require oxygen, and is present in most organisms. C) It is found in prokaryotic cells but not in eukaryotic cells. D) It relies on chemiosmosis, which is a metabolic mechanism present only in the first cells' prokaryotic cells. E) It requires the presence of membrane-enclosed cell organelles found only in eukaryotic cells.",
    back: "B",
  },
  {
    front:
      "When an individual is exercising heavily and when the muscle becomes oxygen-deprived, muscle cells convert pyruvate to lactate. What happens to the lactate in skeletal muscle cells? A) It is converted to NAD\u207a. B) It produces CO\u2082 and water. C) It is taken to the liver and converted back to pyruvate. D) It reduces FADH\u2082 to FAD\u207a. E) It is converted to alcohol.",
    back: "C",
  },
  {
    front:
      "When skeletal muscle cells are oxygen-deprived, the heart still pumps. What must the heart muscle cells be able to do? A) derive sufficient energy from fermentation B) continue aerobic metabolism when skeletal muscle cannot C) transform lactate to pyruvate again D) remove lactate from the blood E) remove oxygen from lactate",
    back: "B",
  },
  {
    front:
      "When skeletal muscle cells undergo anaerobic respiration, they become fatigued and painful. This is now known to be caused by A) buildup of pyruvate. B) buildup of lactate. C) increase in sodium ions. D) increase in potassium ions. E) increase in ethanol.",
    back: "B",
  },
  {
    front:
      "A mutation in yeast makes it unable to convert pyruvate to ethanol. How will this mutation affect these yeast cells? A) The mutant yeast will be unable to grow anaerobically. B) The mutant yeast will grow anaerobically only when given glucose. C) The mutant yeast will be unable to metabolize glucose. D) The mutant yeast will die because they cannot regenerate NAD\u207a from NAD. E) The mutant yeast will metabolize only fatty acids.",
    back: "A",
  },
  {
    front:
      "You have a friend who lost 7 kg (about 15 pounds) of fat on a regimen of strict diet and exercise. How did the fat leave her body? A) It was released as CO\u2082 and H\u2082O. B) It was converted to heat and then released. C) It was converted to ATP, which weighs much less than fat. D) It was broken down to amino acids and eliminated from the body. E) It was converted to urine and eliminated from the body.",
    back: "A",
  },
  {
    front:
      "Phosphofructokinase is an important control enzyme in the regulation of cellular respiration. Which of the following statements correctly describes phosphofructokinase activity? A) It is inhibited by AMP. B) It is activated by ATP. C) It is activated by citrate, an intermediate of the citric acid cycle. D) It catalyzes the conversion of fructose 1,6-bisphosphate to fructose 6-phosphate, an early step of glycolysis. E) It is an allosteric enzyme.",
    back: "E",
  },
  {
    front:
      "Phosphofructokinase is an allosteric enzyme that catalyzes the conversion of fructose 6-phosphate to fructose 1,6-bisphosphate, an early step of glycolysis. In the presence of oxygen, an increase in the amount of ATP in a cell would be expected to A) inhibit the enzyme and thus slow the rates of glycolysis and the citric acid cycle. B) activate the enzyme and thus slow the rates of glycolysis and the citric acid cycle. C) inhibit the enzyme and thus increase the rates of glycolysis and the citric acid cycle. D) activate the enzyme and increase the rates of glycolysis and the citric acid cycle. E) inhibit the enzyme and thus increase the rate of glycolysis and the concentration of citrate.",
    back: "A",
  },
  {
    front:
      "Even though plants carry on photosynthesis, plant cells still use their mitochondria for oxidation of pyruvate. When and where will this occur? A) in photosynthetic cells in the light, while photosynthesis occurs concurrently B) in nonphotosynthesizing cells only C) in cells that are storing glucose only D) in all cells all the time E) in photosynthesizing cells in the light and in other tissues in the dark",
    back: "D",
  },
  {
    front:
      "In vertebrate animals, brown fat tissue's color is due to abundant blood vessels and capillaries. White fat tissue, on the other hand, is specialized for fat storage and contains relatively few blood vessels or capillaries. Brown fat cells have a specialized protein that dissipates the proton-motive force across the mitochondrial membranes. Which of the following might be the function of the brown fat tissue? A) to increase the rate of oxidative phosphorylation from its few mitochondria B) to allow the animals to regulate their metabolic rate when it is especially hot C) to increase the production of ATP D) to allow other membranes of the cell to perform mitochondrial functions E) to regulate temperature by converting most of the energy from NADH oxidation to heat",
    back: "E",
  },
  {
    front:
      "What is the purpose of beta oxidation in respiration? A) oxidation of glucose B) oxidation of pyruvate C) feedback regulation D) control of ATP accumulation E) breakdown of fatty acids",
    back: "E",
  },
  {
    front:
      "Where do the catabolic products of fatty acid breakdown enter into the citric acid cycle? A) pyruvate B) malate or fumarate C) acetyl CoA D) \u03b1-ketoglutarate E) succinyl CoA",
    back: "C",
  },
  {
    front:
      "What carbon sources can yeast cells metabolize to make ATP from ADP under anaerobic conditions? A) glucose B) ethanol C) pyruvate D) lactic acid E) either ethanol or lactic acid",
    back: "A",
  },
  {
    front:
      "High levels of citric acid inhibit the enzyme phosphofructokinase, a key enzyme in glycolysis. Citric acid binds to the enzyme at a different location from the active site. This is an example of A) competitive inhibition. B) allosteric regulation. C) the specificity of enzymes for their substrates. D) an enzyme requiring a cofactor. E) positive feedback regulation.",
    back: "B",
  },
  {
    front:
      "During intense exercise, as skeletal muscle cells go into anaerobiosis, the human body will increase its catabolism of A) fats only. B) carbohydrates only. C) proteins only. D) fats, carbohydrates, and proteins. E) fats and proteins only.",
    back: "B",
  },
  {
    front:
      "Yeast cells that have defective mitochondria incapable of respiration will be able to grow by catabolizing which of the following carbon sources for energy? A) glucose B) proteins C) fatty acids D) glucose, proteins, and fatty acids E) Such yeast cells will not be capable of catabolizing any food molecules, and will therefore die.",
    back: "A",
  },
  {
    front:
      "Which step in Figure 9.1 shows a split of one molecule into two smaller molecules? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "card image In which step in Figure 9.1 is an inorganic phosphate added to the reactant? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "card image Which step in Figure 9.1 is a redox reaction? A) A B) B C) C D) D E) E",
    back: "C",
  },
  {
    front:
      "card image Which portion of the pathway in Figure 9.1 involves an endergonic reaction? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "card image Which portion of the pathway in Figure 9.1 contains a phosphorylation reaction in which ATP is the phosphate source? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "card image Starting with one molecule of isocitrate and ending with fumarate, how many ATP molecules can be made through substrate-level phosphorylation (see Figure 9.2)? A) 1 B) 2 C) 11 D) 12 E) 24",
    back: "A",
  },
  {
    front:
      "card image Carbon skeletons for amino acid biosynthesis are supplied by intermediates of the citric acid cycle. Which intermediate would supply the carbon skeleton for synthesis of a five-carbon amino acid (see Figure 9.2)? A) succinate B) malate C) citrate D) \u03b1-ketoglutarate E) isocitrate",
    back: "D",
  },
  {
    front:
      "card image For each mole of glucose (C\u2086H\u2081\u2082O\u2086) oxidized by cellular respiration, how many moles of CO\u2082 are released in the citric acid cycle (see Figure 9.2)? A) 2 B) 4 C) 6 D) 12 E) 3",
    back: "B",
  },
  {
    front:
      "card image If pyruvate oxidation is blocked, what will happen to the levels of oxaloacetate and citric acid in the citric acid cycle shown in Figure 9.2? A) There will be no change in the levels of oxaloacetate and citric acid. B) Oxaloacetate will decrease and citric acid will accumulate. C) Oxaloacetate will accumulate and citric acid will decrease. D) Both oxaloacetate and citric acid will decrease. E) Both oxaloacetate and citric acid will accumulate.",
    back: "C",
  },
  {
    front:
      "card image Starting with citrate, which of the following combinations of products would result from three acetyl CoA molecules entering the citric acid cycle (see Figure 9.2)? A) 1 ATP, 2 CO\u2082, 3 NADH, and 1 FADH\u2082 B) 2 ATP, 2 CO\u2082, 3 NADH, and 3 FADH\u2082 C) 3 ATP, 3 CO\u2082, 3 NADH, and 3 FADH\u2082 D) 3 ATP, 6 CO\u2082, 9 NADH, and 3 FADH\u2082 E) 38 ATP, 6 CO\u2082, 3 NADH, and 12 FADH\u2082",
    back: "D",
  },
  {
    front:
      "card image For each molecule of glucose that is metabolized by glycolysis and the citric acid cycle (see Figure 9.2), what is the total number of NADH + FADH\u2082 molecules produced? A) 4 B) 5 C) 6 D) 10 E) 12",
    back: "E",
  },
  {
    front:
      "card image Figure 9.3 shows the electron transport chain. Which of the following is the combination of substances that is initially added to the chain? A) oxygen, carbon dioxide, and water B) NAD\u207a, FAD, and electrons C) NADH, FADH\u2082, and protons D) NADH, FADH\u2082, and O\u2082 E) oxygen and protons",
    back: "D",
  },
  {
    front:
      "card image Which of the following most accurately describes what is happening along the electron transport chain in Figure 9.3? A) Chemiosmosis is coupled with electron transfer. B) Each electron carrier alternates between being reduced and being oxidized. C) ATP is generated at each step. D) Energy of the electrons increases at each step. E) Molecules in the chain give up some of their potential energy.",
    back: "B",
  },
  {
    front:
      "card image Which of the protein complexes labeled with Roman numerals in Figure 9.3 will transfer electrons to O\u2082? A) complex I B) complex II C) complex III D) complex IV E) All of the complexes can transfer electrons to O\u2082.",
    back: "D",
  },
  {
    front:
      "card image What happens at the end of the chain in Figure 9.3? A) 2 electrons combine with a proton and a molecule of NAD\u207a. B) 2 electrons combine with a molecule of oxygen and two hydrogen atoms. C) 4 electrons combine with a molecule of oxygen and 4 protons. D) 4 electrons combine with four hydrogen and two oxygen atoms. E) 1 electron combines with a molecule of oxygen and a hydrogen atom.",
    back: "C",
  },
  {
    front:
      "card image In the presence of oxygen, the three-carbon compound pyruvate can be catabolized in the citric acid cycle. First, however, the pyruvate (1) loses a carbon, which is given off as a molecule of CO\u2082, (2) is oxidized to form a two-carbon compound called acetate, and (3) is bonded to coenzyme A.   These three steps result in the formation of A) acetyl CoA, O\u2082, and ATP. B) acetyl CoA, FADH\u2082, and CO\u2082. C) acetyl CoA, FAD, H\u2082, and CO\u2082. D) acetyl CoA, NADH, H\u207a, and CO\u2082. E) acetyl CoA, NAD\u207a, ATP, and CO\u2082.",
    back: "D",
  },
  {
    front:
      "In the presence of oxygen, the three-carbon compound pyruvate can be catabolized in the citric acid cycle. First, however, the pyruvate (1) loses a carbon, which is given off as a molecule of CO\u2082, (2) is oxidized to form a two-carbon compound called acetate, and (3) is bonded to coenzyme A.   Why is coenzyme A, a sulfur-containing molecule derived from a B vitamin, added? A) because sulfur is needed for the molecule to enter the mitochondrion B) in order to utilize this portion of a B vitamin which would otherwise be a waste product from another pathway C) to provide a relatively unstable molecule whose acetyl portion can be readily transferred to a compound in the citric acid cycle D) because it drives the reaction that regenerates NAD\u207a E) in order to remove one molecule of CO\u2082",
    back: "C",
  },
  {
    front:
      'Exposing inner mitochondrial membranes to ultrasonic vibrations will disrupt the membranes. However, the fragments will reseal "inside out." These little vesicles that result can still transfer electrons from NADH to oxygen and synthesize ATP. If the membranes are agitated further, however, the ability to synthesize ATP is lost.   After the first disruption, when electron transfer and ATP synthesis still occur, what must be present? A) all of the electron transport proteins as well as ATP synthase B) all of the electron transport system and the ability to add CoA to acetyl groups C) the ATP synthase system D) the electron transport system E) plasma membranes like those bacteria use for respiration',
    back: "A",
  },
  {
    front:
      'Exposing inner mitochondrial membranes to ultrasonic vibrations will disrupt the membranes. However, the fragments will reseal "inside out." These little vesicles that result can still transfer electrons from NADH to oxygen and synthesize ATP. If the membranes are agitated further, however, the ability to synthesize ATP is lost.   After the further agitation of the membrane vesicles, what must be lost from the membrane? A) the ability of NADH to transfer electrons to the first acceptor in the electron transport chain B) the prosthetic groups like heme from the transport system C) cytochromes D) ATP synthase, in whole or in part E) the contact required between inner and outer membrane surfaces',
    back: "D",
  },
  {
    front:
      'Exposing inner mitochondrial membranes to ultrasonic vibrations will disrupt the membranes. However, the fragments will reseal "inside out." These little vesicles that result can still transfer electrons from NADH to oxygen and synthesize ATP. If the membranes are agitated further, however, the ability to synthesize ATP is lost.   These inside-out membrane vesicles A) will become acidic inside the vesicles when NADH is added. B) will become alkaline inside the vesicles when NADH is added. C) will make ATP from ADP and i if transferred to a pH 4 buffered solution after incubation in a pH 7 buffered solution. D) will hydrolyze ATP to pump protons out of the interior of the vesicle to the exterior. E) will reverse electron flow to generate NADH from NAD\u207a in the absence of oxygen.',
    back: "A",
  },
  {
    front:
      "The immediate energy source that drives ATP synthesis by ATP synthase during oxidative phosphorylation is the A) oxidation of glucose and other organic compounds. B) flow of electrons down the electron transport chain. C) affinity of oxygen for electrons. D) H\u207a concentration across the membrane holding ATP synthase. E) transfer of phosphate to ADP.",
    back: "D",
  },
  {
    front:
      "Which metabolic pathway is common to both fermentation and cellular respiration of a glucose molecule? A) the citric acid cycle B) the electron transport chain C) glycolysis D) synthesis of acetyl CoA from pyruvate E) reduction of pyruvate to lactate",
    back: "C",
  },
  {
    front:
      "In mitochondria, exergonic redox reactions A) are the source of energy driving prokaryotic ATP synthesis. B) are directly coupled to substrate-level phosphorylation. C) provide the energy that establishes the proton gradient. D) reduce carbon atoms to carbon dioxide. E) are coupled via phosphorylated intermediates to endergonic processes.",
    back: "C",
  },
  {
    front:
      "The final electron acceptor of the electron transport chain that functions in aerobic oxidative phosphorylation is A) oxygen. B) water. C) NAD\u207a. D) pyruvate. E) ADP.",
    back: "A",
  },
  {
    front:
      "What is the oxidizing agent in the following reaction? Pyruvate + NADH + H\u207a \u2192 Lactate + NAD\u207a A) oxygen B) NADH C) NAD\u207a D) lactate E) pyruvate",
    back: "E",
  },
  {
    front:
      "When electrons flow along the electron transport chains of mitochondria, which of the following changes occurs? A) The pH of the matrix increases. B) ATP synthase pumps protons by active transport. C) The electrons gain free energy. D) The cytochromes phosphorylate ADP to form ATP. E) NAD\u207a is oxidized.",
    back: "A",
  },
  {
    front:
      "Most CO\u2082 from catabolism is released during A) glycolysis. B) the citric acid cycle. C) lactate fermentation. D) electron transport. E) oxidative phosphorylation.",
    back: "B",
  },
  {
    front:
      "If photosynthesizing green algae are provided with CO\u2082 synthesized with heavy oxygen (\u00b9\u2078O), later analysis will show that all but one of the following compounds produced by the algae contain the \u00b9\u2078O label. That one is A) 3-phosphoglycerate. B) glyceraldehyde 3-phosphate (G3P). C) glucose. D) ribulose bisphosphate (RuBP). E) O\u2082.",
    back: "E",
  },
  {
    front:
      "Which of the following are products of the light reactions of photosynthesis that are utilized in the Calvin cycle? A) CO\u2082 and glucose B) H\u2082O and O\u2082 C) ADP, Pi, and NADP\u207a D) electrons and H\u207a E) ATP and NADPH",
    back: "E",
  },
  {
    front:
      "Photosynthesis is not responsible for A) oxygen in the atmosphere. B) the ozone layer. C) most of the organic carbon on Earth's surface. D) atmospheric CO\u2082. E) fossil fuels.",
    back: "E",
  },
  {
    front:
      "Where does the Calvin cycle take place? A) stroma of the chloroplast B) thylakoid membrane C) cytoplasm surrounding the chloroplast D) interior of the thylakoid (thylakoid space) E) outer membrane of the chloroplast",
    back: "A",
  },
  {
    front:
      "In any ecosystem, terrestrial or aquatic, what group(s) is (are) always necessary? A) autotrophs and heterotrophs B) producers and primary consumers C) photosynthesizers D) autotrophs E) green plants",
    back: "D",
  },
  {
    front:
      "In autotrophic bacteria, where are the enzymes located that can carry on carbon fixation (reduction of carbon dioxide to carbohydrate)? A) in chloroplast membranes B) in chloroplast stroma C) in the cytosol D) in the nucleoid E) in the infolded plasma membrane",
    back: "C",
  },
  {
    front:
      "When oxygen is released as a result of photosynthesis, it is a direct by-product of A) reducing NADP\u207a. B) splitting water molecules. C) chemiosmosis. D) the electron transfer system of photosystem I. E) the electron transfer system of photosystem II.",
    back: "B",
  },
  {
    front:
      "A plant has a unique photosynthetic pigment. The leaves of this plant appear to be reddish yellow. What wavelengths of visible light are being absorbed by this pigment? A) red and yellow B) blue and violet C) green and yellow D) blue, green, and red E) green, blue, and yellow",
    back: "B",
  },
  {
    front:
      "Halobacterium has a photosynthetic membrane that is colored purple. Its photosynthetic action spectrum is exactly complementary (opposite to) the action spectrum for green plants. What wavelengths of light do the Halobacterium photosynthetic pigments absorb? A) red and yellow B) blue, green, and red C) green and yellow D) red and green E) blue and red",
    back: "E",
  },
  {
    front:
      "In the thylakoid membranes, what is the main role of the antenna pigment molecules? A) split water and release oxygen to the reaction-center chlorophyll B) harvest photons and transfer light energy to the reaction-center chlorophyll C) synthesize ATP from ADP and Pi D) transfer electrons to ferredoxin and then NADPH E) concentrate photons within the stroma",
    back: "B",
  },
  {
    front:
      "Which of the events listed below occurs in the light reactions of photosynthesis? A) NADP is produced. B) NADPH is reduced to NADP\u207a. C) Carbon dioxide is incorporated into PGA. D) ATP is phosphorylated to yield ADP. E) Light is absorbed and funneled to reaction-center chlorophyll a.",
    back: "E",
  },
  {
    front:
      "Which statement describes the functioning of photosystem II? A) Light energy excites electrons in the thylakoid membrane electron transport chain. B) Photons are passed along to a reaction-center chlorophyll. C) The P680 chlorophyll donates a pair of protons to NADP\u207a, which is thus converted to NADPH. D) The electron vacancies in P680\u207a are filled by electrons derived from water. E) The splitting of water yields molecular carbon dioxide as a by-product.",
    back: "D",
  },
  {
    front:
      "Which of the following are directly associated with photosystem I? A) harvesting of light energy by ATP B) receiving electrons from the thylakoid membrane electron transport chain C) generation of molecular oxygen D) extraction of hydrogen electrons from the splitting of water E) passing electrons to the thylakoid membrane electron transport chain",
    back: "B",
  },
  {
    front:
      "Some photosynthetic organisms contain chloroplasts that lack photosystem II, yet are able to survive. The best way to detect the lack of photosystem II in these organisms would be A) to determine if they have thylakoids in the chloroplasts. B) to test for liberation of O\u2082 in the light. C) to test for CO\u2082 fixation in the dark. D) to do experiments to generate an action spectrum. E) to test for production of either sucrose or starch.",
    back: "B",
  },
  {
    front:
      "What are the products of linear photophosphorylation? A) heat and fluorescence B) ATP and P700 C) ATP and NADPH D) ADP and NADP E) P700 and P680",
    back: "C",
  },
  {
    front:
      "As a research scientist, you measure the amount of ATP and NADPH consumed by the Calvin cycle in 1 hour. You find 30,000 molecules of ATP consumed, but only 20,000 molecules of NADPH. Where did the extra ATP molecules come from? A) photosystem II B) photosystem I C) cyclic electron flow D) linear electron flow E) chlorophyll",
    back: "C",
  },
  {
    front:
      "Assume a thylakoid is somehow punctured so that the interior of the thylakoid is no longer separated from the stroma. This damage will have the most direct effect on which of the following processes? A) the splitting of water B) the absorption of light energy by chlorophyll C) the flow of electrons from photosystem II to photosystem I D) the synthesis of ATP E) the reduction of NADP\u207a",
    back: "D",
  },
  {
    front:
      "What does the chemiosmotic process in chloroplasts involve? A) establishment of a proton gradient across the thylakoid membrane B) diffusion of electrons through the thylakoid membrane C) reduction of water to produce ATP energy D) movement of water by osmosis into the thylakoid space from the stroma E) formation of glucose, using carbon dioxide, NADPH, and ATP",
    back: "A",
  },
  {
    front:
      "Suppose the interior of the thylakoids of isolated chloroplasts were made acidic and then transferred in the dark to a pH 8 solution. What would be likely to happen? A) The isolated chloroplasts will make ATP. B) The Calvin cycle will be activated. C) Cyclic photophosphorylation will occur. D) The isolated chloroplasts will generate oxygen gas. E) The isolated chloroplasts will reduce NADP\u207a to NADPH.",
    back: "A",
  },
  {
    front:
      "In a plant cell, where are the ATP synthase complexes located? A) thylakoid membrane only B) plasma membrane only C) inner mitochondrial membrane only D) thylakoid membrane and inner mitochondrial membrane E) thylakoid membrane and plasma membrane",
    back: "D",
  },
  {
    front:
      "In mitochondria, chemiosmosis translocates protons from the matrix into the intermembrane space, whereas in chloroplasts, chemiosmosis translocates protons from A) the stroma to the photosystem II. B) the matrix to the stroma. C) the stroma to the thylakoid space. D) the intermembrane space to the matrix. E) the thylakoid space to the stroma.",
    back: "C",
  },
  {
    front:
      "Which of the following statements best describes the relationship between photosynthesis and respiration? A) Respiration runs the biochemical pathways of photosynthesis in reverse. B) Photosynthesis stores energy in complex organic molecules, whereas respiration releases it. C) Photosynthesis occurs only in plants and respiration occurs only in animals. D) ATP molecules are produced in photosynthesis and used up in respiration. E) Respiration is anabolic and photosynthesis is catabolic.",
    back: "B",
  },
  {
    front:
      "Where are the molecules of the electron transport chain found in plant cells? A) thylakoid membranes of chloroplasts B) stroma of chloroplasts C) outer membrane of mitochondria D) matrix of mitochondria E) cytoplasm",
    back: "A",
  },
  {
    front:
      "In photosynthetic cells, synthesis of ATP by the chemiosmotic mechanism occurs during A) photosynthesis only. B) respiration only. C) both photosynthesis and respiration. D) neither photosynthesis nor respiration. E) photorespiration only.",
    back: "C",
  },
  {
    front:
      "Reduction of oxygen to form water occurs during A) photosynthesis only. B) respiration only. C) both photosynthesis and respiration. D) neither photosynthesis nor respiration. E) photorespiration only.",
    back: "B",
  },
  {
    front:
      "Reduction of NADP\u207a occurs during A) photosynthesis. B) respiration. C) both photosynthesis and respiration. D) neither photosynthesis nor respiration. E) photorespiration.",
    back: "A",
  },
  {
    front:
      "The splitting of carbon dioxide to form oxygen gas and carbon compounds occurs during A) photosynthesis. B) respiration. C) both photosynthesis and respiration. D) neither photosynthesis nor respiration. E) photorespiration.",
    back: "D",
  },
  {
    front:
      "Generation of proton gradients across membranes occurs during A) photosynthesis. B) respiration. C) both photosynthesis and respiration. D) neither photosynthesis nor respiration. E) photorespiration.",
    back: "C",
  },
  {
    front:
      "What is the relationship between wavelength of light and the quantity of energy per photon? A) They have a direct, linear relationship. B) They are inversely related. C) They are logarithmically related. D) They are separate phenomena. E) They are only related in certain parts of the spectrum.",
    back: "B",
  },
  {
    front:
      "P680\u207a is said to be the strongest biological oxidizing agent. Why? A) It is the receptor for the most excited electron in either photosystem. B) It is the molecule that transfers electrons to plastoquinone (Pq) of the electron transfer system. C) It transfers its electrons to reduce NADP\u207a to NADPH. D) This molecule has a stronger attraction for electrons than oxygen, to obtain electrons from water. E) It has a positive charge.",
    back: "D",
  },
  {
    front:
      "Some photosynthetic bacteria (e.g., purple sulfur bacteria) have only photosystem I, whereas others (e.g., cyanobacteria) have both photosystem I and photosystem II. Which of the following might this observation imply? A) Photosystem II was selected against in some species. B) Photosynthesis with only photosystem I is more ancestral. C) Photosystem II may have evolved to be more photoprotective. D) Linear electron flow is more primitive than cyclic flow of electrons. E) Cyclic flow is more necessary than linear electron flow.",
    back: "B",
  },
  {
    front:
      "electron flow may be photoprotective (protective to light-induced damage). Which of the following experiments could provide information on this phenomenon? A) use mutated organisms that can grow but that cannot carry out cyclic flow of electrons and compare their abilities to photosynthesize in different light intensities against those of wild-type organisms B) use plants that can carry out both linear and cyclic electron flow, or only one or another of these processes, and compare their light absorbance at different wavelengths and different light intensities C) use bacteria that have only cyclic flow and look for their frequency of mutation damage at different light intensities D) use bacteria with only cyclic flow and measure the number and types of photosynthetic pigments they have in their membranes E) use plants with only photosystem I operative and measure how much damage occurs at different wavelengths",
    back: "A",
  },
  {
    front:
      "Carotenoids are often found in foods that are considered to have antioxidant properties in human nutrition. What related function do they have in plants? A) They serve as accessory pigments to increase light absorption. B) They protect against oxidative damage from excessive light energy. C) They shield the sensitive chromosomes of the plant from harmful ultraviolet radiation. D) They reflect orange light and enhance red light absorption by chlorophyll. E) They take up and remove toxins from the groundwater.",
    back: "B",
  },
  {
    front:
      'In thylakoids, protons travel through ATP synthase from the thylakoid space to the stroma. Therefore, the catalytic "knobs" of ATP synthase would be located A) on the side facing the thylakoid space. B) on the ATP molecules themselves. C) on the pigment molecules of photosystem I and photosystem II. D) on the stromal side of the membrane. E) built into the center of the thylakoid stack (granum).',
    back: "D",
  },
  {
    front:
      "In metabolic processes of cell respiration and photosynthesis, prosthetic groups such as heme and iron-sulfur complexes are encountered in components of the electron transport chain. What do they do? A) donate electrons B) act as reducing agents C) act as oxidizing agents D) transport protons within the mitochondria and chloroplasts E) both oxidize and reduce during electron transport",
    back: "E",
  },
  {
    front:
      "In a cyanobacterium, the reactions that produce NADPH occur in A) the light reactions alone. B) the Calvin cycle alone. C) both the light reactions and the Calvin cycle. D) neither the light reactions nor the Calvin cycle. E) the chloroplast, but is not part of photosynthesis.",
    back: "A",
  },
  {
    front:
      "The reactions that produce molecular oxygen (O\u2082) take place in A) the light reactions alone. B) the Calvin cycle alone. C) both the light reactions and the Calvin cycle. D) neither the light reactions nor the Calvin cycle. E) the chloroplast, but are not part of photosynthesis.",
    back: "A",
  },
  {
    front:
      "The accumulation of free oxygen in Earth's atmosphere began A) with the origin of life and respiratory metabolism. B) with the origin of photosynthetic bacteria that had photosystem I. C) with the origin of cyanobacteria that had both photosystem I and photosystem II. D) with the origin of chloroplasts in photosynthetic eukaryotic algae. E) with the origin of land plants.",
    back: "C",
  },
  {
    front:
      "A flask containing photosynthetic green algae and a control flask containing water with no algae are both placed under a bank of lights, which are set to cycle between 12 hours of light and 12 hours of dark. The dissolved oxygen concentrations in both flasks are monitored. Predict what the relative dissolved oxygen concentrations will be in the flask with algae compared to the control flask. A) The dissolved oxygen in the flask with algae will always be higher. B) The dissolved oxygen in the flask with algae will always be lower. C) The dissolved oxygen in the flask with algae will be higher in the light, but the same in the dark. D) The dissolved oxygen in the flask with algae will be higher in the light, but lower in the dark. E) The dissolved oxygen in the flask with algae will not be different from the control flask at any time.",
    back: "D",
  },
  {
    front:
      "Where do the enzymatic reactions of the Calvin cycle take place? A) stroma of the chloroplast B) thylakoid membranes C) matrix of the mitochondria D) cytosol around the chloroplast E) thylakoid space",
    back: "A",
  },
  {
    front:
      "What is the primary function of the Calvin cycle? A) use ATP to release carbon dioxide B) use NADPH to release carbon dioxide C) split water and release oxygen D) transport RuBP out of the chloroplast E) synthesize simple sugars from carbon dioxide",
    back: "E",
  },
  {
    front:
      "In C\u2083 photosynthesis, the reactions that require ATP take place in A) the light reactions alone. B) the Calvin cycle alone. C) both the light reactions and the Calvin cycle. D) neither the light reactions nor the Calvin cycle. E) the chloroplast, but is not part of photosynthesis.",
    back: "B",
  },
  {
    front:
      "In a plant leaf, the reactions that produce NADH occur in A) the light reactions alone. B) the Calvin cycle alone. C) both the light reactions and the Calvin cycle. D) neither the light reactions nor the Calvin cycle. E) the chloroplast, but is not part of photosynthesis.",
    back: "D",
  },
  {
    front:
      "The NADPH required for the Calvin cycle comes from A) reactions initiated in photosystem I. B) reactions initiated in photosystem II. C) the citric acid cycle. D) glycolysis. E) oxidative phosphorylation.",
    back: "A",
  },
  {
    front:
      "Reactions that require CO\u2082 take place in A) the light reactions alone. B) the Calvin cycle alone. C) both the light reactions and the Calvin cycle. D) neither the light reactions nor the Calvin cycle. E) the chloroplast, but is not part of photosynthesis.",
    back: "B",
  },
  {
    front:
      "Which of the following statements best represents the relationships between the light reactions and the Calvin cycle? A) The light reactions provide ATP and NADPH to the Calvin cycle, and the cycle returns ADP, Pi, and NADP\u207a to the light reactions. B) The light reactions provide ATP and NADPH to the carbon fixation step of the Calvin cycle, and the cycle provides water and electrons to the light reactions. C) The light reactions supply the Calvin cycle with CO\u2082 to produce sugars, and the Calvin cycle supplies the light reactions with sugars to produce ATP. D) The light reactions provide the Calvin cycle with oxygen for electron flow, and the Calvin cycle provides the light reactions with water to split. E) There is no relationship between the light reactions and the Calvin cycle.",
    back: "A",
  },
  {
    front:
      'Three "turns" of the Calvin cycle generate a "surplus" molecule of glyceraldehyde 3-phosphate (G3P). Which of the following is a consequence of this? A) Formation of a molecule of glucose would require nine "turns." B) G3P more readily forms sucrose and other disaccharides than it does monosaccharides. C) Some plants would not taste sweet to us. D) The formation of sucrose and starch in plants involves assembling G3P molecules, with or without further rearrangements. E) Plants accumulate and store G3P.',
    back: "D",
  },
  {
    front:
      "In the process of carbon fixation, RuBP attaches a CO\u2082 to produce a six-carbon molecule, which is then split to produce two molecules of 3-phosphoglycerate. After phosphorylation and reduction produces glyceraldehyde 3-phosphate (G3P), what more needs to happen to complete the Calvin cycle? A) addition of a pair of electrons from NADPH B) inactivation of RuBP carboxylase enzyme C) regeneration of ATP from ADP D) regeneration of RuBP E) regeneration of NADP\u207a",
    back: "D",
  },
  {
    front:
      "The pH of the inner thylakoid space has been measured, as have the pH of the stroma and of the cytosol of a particular plant cell. Which, if any, relationship would you expect to find? A) The pH within the thylakoid is less than that of the stroma. B) The pH of the stroma is lower than that of the other two measurements. C) The pH of the stroma is higher than that of the thylakoid space but lower than that of the cytosol. D) The pH of the thylakoid space is higher than that anywhere else in the cell. E) There is no consistent relationship.",
    back: "A",
  },
  {
    front:
      "The phylogenetic distribution of the enzyme rubisco is limited to A) C\u2083 plants only. B) C\u2083 and C\u2084 plants. C) all photosynthetic eukaryotes. D) all known photoautotrophs, both bacterial and eukaryotic. E) all living cells.",
    back: "D",
  },
  {
    front:
      "Photorespiration occurs when rubisco reacts RuBP with A) CO\u2082. B) O\u2082. C) glyceraldehyde 3-phosphate. D) 3-phosphoglycerate. E) NADPH.",
    back: "B",
  },
  {
    front:
      "In an experiment studying photosynthesis performed during the day, you provide a plant with radioactive carbon (\u00b9\u2074C) dioxide as a metabolic tracer. The \u00b9\u2074C is incorporated first into oxaloacetate. The plant is best characterized as a A) C\u2084 plant. B) C\u2083 plant. C) CAM plant. D) heterotroph. E) chemoautotroph.",
    back: "A",
  },
  {
    front:
      "Why are C\u2084 plants able to photosynthesize with no apparent photorespiration? A) They do not participate in the Calvin cycle. B) They use PEP carboxylase to initially fix CO\u2082. C) They are adapted to cold, wet climates. D) They conserve water more efficiently. E) They exclude oxygen from their tissues.",
    back: "B",
  },
  {
    front:
      "CAM plants keep stomata closed in daytime, thus reducing loss of water. They can do this because they A) fix CO\u2082 into organic acids during the night. B) fix CO\u2082 into sugars in the bundle-sheath cells. C) fix CO\u2082 into pyruvate in the mesophyll cells. D) use the enzyme phosphofructokinase, which outcompetes rubisco for CO\u2082. E) use photosystem I and photosystem II at night.",
    back: "A",
  },
  {
    front:
      "Photorespiration lowers the efficiency of photosynthesis by A) carbon dioxide molecules. B) 3-phosphoglycerate molecules. C) ATP molecules. D) ribulose bisphosphate molecules. E) RuBP carboxylase molecules.",
    back: "B",
  },
  {
    front:
      "The alternative pathways of photosynthesis using the C\u2084 or CAM systems are said to be compromises. Why? A) Each one minimizes both water loss and rate of photosynthesis. B) C\u2084 compromises on water loss and CAM compromises on photorespiration. C) Both minimize photorespiration but expend more ATP during carbon fixation. D) CAM plants allow more water loss, while C\u2084 plants allow less CO\u2082 into the plant. E) C\u2084 plants allow less water loss but CAM plants allow more water loss.",
    back: "C",
  },
  {
    front:
      "If plant gene alterations cause the plants to be deficient in photorespiration, what would most probably occur? A) Photosynthetic efficiency would be reduced at low light intensities. B) Cells would carry on the Calvin cycle at a much slower rate. C) Less ATP would be generated. D) There would be more light-induced damage to the cells. E) Less oxygen would be produced.",
    back: "D",
  },
  {
    front:
      "Compared to C\u2083 plants, C\u2084 plants A) can continue to fix CO\u2082 even at relatively low CO2 concentrations and high oxygen concentrations. B) have higher rates of photorespiration. C) do not use rubisco for carbon fixation. D) grow better under cool, moist conditions. E) make a four-carbon compound, oxaloacetate, which is then delivered to the citric acid cycle in mitochondria.",
    back: "A",
  },
  {
    front:
      "<p>If atmospheric CO\u2082 concentrations increase twofold or more, how will plants be affected, disregarding any changes in climate? <br>A) All plants will experience increased rates of photosynthesis. <br>B) C\u2083 plants will have faster growth; C\u2084 plants will be minimally affected. <br>C) C\u2084 plants will have faster growth; C\u2083 plants will be minimally affected. <br>D) C\u2083 plants will have faster growth; C\u2084 plants will have slower growth. <br>E) Plant growth will not be affected because atmospheric CO\u2082 concentrations are never limiting for plant growth.</p> <p>If atmospheric CO\u2082 concentrations increase twofold or more, how will plants be affected, disregarding any changes in climate? <br>A) All plants will experience increased rates of photosynthesis. <br>B) C\u2083 plants will have faster growth; C\u2084 plants will be minimally affected. <br>C) C\u2084 plants will have faster growth; C\u2083 plants will be minimally affected. <br>D) C\u2083 plants will have faster growth; C\u2084 plants will have slower growth. <br>E) Plant growth will not be affected because atmospheric CO\u2082 concentrations are never limiting for plant growth.</p> &nbsp;",
    back: "B",
  },
  {
    front:
      "Plants photosynthesize only in the light. Plants respire A) in the dark only. B) in the light only. C) both in light and dark. D) never\u2013they get their ATP from photophosphorylation. E) only when excessive light energy induces photorespiration.",
    back: "C",
  },
  {
    front:
      "card image Figure 10.1 shows the absorption spectrum for chlorophyll a and the action spectrum for photosynthesis. Why are they different? A) Green and yellow wavelengths inhibit the absorption of red and blue wavelengths. B) Bright sunlight destroys photosynthetic pigments. C) Oxygen given off during photosynthesis interferes with the absorption of light. D) Other pigments absorb light in addition to chlorophyll a. E) Aerobic bacteria take up oxygen, which changes the measurement of the rate of photosynthesis.",
    back: "D",
  },
  {
    front:
      "card image What wavelength of light in the figure is most effective in driving photosynthesis? A) 420 mm B) 475 mm C) 575 mm D) 625 mm E) 730 mm",
    back: "A",
  },
  {
    front:
      "card image If ATP used by this plant is labeled with radioactive phosphorus, which molecule or molecules of the Calvin cycle will be radioactively labeled first? A) B only B) B and C only C) B, C, and D only D) B and E only E) B, C, D, and E",
    back: "D",
  },
  {
    front:
      "card image If the carbon atom of the incoming CO\u2082 molecule is labeled with a radioactive isotope of carbon, which organic molecules will be radioactively labeled after one cycle? A) C only B) B, C, D, and E C) C, D, and E only D) B and C only E) B and D only",
    back: "B",
  },
  {
    front:
      "card image Which molecule(s) of the Calvin cycle is (are) also found in glycolysis? A) B, C, E, and 3-phosphoglycerate B) B, C, and E only C) 3-phosphoglycerate only D) B, C, D, and 3-phosphoglycerate only E) E only",
    back: "D",
  },
  {
    front:
      "card image To identify the molecule that accepts CO\u2082, Calvin and Benson manipulated the carbon-fixation cycle by either cutting off CO\u2082 or cutting off light from cultures of photosynthetic algae. They then measured the concentrations of various metabolites immediately following the manipulation. How would these experiments help identify the CO\u2082 acceptor? Study Figure 10.2 to help you in determining the correct answer. A) The CO\u2082 acceptor concentration would decrease when either the CO\u2082 or light are cut off. B) The CO\u2082 acceptor concentration would increase when either the CO\u2082 or light are cut off. C) The CO\u2082 acceptor concentration would increase when the CO\u2082 is cut off, but decrease when the light is cut off. D) The CO\u2082 acceptor concentration would decrease when the CO\u2082 is cut off, but increase when the light is cut off. E) The CO\u2082 acceptor concentration would stay the same regardless of the CO\u2082 or light.",
    back: "C",
  },
  {
    front:
      "card image Which of the following statements is true concerning Figure 10.3? A) It represents cell processes involved in C\u2084 photosynthesis. B) It represents the type of cell structures found in CAM plants. C) It represents an adaptation that maximizes photorespiration. D) It represents a C\u2083 photosynthetic system. E) It represents a relationship between plant cells that photosynthesize and those that cannot.",
    back: "A",
  },
  {
    front:
      "card image Referring to Figure 10.3, oxygen would inhibit the CO\u2082 fixation reactions in A) cell I only. B) cell II only. C) neither cell I nor cell II. D) both cell I and cell II. E) cell I during the night and cell II during the day.",
    back: "B",
  },
  {
    front:
      "A gardener is concerned that her greenhouse is getting too hot from too much light, and seeks to shade her plants with colored translucent plastic sheets. What color should she use to reduce overall light energy, but still maximize plant growth? A) green B) blue C) yellow D) orange E) any color will work equally well",
    back: "B",
  },
  {
    front:
      "Theodor W. Engelmann illuminated a filament of algae with light that passed through a prism, thus exposing different segments of algae to different wavelengths of light. He added aerobic bacteria and then noted in which areas the bacteria congregated. He noted that the largest groups were found in the areas illuminated by the red and blue light.   What did Engelmann conclude about the congregation of bacteria in the red and blue areas? A) Bacteria released excess carbon dioxide in these areas. B) Bacteria congregated in these areas due to an increase in the temperature of the red and blue light. C) Bacteria congregated in these areas because these areas had the most oxygen being released. D) Bacteria are attracted to red and blue light and thus these wavelengths are more reactive than other wavelengths. E) Bacteria congregated in these areas due to an increase in the temperature caused by an increase in photosynthesis.",
    back: "C",
  },
  {
    front:
      "Theodor W. Engelmann illuminated a filament of algae with light that passed through a prism, thus exposing different segments of algae to different wavelengths of light. He added aerobic bacteria and then noted in which areas the bacteria congregated. He noted that the largest groups were found in the areas illuminated by the red and blue light.   An outcome of this experiment was to help determine A) the relationship between heterotrophic and autotrophic organisms. B) the relationship between wavelengths of light and the rate of aerobic respiration. C) the relationship between wavelengths of light and the amount of heat released. D) the relationship between wavelengths of light and the rate of photosynthesis. E) the relationship between the concentration of carbon dioxide and the rate of photosynthesis.",
    back: "D",
  },
  {
    front:
      "Theodor W. Engelmann illuminated a filament of algae with light that passed through a prism, thus exposing different segments of algae to different wavelengths of light. He added aerobic bacteria and then noted in which areas the bacteria congregated. He noted that the largest groups were found in the areas illuminated by the red and blue light.   If you ran the same experiment without passing light through a prism, what would you predict? A) There would be no difference in results. B) The bacteria would be relatively evenly distributed along the algal filaments. C) The number of bacteria present would decrease due to an increase in the carbon dioxide concentration. D) The number of bacteria present would increase due to an increase in the carbon dioxide concentration. E) The number of bacteria would decrease due to a decrease in the temperature of the water.",
    back: "B",
  },
  {
    front:
      "A spaceship is designed to support animal life for a multiyear voyage to the outer planets of the solar system. Plants will be grown to provide oxygen and to recycle carbon dioxide.   Since the spaceship will be too far from the sun for photosynthesis, an artificial light source will be needed. What wavelengths of light should be used to maximize plant growth with a minimum of energy expenditure? A) full-spectrum white light B) green light C) a mixture of blue and red light D) yellow light E) UV light",
    back: "C",
  },
  {
    front:
      "A spaceship is designed to support animal life for a multiyear voyage to the outer planets of the solar system. Plants will be grown to provide oxygen and to recycle carbon dioxide.   If the power fails and the lights go dark, what will happen to CO\u2082 levels? A) CO\u2082 will rise as a result of both animal and plant respiration. B) CO\u2082 will rise as a result of animal respiration only. C) CO\u2082 will remain balanced because plants will continue to fix CO\u2082 in the dark. D) CO\u2082 will fall because plants will increase CO\u2082 fixation. E) CO\u2082 will fall because plants will cease to respire in the dark.",
    back: "A",
  },
  {
    front:
      "The light reactions of photosynthesis supply the Calvin cycle with A) light energy. B) CO\u2082 and ATP. C) H\u2082O and NADPH. D) ATP and NADPH. E) sugar and O\u2082.",
    back: "D",
  },
  {
    front:
      "Which of the following sequences correctly represents the flow of electrons during photosynthesis? A) NADPH \u2192 O\u2082 \u2192 CO\u2082 B) H\u2082O \u2192 NADPH \u2192 Calvin cycle C) NADPH \u2192 chlorophyll \u2192 Calvin cycle D) H\u2082O \u2192 photosystem I \u2192 photosystem II E) NADPH \u2192 electron transport chain \u2192 O\u2082",
    back: "B",
  },
  {
    front:
      "How is photosynthesis similar in C\u2084 plants and CAM plants? A) In both cases, only photosystem I is used. B) Both types of plants make sugar without the Calvin cycle. C) In both cases, rubisco is not used to fix carbon initially. D) Both types of plants make most of their sugar in the dark. E) In both cases, thylakoids are not involved in photosynthesis.",
    back: "C",
  },
  {
    front:
      "Which of the following statements is a correct distinction between autotrophs and heterotrophs? A) Only heterotrophs require chemical compounds from the environment. B) Cellular respiration is unique to heterotrophs. C) Only heterotrophs have mitochondria. D) Autotrophs, but not heterotrophs, can nourish themselves beginning with CO\u2082 and other nutrients that are inorganic. E) Only heterotrophs require oxygen.",
    back: "D",
  },
  {
    front:
      "Which of the following does not occur during the Calvin cycle? A) carbon fixation B) oxidation of NADPH C) release of oxygen D) regeneration of the CO\u2082 acceptor E) consumption of ATP",
    back: "C",
  },
  {
    front:
      "In mechanism, photophosphorylation is most similar to A) substrate-level phosphorylation in glycolysis. B) oxidative phosphorylation in cellular respiration. C) the Calvin cycle. D) carbon fixation. E) reduction of NADP\u207a.",
    back: "B",
  },
  {
    front:
      "Which process is most directly driven by light energy? A) creation of a pH gradient by pumping protons across the thylakoid membrane B) carbon fixation in the stroma C) reduction of NADP\u207a molecules D) removal of electrons from chlorophyll molecules E) ATP synthesis",
    back: "D",
  },
  {
    front:
      "1) In his transformation experiments, what did Griffith observe? A) Mutant mice were resistant to bacterial infections. B) Mixing a heat-killed pathogenic strain of bacteria with a living nonpathogenic strain can convert some of the living cells into the pathogenic form. C) Mixing a heat-killed nonpathogenic strain of bacteria with a living pathogenic strain makes the pathogenic strain nonpathogenic. D) Infecting mice with nonpathogenic strains of bacteria makes them resistant to pathogenic strains. E) Mice infected with a pathogenic strain of bacteria can spread the infection to other mice.",
    back: "B",
  },
  {
    front:
      "2) How do we describe transformation in bacteria? A) the creation of a strand of DNA from an RNA molecule B) the creation of a strand of RNA from a DNA molecule C) the infection of cells by a phage DNA molecule D) the type of semiconservative replication shown by DNA E) assimilation of external DNA into a cell",
    back: "E",
  },
  {
    front:
      "3) After mixing a heat-killed, phosphorescent strain of bacteria with a living nonphosphorescent strain, you discover that some of the living cells are now phosphorescent. Which observations would provide the best evidence that the ability to fluoresce is a heritable trait? A) DNA passed from the heat-killed strain to the living strain. B) Protein passed from the heat-killed strain to the living strain. C) The phosphorescence in the living strain is especially bright. D) Descendants of the living cells are also phosphorescent. E) Both DNA and protein passed from the heat-killed strain to the living strain.",
    back: "D",
  },
  {
    front:
      "4) In trying to determine whether DNA or protein is the genetic material, Hershey and Chase made use of which of the following facts? A) DNA contains sulfur, whereas protein does not. B) DNA contains phosphorus, whereas protein does not. C) DNA contains nitrogen, whereas protein does not. D) DNA contains purines, whereas protein includes pyrimidines. E) RNA includes ribose, whereas DNA includes deoxyribose sugars.",
    back: "B",
  },
  {
    front:
      "5) Which of the following investigators was/were responsible for the following discovery? In DNA from any species, the amount of adenine equals the amount of thymine, and the amount of guanine equals the amount of cytosine. A) Frederick Griffith B) Alfred Hershey and Martha Chase C) Oswald Avery, Maclyn McCarty, and Colin MacLeod D) Erwin Chargaff E) Matthew Meselson and Franklin Stahl",
    back: "D",
  },
  {
    front:
      "6) Cytosine makes up 42% of the nucleotides in a sample of DNA from an organism. Approximately what percentage of the nucleotides in this sample will be thymine? A) 8% B) 16% C) 31% D) 42% E) It cannot be determined from the information provided.",
    back: "A",
  },
  {
    front:
      "7) Which of the following can be determined directly from X-ray diffraction photographs of crystallized DNA? A) the diameter of the helix B) the rate of replication C) the sequence of nucleotides D) the bond angles of the subunits E) the frequency of A vs. T nucleotides",
    back: "A",
  },
  {
    front:
      "8) It became apparent to Watson and Crick after completion of their model that the DNA molecule could carry a vast amount of hereditary information in which of the following? A) sequence of bases B) phosphate-sugar backbones C) complementary pairing of bases D) side groups of nitrogenous bases E) different five-carbon sugars",
    back: "A",
  },
  {
    front:
      "9) In an analysis of the nucleotide composition of DNA, which of the following will be found? A) A = C B) A = G and C = T C) A + C = G + T D) G + C = T + A",
    back: "C",
  },
  {
    front:
      "10) Replication in prokaryotes differs from replication in eukaryotes for which of the following reasons? A) Prokaryotic chromosomes have histones, whereas eukaryotic chromosomes do not. B) Prokaryotic chromosomes have a single origin of replication, whereas eukaryotic chromosomes have many. C) The rate of elongation during DNA replication is slower in prokaryotes than in eukaryotes. D) Prokaryotes produce Okazaki fragments during DNA replication, but eukaryotes do not. E) Prokaryotes have telomeres, and eukaryotes do not.",
    back: "B",
  },
  {
    front:
      "11) What is meant by the description \"antiparallel\" regarding the strands that make up DNA? A) The twisting nature of DNA creates nonparallel strands. B) The 5' to 3' direction of one strand runs counter to the 5' to 3' direction of the other strand. C) Base pairings create unequal spacing between the two DNA strands. D) One strand is positively charged and the other is negatively charged. E) One strand contains only purines and the other contains only pyrimidines.",
    back: "B",
  },
  {
    front:
      "12) Suppose you are provided with an actively dividing culture of E. coli bacteria to which radioactive thymine has been added. What would happen if a cell replicates once in the presence of this radioactive base? A) One of the daughter cells, but not the other, would have radioactive DNA. B) Neither of the two daughter cells would be radioactive. C) All four bases of the DNA would be radioactive. D) Radioactive thymine would pair with nonradioactive guanine. E) DNA in both daughter cells would be radioactive.",
    back: "E",
  },
  {
    front:
      "13) An Okazaki fragment has which of the following arrangements? A) primase, polymerase, ligase B) 3' RNA nucleotides, DNA nucleotides 5' C) 5' RNA nucleotides, DNA nucleotides 3' D) DNA polymerase I, DNA polymerase III E) 5' DNA to 3'",
    back: "C",
  },
  {
    front:
      "14) In E. coli, there is a mutation in a gene called dnaB that alters the helicase that normally acts at the origin. Which of the following would you expect as a result of this mutation? A) No proofreading will occur. B) No replication fork will be formed. C) The DNA will supercoil. D) Replication will occur via RNA polymerase alone. E) Replication will require a DNA template from another source.",
    back: "B",
  },
  {
    front:
      "15) Which enzyme catalyzes the elongation of a DNA strand in the 5' \u2192 3' direction? A) primase B) DNA ligase C) DNA polymerase III D) topoisomerase E) helicase",
    back: "C",
  },
  {
    front:
      "16) Eukaryotic telomeres replicate differently than the rest of the chromosome. This is a consequence of which of the following? A) the evolution of telomerase enzyme B) DNA polymerase that cannot replicate the leading strand template to its 5' end C) gaps left at the 5' end of the lagging strand D) gaps left at the 3' end of the lagging strand because of the need for a primer E) the \"no ends\" of a circular chromosome",
    back: "C",
  },
  {
    front:
      "17) The enzyme telomerase solves the problem of replication at the ends of linear chromosomes by which method? A) adding a single 5' cap structure that resists degradation by nucleases B) causing specific double-strand DNA breaks that result in blunt ends on both strands C) causing linear ends of the newly replicated DNA to circularize D) adding numerous short DNA sequences such as TTAGGG, which form a hairpin turn E) adding numerous GC pairs which resist hydrolysis and maintain chromosome integrity",
    back: "D",
  },
  {
    front:
      "18) The DNA of telomeres has been found to be highly conserved throughout the evolution of eukaryotes. What does this most probably reflect? A) the inactivity of this DNA B) the low frequency of mutations occurring in this DNA C) that new evolution of telomeres continues D) that mutations in telomeres are relatively advantageous E) that the critical function of telomeres must be maintained",
    back: "E",
  },
  {
    front:
      "19) At a specific area of a chromosome, the sequence of nucleotides below is present where the chain opens to form a replication fork: 3' C C T A G G C T G C A A T C C 5' An RNA primer is formed starting at the underlined T (T) of the template. Which of the following represents the primer sequence? A) 5' G C C T A G G 3' B) 3' G C C T A G G 5' C) 5' A C G T T A G G 3' D) 5' A C G U U A G G 3' E) 5' G C C U A G G 3'",
    back: "D",
  },
  {
    front:
      "20) Polytene chromosomes of Drosophila salivary glands each consist of multiple identical DNA strands that are aligned in parallel arrays. How could these arise? A) replication followed by mitosis B) replication without separation C) meiosis followed by mitosis D) fertilization by multiple sperm E) special association with histone proteins",
    back: "B",
  },
  {
    front:
      "21) To repair a thymine dimer by nucleotide excision repair, in which order do the necessary enzymes act? A) exonuclease, DNA polymerase III, RNA primase B) helicase, DNA polymerase I, DNA ligase C) DNA ligase, nuclease, helicase D) DNA polymerase I, DNA polymerase III, DNA ligase E) endonuclease, DNA polymerase I, DNA ligase",
    back: "E",
  },
  {
    front:
      "22) What is the function of DNA polymerase III? A) to unwind the DNA helix during replication B) to seal together the broken ends of DNA strands C) to add nucleotides to the 3' end of a growing DNA strand D) to degrade damaged DNA molecules E) to rejoin the two DNA strands (one new and one old) after replication",
    back: "C",
  },
  {
    front:
      "23) The difference between ATP and the nucleoside triphosphates used during DNA synthesis is that A) the nucleoside triphosphates have the sugar deoxyribose; ATP has the sugar ribose. B) the nucleoside triphosphates have two phosphate groups; ATP has three phosphate groups. C) ATP contains three high-energy bonds; the nucleoside triphosphates have two. D) ATP is found only in human cells; the nucleoside triphosphates are found in all animal and plant cells. E) triphosphate monomers are active in the nucleoside triphosphates, but not in ATP.",
    back: "A",
  },
  {
    front:
      "24) The leading and the lagging strands differ in that A) the leading strand is synthesized in the same direction as the movement of the replication fork, and the lagging strand is synthesized in the opposite direction. B) the leading strand is synthesized by adding nucleotides to the 3' end of the growing strand, and the lagging strand is synthesized by adding nucleotides to the 5' end. C) the lagging strand is synthesized continuously, whereas the leading strand is synthesized in short fragments that are ultimately stitched together. D) the leading strand is synthesized at twice the rate of the lagging strand.",
    back: "A",
  },
  {
    front:
      "25) A new DNA strand elongates only in the 5' to 3' direction because A) DNA polymerase begins adding nucleotides at the 5' end of the template. B) Okazaki fragments prevent elongation in the 3' to 5' direction. C) the polarity of the DNA molecule prevents addition of nucleotides at the 3' end. D) replication must progress toward the replication fork. E) DNA polymerase can only add nucleotides to the free 3' end.",
    back: "E",
  },
  {
    front:
      "26) What is the function of topoisomerase? A) relieving strain in the DNA ahead of the replication fork B) elongating new DNA at a replication fork by adding nucleotides to the existing chain C) adding methyl groups to bases of DNA D) unwinding of the double helix E) stabilizing single-stranded DNA at the replication fork",
    back: "A",
  },
  {
    front:
      "27) What is the role of DNA ligase in the elongation of the lagging strand during DNA replication? A) It synthesizes RNA nucleotides to make a primer. B) It catalyzes the lengthening of telomeres. C) It joins Okazaki fragments together. D) It unwinds the parental double helix. E) It stabilizes the unwound parental DNA.",
    back: "C",
  },
  {
    front:
      "28) Which of the following help(s) to hold the DNA strands apart while they are being replicated? A) primase B) ligase C) DNA polymerase D) single-strand binding proteins E) exonuclease",
    back: "D",
  },
  {
    front:
      "29) Individuals with the disorder xeroderma pigmentosum are hypersensitive to sunlight. This occurs because their cells are impaired in what way? A) They cannot replicate DNA. B) They cannot undergo mitosis. C) They cannot exchange DNA with other cells. D) They cannot repair thymine dimers. E) They do not recombine homologous chromosomes during meiosis.",
    back: "D",
  },
  {
    front:
      "30) Which of the following would you expect of a eukaryote lacking telomerase? A) a high probability of somatic cells becoming cancerous B) production of Okazaki fragments C) inability to repair thymine dimers D) a reduction in chromosome length in gametes E) high sensitivity to sunlight",
    back: "D",
  },
  {
    front:
      "Use the following list of choices for the following question I. helicase II. DNA polymerase III III. ligase IV. DNA polymerase I V. primase   31) Which of the enzymes removes the RNA nucleotides from the primer and adds equivalent DNA nucleotides to the 3' end of Okazaki fragments? A) I B) II C) III D) IV E) V",
    back: "D",
  },
  {
    front:
      "Use the following list of choices for the following question I. helicase II. DNA polymerase III III. ligase IV. DNA polymerase I V. primase   32) Which of the enzymes separates the DNA strands during replication? A) I B) II C) III D) IV E) V",
    back: "A",
  },
  {
    front:
      "Use the following list of choices for the following question I. helicase II. DNA polymerase III III. ligase IV. DNA polymerase I V. primase   33) Which of the enzymes covalently connects segments of DNA? A) I B) II C) III D) IV E) V",
    back: "C",
  },
  {
    front:
      "Use the following list of choices for the following question I. helicase II. DNA polymerase III III. ligase IV. DNA polymerase I V. primase   34) Which of the enzymes synthesizes short segments of RNA? A) I B) II C) III D) IV E) V",
    back: "E",
  },
  {
    front:
      "35) Which of the following sets of materials are required by both eukaryotes and prokaryotes for replication? A) double-stranded DNA, four kinds of dNTPs, primers, origins B) topoisomerases, telomerases, polymerases C) G-C rich regions, polymerases, chromosome nicks D) nucleosome loosening, four dNTPs, four rNTPs E) ligase, primers, nucleases",
    back: "A",
  },
  {
    front:
      "36) Studies of nucleosomes have shown that histones (except H1) exist in each nucleosome as two kinds of tetramers: one of 2 H2A molecules and 2 H2B molecules, and the other as 2 H3 and 2 H4 molecules. Which of the following is supported by this data?   A) DNA can wind itself around either of the two kinds of tetramers. B) The two types of tetramers associate to form an octamer. C) DNA has to associate with individual histones before they form tetramers. D) Only H2A can form associations with DNA molecules. E) The structure of H3 and H4 molecules is not basic like that of the other histones.",
    back: "B",
  },
  {
    front:
      "37) In a linear eukaryotic chromatin sample, which of the following strands is looped into domains by scaffolding? A) DNA without attached histones B) DNA with H1 only C) the 10-nm chromatin fiber D) the 30-nm chromatin fiber E) the metaphase chromosome",
    back: "D",
  },
  {
    front:
      "38) Which of the following statements describes the eukaryotic chromosome? A) It is composed of DNA alone. B) The nucleosome is its most basic functional subunit. C) The number of genes on each chromosome is different in different cell types of an organism. D) It consists of a single linear molecule of double-stranded DNA plus proteins. E) Active transcription occurs on heterochromatin but not euchromatin.",
    back: "D",
  },
  {
    front:
      "39) If a cell were unable to produce histone proteins, which of the following would be a likely effect?   A) There would be an increase in the amount of \"satellite\" DNA produced during centrifugation. B) The cell's DNA couldn't be packed into its nucleus. C) Spindle fibers would not form during prophase. D) Amplification of other genes would compensate for the lack of histones. E) Pseudogenes would be transcribed to compensate for the decreased protein in the cell.",
    back: "B",
  },
  {
    front:
      '40) Which of the following statements is true of histones?   A) Each nucleosome consists of two molecules of histone H1. B) Histone H1 is not present in the nucleosome bead; instead, it draws the nucleosomes together. C) The carboxyl end of each histone extends outward from the nucleosome and is called a "histone tail." D) Histones are found in mammals, but not in other animals or in plants or fungi. E) The mass of histone in chromatin is approximately nine times the mass of DNA.',
    back: "B",
  },
  {
    front:
      "41) Why do histones bind tightly to DNA? A) Histones are positively charged, and DNA is negatively charged. B) Histones are negatively charged, and DNA is positively charged. C) Both histones and DNA are strongly hydrophobic. D) Histones are covalently linked to the DNA. E) Histones are highly hydrophobic, and DNA is hydrophilic.",
    back: "A",
  },
  {
    front:
      "42) Which of the following represents the order of increasingly higher levels of organization of chromatin? A) nucleosome, 30-nm chromatin fiber, looped domain B) looped domain, 30-nm chromatin fiber, nucleosome C) looped domain, nucleosome, 30-nm chromatin fiber D) nucleosome, looped domain, 30-nm chromatin fiber E) 30-nm chromatin fiber, nucleosome, looped domain",
    back: "A",
  },
  {
    front:
      "43) Which of the following statements describes chromatin? A) Heterochromatin is composed of DNA, whereas euchromatin is made of DNA and RNA. B) Both heterochromatin and euchromatin are found in the cytoplasm. C) Heterochromatin is highly condensed, whereas euchromatin is less compact. D) Euchromatin is not transcribed, whereas heterochromatin is transcribed. E) Only euchromatin is visible under the light microscope.",
    back: "C",
  },
  {
    front:
      'card image 44) In the late 1950s, Meselson and Stahl grew bacteria in a medium containing "heavy" nitrogen (\u00b9\u2075N) and then transferred them to a medium containing \u00b9\u2074N. Which of the results in the figure above would be expected after one round of DNA replication in the presence of \u00b9\u2074N? A) A B) B C) C D) D E) E',
    back: "D",
  },
  {
    front:
      "card image 45) A space probe returns with a culture of a microorganism found on a distant planet. Analysis shows that it is a carbon-based life-form that has DNA. You grow the cells in \u00b9\u2075N medium for several generations and then transfer them to \u00b9\u2074N medium. Which pattern in the figure above would you expect if the DNA was replicated in a conservative manner? A) A B) B C) C D) D E) E",
    back: "B",
  },
  {
    front:
      "card image 46) Once the pattern found after one round of replication was observed, Meselson and Stahl could be confident of which of the following conclusions? A) Replication is semi-conservative. B) Replication is not dispersive. C) Replication is not semi-conservative. D) Replication is not conservative. E) Replication is neither dispersive nor conservative.",
    back: "D",
  },
  {
    front:
      "card image Grains represent radioactive material within the replicating eye.   47) In an experiment, DNA is allowed to replicate in an environment with all necessary enzymes, dATP, dCTP, dGTP, and radioactively labeled dTTP (\u00b3H thymidine) for several minutes and then switched to nonradioactive medium. It is then viewed by electron microscopy and autoradiography. The figure above represents the results. Which of the following is the most likely interpretation? A) There are two replication forks going in opposite directions. B) Thymidine is only being added where the DNA strands are furthest apart. C) Thymidine is only added at the very beginning of replication. D) Replication proceeds in one direction only.",
    back: "A",
  },
  {
    front:
      "48) For a science fair project, two students decided to repeat the Hershey and Chase experiment, with modifications. They decided to label the nitrogen of the DNA, rather than the phosphate. They reasoned that each nucleotide has only one phosphate and two to five nitrogens. Thus, labeling the nitrogens would provide a stronger signal than labeling the phosphates. Why won't this experiment work?   A) There is no radioactive isotope of nitrogen. B) Radioactive nitrogen has a half-life of 100,000 years, and the material would be too dangerous for too long. C) Avery et al. have already concluded that this experiment showed inconclusive results. D) Although there are more nitrogens in a nucleotide, labeled phosphates actually have 16 extra neutrons; therefore, they are more radioactive. E) Amino acids (and thus proteins) also have nitrogen atoms; thus, the radioactivity would not distinguish between DNA and proteins.",
    back: "E",
  },
  {
    front:
      "49) You briefly expose bacteria undergoing DNA replication to radioactively labeled nucleotides. When you centrifuge the DNA isolated from the bacteria, the DNA separates into two classes. One class of labeled DNA includes very large molecules (thousands or even millions of nucleotides long), and the other includes short stretches of DNA (several hundred to a few thousand nucleotides in length). These two classes of DNA probably represent A) leading strands and Okazaki fragments. B) lagging strands and Okazaki fragments. C) Okazaki fragments and RNA primers. D) leading strands and RNA primers. E) RNA primers and mitochondrial DNA.",
    back: "A",
  },
  {
    front:
      "50) In his work with pneumonia-causing bacteria and mice, Griffith found that A) the protein coat from pathogenic cells was able to transform nonpathogenic cells. B) heat-killed pathogenic cells caused pneumonia. C) some substance from pathogenic cells was transferred to nonpathogenic cells, making them pathogenic. D) the polysaccharide coat of bacteria caused pneumonia. E) bacteriophages injected DNA into bacteria.",
    back: "C",
  },
  {
    front:
      "51) What is the basis for the difference in how the leading and lagging strands of DNA molecules are synthesized? A) The origins of replication occur only at the 5' end. B) Helicases and single-strand binding proteins work at the 5' end. C) DNA polymerase can join new nucleotides only to the 3' end of a growing strand. D) DNA ligase works only in the 3' \u2192 5' direction. E) Polymerase can work on only one strand at a time.",
    back: "C",
  },
  {
    front:
      "52) In analyzing the number of different bases in a DNA sample, which result would be consistent with the base-pairing rules? A) A = G B) A + G = C + T C) A + T = G + T D) A = C E) G = T",
    back: "B",
  },
  {
    front:
      "53) The elongation of the leading strand during DNA synthesis A) progresses away from the replication fork. B) occurs in the 3' \u2192 5' direction. C) produces Okazaki fragments. D) depends on the action of DNA polymerase. E) does not require a template strand.",
    back: "D",
  },
  {
    front:
      "54) In a nucleosome, the DNA is wrapped around A) polymerase molecules. B) ribosomes. C) histones. D) a thymine dimer. E) satellite DNA.",
    back: "C",
  },
  {
    front:
      "55) E. coli cells grown on \u00b9\u2075N medium are transferred to \u00b9\u2074N medium and allowed to grow for two more generations (two rounds of DNA replication). DNA extracted from these cells is centrifuged. What density distribution of DNA would you expect in this experiment? A) one high-density and one low-density band B) one intermediate-density band C) one high-density and one intermediate-density band D) one low-density and one intermediate-density band E) one low-density band",
    back: "D",
  },
  {
    front:
      "56) A biochemist isolates, purifies, and combines in a test tube a variety of molecules needed for DNA replication. When she adds some DNA to the mixture, replication occurs, but each DNA molecule consists of a normal strand paired with numerous segments of DNA a few hundred nucleotides long. What has she probably left out of the mixture? A) DNA polymerase B) DNA ligase C) nucleotides D) Okazaki fragments E) primase",
    back: "B",
  },
  {
    front:
      "57) The spontaneous loss of amino groups from adenine in DNA results in hypoxanthine, an uncommon base, opposite thymine. What combination of proteins could repair such damage? A) nuclease, DNA polymerase, DNA ligase B) telomerase, primase, DNA polymerase C) telomerase, helicase, single-strand binding protein D) DNA ligase, replication fork proteins, adenylyl cyclase E) nuclease, telomerase, primase",
    back: "A",
  },
  {
    front:
      "1) Viral genomes vary greatly in size and may include from four genes to several hundred genes. Which of the following viral features is most apt to correlate with the size of the genome? A) size of the viral capsomeres B) RNA versus DNA genome C) double- versus single-strand genomes D) size and shape of the capsid E) glycoproteins of the envelope",
    back: "D",
  },
  {
    front:
      "2) Viral envelopes can best be analyzed with which of the following techniques? A) transmission electron microscopy B) antibodies against specific proteins not found in the host membranes C) staining and visualization with the light microscope D) use of plaque assays for quantitative measurement of viral titer E) immunofluorescent tagging of capsid proteins",
    back: "B",
  },
  {
    front:
      "3) The host range of a virus is determined by A) the enzymes carried by the virus. B) whether its nucleic acid is DNA or RNA. C) the proteins in the host's cytoplasm. D) the enzymes produced by the virus before it infects the cell. E) the proteins on its surface and that of the host.",
    back: "E",
  },
  {
    front:
      "4) Most human-infecting viruses are maintained in the human population only. However, a zoonosis is a disease that is transmitted from other vertebrates to humans, at least sporadically, without requiring viral mutation. Which of the following is the best example of a zoonosis? A) rabies B) herpesvirus C) smallpox D) HIV E) hepatitis virus",
    back: "A",
  },
  {
    front:
      "5) Which of the following accounts for someone who has had a herpesvirus-mediated cold sore or genital sore getting flare-ups for the rest of his or her life? A) re-infection by a closely related herpesvirus of a different strain B) re-infection by the same herpesvirus strain C) co-infection with an unrelated virus that causes the same symptoms D) copies of the herpesvirus genome permanently maintained in host nuclei E) copies of the herpesvirus genome permanently maintained in host cell cytoplasm",
    back: "D",
  },
  {
    front:
      "6) In many ways, the regulation of the genes of a particular group of viruses will be similar to the regulation of the host genes. Therefore, which of the following would you expect of the genes of the bacteriophage? A) regulation via acetylation of histones B) positive control mechanisms rather than negative C) control of more than one gene in an operon D) reliance on transcription activators E) utilization of eukaryotic polymerases",
    back: "C",
  },
  {
    front:
      "7) Which of the following is characteristic of the lytic cycle? A) Many bacterial cells containing viral DNA are produced. B) Viral DNA is incorporated into the host genome. C) The viral genome replicates without destroying the host. D) A large number of phages are released at a time. E) The virus-host relationship usually lasts for generations.",
    back: "D",
  },
  {
    front:
      "8) Which of the following statements describes the lysogenic cycle of lambda (\u03bb) phage? A) After infection, the viral genes immediately turn the host cell into a lambda-producing factory, and the host cell then lyses. B) Most of the prophage genes are activated by the product of a particular prophage gene. C) The phage genome replicates along with the host genome. D) Certain environmental triggers can cause the phage to exit the host genome, switching from the lytic to the lysogenic. E) The phage DNA is incorporated by crossing over into any nonspecific site on the host cell's DNA.",
    back: "C",
  },
  {
    front:
      "9) Why do RNA viruses appear to have higher rates of mutation? A) RNA nucleotides are more unstable than DNA nucleotides. B) Replication of their genomes does not involve proofreading. C) RNA viruses replicate faster. D) RNA viruses can incorporate a variety of nonstandard bases. E) RNA viruses are more sensitive to mutagens.",
    back: "B",
  },
  {
    front:
      "10) Most molecular biologists think that viruses originated from fragments of cellular nucleic acid. Which of the following observations supports this theory? A) Viruses contain either DNA or RNA. B) Viruses are enclosed in protein capsids rather than plasma membranes. C) Viruses can reproduce only inside host cells. D) Viruses can infect both prokaryotic and eukaryotic cells. E) Viral genomes are usually similar to the genome of the host cell.",
    back: "E",
  },
  {
    front:
      "11) A researcher lyses a cell that contains nucleic acid molecules and capsomeres of tobacco mosaic virus (TMV). The cell contents are left in a covered test tube overnight. The next day this mixture is sprayed on tobacco plants. Which of the following would be expected to occur? A) The plants would develop some but not all of the symptoms of the TMV infection. B) The plants would develop symptoms typically produced by viroids. C) The plants would develop the typical symptoms of TMV infection. D) The plants would not show any disease symptoms. E) The plants would become infected, but the sap from these plants would be unable to infect other plants.",
    back: "C",
  },
  {
    front:
      "12) Which viruses have single-stranded RNA that acts as a template for DNA synthesis? A) lytic phages B) proviruses C) viroids D) bacteriophages E) retroviruses",
    back: "E",
  },
  {
    front:
      "13) What is the function of reverse transcriptase in retroviruses? A) It hydrolyzes the host cell's DNA. B) It uses viral RNA as a template for DNA synthesis. C) It converts host cell RNA into viral DNA. D) It translates viral RNA into proteins. E) It uses viral RNA as a template for making complementary RNA strands.",
    back: "B",
  },
  {
    front:
      "14) Which of the following can be effective in preventing the onset of viral infection in humans? A) taking vitamins B) getting vaccinated C) taking antibiotics D) applying antiseptics E) taking nucleoside analogs that inhibit transcription",
    back: "B",
  },
  {
    front:
      "15) Which of the following describes plant virus infections? A) They can be controlled by the use of antibiotics. B) They are spread via the plasmodesmata. C) They have little effect on plant growth. D) They are seldom spread by insects. E) They can never be passed vertically.",
    back: "B",
  },
  {
    front:
      "16) Which of the following represents a difference between viruses and viroids? A) Viruses infect many types of cells, whereas viroids infect only prokaryotic cells. B) Viruses have capsids composed of protein, whereas viroids have no capsids. C) Viruses contain introns, whereas viroids have only exons. D) Viruses always have genomes composed of DNA, whereas viroids always have genomes composed of RNA. E) Viruses cannot pass through plasmodesmata, whereas viroids can.",
    back: "B",
  },
  {
    front:
      "17) The difference between vertical and horizontal transmission of plant viruses is that A) vertical transmission is transmission of a virus from a parent plant to its progeny, and horizontal transmission is one plant spreading the virus to another plant. B) vertical transmission is the spread of viruses from upper leaves to lower leaves of the plant, and horizontal transmission is the spread of a virus among leaves at the same general level. C) vertical transmission is the spread of viruses from trees and tall plants to bushes and other smaller plants, and horizontal transmission is the spread of viruses among plants of similar size. D) vertical transmission is the transfer of DNA from one type of plant virus to another, and horizontal transmission is the exchange of DNA between two plant viruses of the same type. E) vertical transmission is the transfer of DNA from a plant of one species to a plant of a different species, and horizontal transmission is the spread of viruses among plants of the same species.",
    back: "A",
  },
  {
    front:
      "18) What are prions? A) mobile segments of DNA B) tiny molecules of RNA that infect plants C) viral DNA that has had to attach itself to the host genome D) misfolded versions of normal brain protein E) viruses that invade bacteria",
    back: "D",
  },
  {
    front:
      "19) Which of the following is the best predictor of how much damage a virus causes? A) ability of the infected cell to undergo normal cell division B) ability of the infected cell to carry on translation C) whether the infected cell produces viral protein D) whether the viral mRNA can be transcribed E) how much toxin the virus produces",
    back: "A",
  },
  {
    front:
      "20) Antiviral drugs that have become useful are usually associated with which of the following properties? A) ability to remove all viruses from the infected host B) interference with viral replication C) prevention of the host from becoming infected D) removal of viral proteins E) removal of viral mRNAs",
    back: "B",
  },
  {
    front:
      "21) Which of the following series best reflects what we know about how the flu virus moves between species? A) An avian flu virus undergoes several mutations and rearrangements such that it is able to be transmitted to other birds and then to humans. B) The flu virus in a pig is mutated and replicated in alternate arrangements so that humans who eat the pig products can be infected. C) A flu virus from a human epidemic or pandemic infects birds; the birds replicate the virus differently and then pass it back to humans. D) An influenza virus gains new sequences of DNA from another virus, such as a herpesvirus; this enables it to be transmitted to a human host. E) An animal such as a pig is infected with more than one virus, genetic recombination occurs, the new virus mutates and is passed to a new species such as a bird, the virus mutates and can be transmitted to humans.",
    back: "E",
  },
  {
    front:
      "22) Which of the following is the most probable fate of a newly emerging virus that causes high mortality in its host? A) It is able to spread to a large number of new hosts quickly because the new hosts have no immunological memory of them. B) The new virus replicates quickly and undergoes rapid adaptation to a series of divergent hosts. C) A change in environmental conditions such as weather patterns quickly forces the new virus to invade new areas. D) Sporadic outbreaks will be followed almost immediately by a widespread pandemic. E) The newly emerging virus will die out rather quickly or will mutate to be far less lethal.",
    back: "E",
  },
  {
    front:
      "card image 23) Which of the three types of viruses shown above would you expect to include glycoproteins? A) I only B) II only C) III only D) I and II only E) all three",
    back: "D",
  },
  {
    front:
      "card image 24) Which of the three types of viruses shown above would you expect to include a capsid(s)? A) I only B) II only C) III only D) I and II only E) all three",
    back: "E",
  },
  {
    front:
      "card image 25) In the figure, at the arrow marked II, what enzyme(s) are being utilized? A) reverse transcriptase B) viral DNA polymerase C) host cell DNA polymerase D) host cell RNA polymerase E) host cell DNA and RNA polymerases",
    back: "C",
  },
  {
    front:
      "card image 26) In the figure, when new viruses are being assembled (IV), what mediates the assembly? A) host cell chaperones B) assembly proteins coded for by the host nucleus C) assembly proteins coded for by the viral genes D) viral RNA intermediates E) nothing; they self-assemble",
    back: "E",
  },
  {
    front:
      "card image 27) A linear piece of viral DNA of 8 kb can be cut with either of two restriction enzymes (X or Y). These are subjected to electrophoresis and produce the following bands:   (SEE IMAGE PART ONE)   Cutting the same 8 kb piece with both enzymes together results in bands at 4.0, 2.5, 1.0, and 0.5. Of the possible arrangements of the sites given below, which one is most likely?   A. SEE IMAGE B. SEE IMAGE C. SEE IMAGE D. SEE IMAGE E. SEE IMAGE",
    back: "B",
  },
  {
    front:
      "Some viruses can be crystallized and their structures analyzed. One such virus is Desmodium, or yellow mottle virus, which infects beans. This is a member of the tymovirus group and has a single-stranded RNA genome of ~6,300 nucleotides. Its virion is 25\u201430 nm in diameter, and is made up of 180 copies of a single capsid protein that self-associate to form each capsomere, which has icosahedral symmetry with 20 facets.   28) If this virus has capsomeres with 20 facets, how many proteins form each one? A) 1 B) 5 C) ~6 D) ~20 E) ~180",
    back: "C",
  },
  {
    front:
      "Some viruses can be crystallized and their structures analyzed. One such virus is Desmodium, or yellow mottle virus, which infects beans. This is a member of the tymovirus group and has a single-stranded RNA genome of ~6,300 nucleotides. Its virion is 25\u201430 nm in diameter, and is made up of 180 copies of a single capsid protein that self-associate to form each capsomere, which has icosahedral symmetry with 20 facets.   29) How many nucleotides of the genome would you expect to find in one capsid? A) 1 B) ~6 C) ~20 D) ~180 E) ~6,300",
    back: "E",
  },
  {
    front:
      "Some viruses can be crystallized and their structures analyzed. One such virus is Desmodium, or yellow mottle virus, which infects beans. This is a member of the tymovirus group and has a single-stranded RNA genome of ~6,300 nucleotides. Its virion is 25\u201430 nm in diameter, and is made up of 180 copies of a single capsid protein that self-associate to form each capsomere, which has icosahedral symmetry with 20 facets.   30) If this virus has a positive RNA strand as its genome, it begins the infection by using this strand as mRNA. Therefore, which of the following do you expect to be able to measure? A) replication rate B) transcription rate C) translation rate D) accumulation of new ribosomes E) formation of new transcription factors",
    back: "C",
  },
  {
    front:
      "Some viruses can be crystallized and their structures analyzed. One such virus is Desmodium, or yellow mottle virus, which infects beans. This is a member of the tymovirus group and has a single-stranded RNA genome of ~6,300 nucleotides. Its virion is 25\u201430 nm in diameter, and is made up of 180 copies of a single capsid protein that self-associate to form each capsomere, which has icosahedral symmetry with 20 facets.   31) In a cell-free system, what other components would you have to provide for this virus to express its genes? A) ribosomes, tRNAs and amino acids B) ribosomes, tRNAs, amino acids, and GTP C) RNA nucleotides and GTP D) RNA nucleotides, RNA polymerase, and GTP E) bean cell enzymes",
    back: "B",
  },
  {
    front:
      "Poliovirus is a positive-sense RNA virus of the picornavirus group. At its 5' end, the RNA genome has a viral protein (VPg) instead of a 5' cap. This is followed by a nontranslated leader sequence, and then a single long protein coding region (~7,000 nucleotides), followed by a poly-A tail. Observations were made that used radioactive amino acid analogues. Short period use of the radioactive amino acids result in labeling of only very long proteins, while longer periods of labeling result in several different short polypeptides.   32) What part of the poliovirus would first interact with host cell ribosomes to mediate translation? A) the poly-A tail B) the leader sequence C) the VPg protein D) the AUG in the leader sequence E) the AUG at the start of the coding sequence",
    back: "C",
  },
  {
    front:
      "Poliovirus is a positive-sense RNA virus of the picornavirus group. At its 5' end, the RNA genome has a viral protein (VPg) instead of a 5' cap. This is followed by a nontranslated leader sequence, and then a single long protein coding region (~7,000 nucleotides), followed by a poly-A tail. Observations were made that used radioactive amino acid analogues. Short period use of the radioactive amino acids result in labeling of only very long proteins, while longer periods of labeling result in several different short polypeptides.   33) What conclusion is most consistent with the results of the radioactive labeling experiment? A) The host cell cannot translate viral protein with the amino acid analogues. B) Host cell ribosomes only translate the viral code into short polypeptides. C) The RNA is only translated into a single long polypeptide, which is then cleaved into shorter ones. D) The RNA is translated into short polypeptides, which are subsequently assembled into large ones. E) The large radioactive polypeptides are coded by the host, whereas the short ones are coded for by the virus.",
    back: "C",
  },
  {
    front:
      "card image In 1971, David Baltimore described a scheme for classifying viruses based on how the virus produces mRNA.   The table below shows the results of testing five viruses for nuclease specificity, the ability of the virus to act as an mRNA, and presence (+) or absence (-) of its own viral polymerase (SEE IMAGE)   34) Given Baltimore's scheme, a positive sense single-stranded RNA virus such as the polio virus would be most closely related to which of the following? A) T-series bacteriophages B) retroviruses that require a DNA intermediate C) single-stranded DNA viruses such as herpes viruses D) nonenveloped double-stranded RNA viruses E) linear double-stranded DNA viruses such as adenoviruses",
    back: "B",
  },
  {
    front:
      "card image In 1971, David Baltimore described a scheme for classifying viruses based on how the virus produces mRNA.   The table below shows the results of testing five viruses for nuclease specificity, the ability of the virus to act as an mRNA, and presence (+) or absence (-) of its own viral polymerase (SEE IMAGE)   35) Based on the above table, which virus meets the Baltimore requirements for a retrovirus? A) A B) B C) C D) D E) E",
    back: "D",
  },
  {
    front:
      "card image In 1971, David Baltimore described a scheme for classifying viruses based on how the virus produces mRNA.   The table below shows the results of testing five viruses for nuclease specificity, the ability of the virus to act as an mRNA, and presence (+) or absence (-) of its own viral polymerase (SEE IMAGE)   36) Based on the above table, which virus meets the requirements for a bacteriophage? A) A B) B C) C D) D E) E",
    back: "A",
  },
  {
    front:
      "You isolate an infectious substance that is capable of causing disease in plants, but you do not know whether the infectious agent is a bacterium, virus, viroid, or prion. You have four methods at your disposal that you can use to analyze the substance in order to determine the nature of the infectious agent.   I. treating the substance with nucleases that destroy all nucleic acids and then determining whether it is still infectious II. filtering the substance to remove all elements smaller than what can be easily seen under a light microscope III. culturing the substance by itself on nutritive medium, away from any plant cells IV. treating the sample with proteases that digest all proteins and then determining whether it is still infectious   37) Which treatment could definitively determine whether or not the component is a viroid? A) I B) II C) III D) IV E) first II and then III",
    back: "A",
  },
  {
    front:
      "You isolate an infectious substance that is capable of causing disease in plants, but you do not know whether the infectious agent is a bacterium, virus, viroid, or prion. You have four methods at your disposal that you can use to analyze the substance in order to determine the nature of the infectious agent.   I. treating the substance with nucleases that destroy all nucleic acids and then determining whether it is still infectious II. filtering the substance to remove all elements smaller than what can be easily seen under a light microscope III. culturing the substance by itself on nutritive medium, away from any plant cells IV. treating the sample with proteases that digest all proteins and then determining whether it is still infectious   38) If you already knew that the infectious agent was either bacterial or viral, which treatment would allow you to distinguish between these two possibilities? A) I B) II C) III D) IV E) either II or IV",
    back: "C",
  },
  {
    front:
      "You isolate an infectious substance that is capable of causing disease in plants, but you do not know whether the infectious agent is a bacterium, virus, viroid, or prion. You have four methods at your disposal that you can use to analyze the substance in order to determine the nature of the infectious agent.   I. treating the substance with nucleases that destroy all nucleic acids and then determining whether it is still infectious II. filtering the substance to remove all elements smaller than what can be easily seen under a light microscope III. culturing the substance by itself on nutritive medium, away from any plant cells IV. treating the sample with proteases that digest all proteins and then determining whether it is still infectious   39) Which treatment would you use to determine if the agent is a prion? A) I only B) II only C) III only D) IV only E) either I or IV",
    back: "D",
  },
  {
    front:
      "The herpes viruses are very important enveloped DNA viruses that cause disease in all vertebrate species and in some invertebrates such as oysters. Some of the human ones are herpes simplex (HSV) I and II, causing facial and genital lesions, and the varicella-zoster (VSV), causing chicken pox and shingles. Each of these three actively infect nervous tissue. Primary infections are fairly mild, but the virus is not then cleared from the host; rather, viral genomes are maintained in cells in a latent phase. The virus can then reactivate, replicate again, and be infectious to others.   40) If scientists are trying to use what they know about HSV to devise a means of protecting other people from being infected, which of the following would have the best chance of lowering the number of new cases of infection? A) vaccination of all persons with preexisting cases B) interference with new viral replication in preexisting cases C) treatment of the HSV lesions to shorten the breakout D) medication that destroys surface HSV before it gets to neurons E) education about avoiding sources of infection",
    back: "B",
  },
  {
    front:
      'The herpes viruses are very important enveloped DNA viruses that cause disease in all vertebrate species and in some invertebrates such as oysters. Some of the human ones are herpes simplex (HSV) I and II, causing facial and genital lesions, and the varicella-zoster (VSV), causing chicken pox and shingles. Each of these three actively infect nervous tissue. Primary infections are fairly mild, but the virus is not then cleared from the host; rather, viral genomes are maintained in cells in a latent phase. The virus can then reactivate, replicate again, and be infectious to others.   41) In electron micrographs of HSV infection, it can be seen that the intact virus initially reacts with cell surface proteoglycans, then with specific receptors. This is later followed by viral capsids docking with nuclear pores. Afterward, the capsids go from being full to being "empty." Which of the following best fits these observations? A) Viral capsids are needed for the cell to become infected; only the capsids enter the nucleus. B) The viral envelope is not required for infectivity, since the envelope does not enter the nucleus. C) Only the genetic material of the virus is involved in the cell\'s infectivity, and is injected like the genome of a phage. D) The viral envelope mediates entry into the cell, the capsid entry into the nuclear membrane, and the genome is all that enters the nucleus. E) The viral capsid mediates entry into the cell, and only the genomic DNA enters the nucleus, where it may or may not replicate.',
    back: "D",
  },
  {
    front:
      "The herpes viruses are very important enveloped DNA viruses that cause disease in all vertebrate species and in some invertebrates such as oysters. Some of the human ones are herpes simplex (HSV) I and II, causing facial and genital lesions, and the varicella-zoster (VSV), causing chicken pox and shingles. Each of these three actively infect nervous tissue. Primary infections are fairly mild, but the virus is not then cleared from the host; rather, viral genomes are maintained in cells in a latent phase. The virus can then reactivate, replicate again, and be infectious to others.   42) In order to be able to remain latent in an infected live cell, HSV must be able to shut down what process? A) DNA replication B) transcription of viral genes C) apoptosis of a virally infected cell D) all immune responses E) interaction with histones",
    back: "C",
  },
  {
    front:
      "43) Which of the following characteristics, structures, or processes is common to both bacteria and viruses? A) metabolism B) ribosomes C) genetic material composed of nucleic acid D) cell division E) independent existence",
    back: "C",
  },
  {
    front:
      "44) Emerging viruses arise by A) mutation of existing viruses. B) the spread of existing viruses to new host species. C) the spread of existing viruses more widely within their host species. D) mutation of existing viruses, the spread of existing viruses to new host species, and the spread of existing viruses more widely within their host species. E) none of these.",
    back: "D",
  },
  {
    front:
      "45) To cause a human pandemic, the H5N1 avian flu virus would have to A) spread to primates such as chimpanzees. B) develop into a virus with a different host range. C) become capable of human-to-human transmission. D) arise independently in chickens in North and South America. E) become much more pathogenic.",
    back: "C",
  },
  {
    front:
      "46) A bacterium is infected with an experimentally constructed bacteriophage composed of the T2 phage protein coat and T4 phage DNA. The new phages produced would have A) T2 protein and T4 DNA. B) T2 protein and T2 DNA. C) a mixture of the DNA and proteins of both phages. D) T4 protein and T4 DNA. E) T4 protein and T2 DNA.",
    back: "D",
  },
  {
    front:
      "47) RNA viruses require their own supply of certain enzymes because A) host cells rapidly destroy the viruses. B) host cells lack enzymes that can replicate the viral genome. C) these enzymes translate viral mRNA into proteins. D) these enzymes penetrate host cell membranes. E) these enzymes cannot be made in host cells.",
    back: "B",
  },
  {
    front:
      "1) Assume that you are trying to insert a gene into a plasmid. Someone gives you a preparation of genomic DNA that has been cut with restriction enzyme X. The gene you wish to insert has sites on both ends for cutting by restriction enzyme Y. You have a plasmid with a single site for Y, but not for X. Your strategy should be to A) insert the fragments cut with restriction enzyme X directly into the plasmid without cutting the plasmid. B) cut the plasmid with restriction enzyme X and insert the fragments cut with restriction enzyme Y into the plasmid. C) cut the DNA again with restriction enzyme Y and insert these fragments into the plasmid cut with the same enzyme. D) cut the plasmid twice with restriction enzyme Y and ligate the two fragments onto the ends of the DNA fragments cut with restriction enzyme X. E) cut the plasmid with restriction enzyme X and then insert the gene into the plasmid.",
    back: "C",
  },
  {
    front:
      '2) How does a bacterial cell protect its own DNA from restriction enzymes? A) by adding methyl groups to adenines and cytosines B) by using DNA ligase to seal the bacterial DNA into a closed circle C) by adding histones to protect the double-stranded DNA D) by forming "sticky ends" of bacterial DNA to prevent the enzyme from attaching E) by reinforcing the bacterial DNA structure with covalent phosphodiester bonds',
    back: "A",
  },
  {
    front:
      "3) What is the most logical sequence of steps for splicing foreign DNA into a plasmid and inserting the plasmid into a bacterium?   I. Transform bacteria with a recombinant DNA molecule. II. Cut the plasmid DNA using restriction enzymes. III. Extract plasmid DNA from bacterial cells. IV. Hydrogen-bond the plasmid DNA to nonplasmid DNA fragments. V. Use ligase to seal plasmid DNA to nonplasmid DNA.   A) I, II, IV, III, V B) II, III, V, IV, I C) III, II, IV, V, I D) III, IV, V, I, II E) IV, V, I, II, III",
    back: "C",
  },
  {
    front:
      "4) A principal problem with inserting an unmodified mammalian gene into a BAC, and then getting that gene expressed in bacteria, is that A) prokaryotes use a different genetic code from that of eukaryotes. B) bacteria translate polycistronic messages only. C) bacteria cannot remove eukaryotic introns. D) bacterial RNA polymerase cannot make RNA complementary to mammalian DNA. E) bacterial DNA is not found in a membrane-bounded nucleus and is therefore incompatible with mammalian DNA.",
    back: "C",
  },
  {
    front:
      "5) A gene that contains introns can be made shorter (but remain functional) for genetic engineering purposes by using A) RNA polymerase to transcribe the gene. B) a restriction enzyme to cut the gene into shorter pieces. C) reverse transcriptase to reconstruct the gene from its mRNA. D) DNA polymerase to reconstruct the gene from its polypeptide product. E) DNA ligase to put together fragments of the DNA that code for a particular polypeptide.",
    back: "C",
  },
  {
    front:
      "6) Why are yeast cells frequently used as hosts for cloning? A) They easily form colonies. B) They can remove exons from mRNA. C) They do not have plasmids. D) They are eukaryotic cells. E) Only yeast cells allow the gene to be cloned.",
    back: "D",
  },
  {
    front:
      "7) The DNA fragments making up a genomic library are generally contained in A) BACs. B) recombinant viral RNA. C) individual wells. D) DNA-RNA hybrids. E) radioactive eukaryotic cells.",
    back: "A",
  },
  {
    front:
      "8) Yeast artificial chromosomes contain which of the following elements? A) centromeres only B) telomeres only C) origin of replication only D) centromeres and telomeres only E) centromeres, telomeres, and an origin of replication",
    back: "E",
  },
  {
    front:
      "9) Which of the following best describes the complete sequence of steps occurring during every cycle of PCR?   1. The primers hybridize to the target DNA. 2. The mixture is heated to a high temperature to denature the double-stranded target DNA. 3. Fresh DNA polymerase is added. 4. DNA polymerase extends the primers to make a copy of the target DNA.   A) 2, 1, 4 B) 1, 3, 2, 4 C) 3, 4, 1, 2 D) 3, 4, 2 E) 2, 3, 4",
    back: "A",
  },
  {
    front:
      "10) A researcher needs to clone a sequence of part of a eukaryotic genome in order to express the sequence and to modify the polypeptide product. She would be able to satisfy these requirements by using which of the following vectors? A) a bacterial plasmid B) BAC to accommodate the size of the sequence C) a modified bacteriophage D) a human chromosome E) a YAC with appropriate cellular enzymes",
    back: "E",
  },
  {
    front:
      "11) A student wishes to clone a sequence of DNA of ~200 kb. Which vector would be appropriate? A) a plasmid B) a typical bacteriophage C) a BAC D) a plant virus E) a large polypeptide",
    back: "C",
  },
  {
    front:
      '12) Sequencing an entire genome, such as that of C. elegans, a nematode, is most important because A) it allows researchers to use the sequence to build a "better" nematode, which is resistant to disease. B) it allows research on a group of organisms we do not usually care much about. C) the nematode is a good animal model for trying out cures for viral illness. D) a sequence that is found to have a particular function in the nematode is likely to have a closely related function in vertebrates. E) a sequence that is found to have no introns in the nematode genome is likely to have acquired the introns from higher organisms.',
    back: "D",
  },
  {
    front:
      "13) To introduce a particular piece of DNA into an animal cell, such as that of a mouse, you would find more probable success with which of the following methods? A) the shotgun approach B) electroporation followed by recombination C) introducing a plasmid into the cell D) infecting the mouse cell with a Ti plasmid E) transcription and translation",
    back: "B",
  },
  {
    front:
      "14) The major advantage of using artificial chromosomes such as YACs and BACs for cloning genes is that A) plasmids are unable to replicate in cells. B) only one copy of a plasmid can be present in any given cell, whereas many copies of a YAC or BAC can coexist in a single cell. C) YACs and BACs can carry much larger DNA fragments than ordinary plasmids can. D) YACs and BACs can be used to express proteins encoded by inserted genes, but plasmids cannot. E) All of these are correct.",
    back: "C",
  },
  {
    front:
      "15) Which of the following is used to make complementary DNA (cDNA) from RNA? A) restriction enzymes B) gene cloning C) DNA ligase D) gel electrophoresis E) reverse transcriptase",
    back: "E",
  },
  {
    front:
      "16) Why is it so important to be able to amplify DNA fragments when studying genes? A) DNA fragments are too small to use individually. B) A gene may represent only a millionth of the cell's DNA. C) Restriction enzymes cut DNA into fragments that are too small. D) A clone requires multiple copies of each gene per clone. E) It is important to have multiple copies of DNA in the case of laboratory error.",
    back: "B",
  },
  {
    front:
      "17) Pax-6 is a gene that is involved in eye formation in many invertebrates, such as Drosophila. Pax-6 is found as well in vertebrates. A Pax-6 gene from a mouse can be expressed in a fly and the protein (PAX-6) leads to a compound fly eye. This information suggests which of the following? A) Pax-6 genes are identical in nucleotide sequence. B) PAX-6 proteins have identical amino acid sequences. C) Pax-6 is highly conserved and shows shared evolutionary ancestry. D) PAX-6 proteins are different for formation of different kinds of eyes. E) PAX-6 from a mouse can function in a fly, but a fly's Pax-6 gene cannot function in a mouse.",
    back: "C",
  },
  {
    front:
      "18) Why are BACs preferred today rather than bacteriophages for making genomic libraries? A) The BAC carries more DNA. B) The BAC can carry entire genes and their regulatory elements. C) Larger BACs are easier to store. D) The BAC can carry entire genes and their regulatory elements, and larger BACs are easier to store. E) The BAC carries more DNA, the BAC can carry entire genes and their regulatory elements, and larger BACs are easier to store.",
    back: "E",
  },
  {
    front:
      "19) The reason for using Taq polymerase for PCR is that A) it is heat stable and can withstand the temperature changes of the cycler. B) only minute amounts are needed for each cycle of PCR. C) it binds more readily than other polymerases to primer. D) it has regions that are complementary to primers. E) All of these are correct.",
    back: "A",
  },
  {
    front:
      "20) Why might a laboratory be using dideoxy nucleotides? A) to separate DNA fragments B) to clone the breakpoints of cut DNA C) to produce cDNA from mRNA D) to sequence a DNA fragment E) to visualize DNA expression",
    back: "D",
  },
  {
    front:
      "21) In order to identify a specific restriction fragment using a probe, what must be done? A) The fragments must be separated by electrophoresis. B) The fragments must be treated with heat or chemicals to separate the strands of the double helix. C) The probe must be hybridized with the fragment. D) The fragments must be separated by electrophoresis and the fragments must be treated with heat or chemicals to separate the strands of the double helix. E) The fragments must be separated by electrophoresis, the fragments must be treated with heat or chemicals to separate the strands of the double helix, and the probe must be hybridized with the fragment.",
    back: "E",
  },
  {
    front:
      "22) Which of the following modifications is least likely to alter the rate at which a DNA fragment moves through a gel during electrophoresis? A) altering the nucleotide sequence of the DNA fragment B) methylating the cytosine bases within the DNA fragment C) increasing the length of the DNA fragment D) decreasing the length of the DNA fragment E) neutralizing the negative charges within the DNA fragment",
    back: "A",
  },
  {
    front:
      "23) DNA fragments from a gel are transferred to a nitrocellulose paper during the procedure called Southern blotting. What is the purpose of transferring the DNA from a gel to a nitrocellulose paper? A) to attach the DNA fragments to a permanent substrate B) to separate the two complementary DNA strands C) to transfer only the DNA that is of interest D) to prepare the DNA for digestion with restriction enzymes E) to separate out the PCRs",
    back: "A",
  },
  {
    front:
      "24) DNA microarrays have made a huge impact on genomic studies because they A) can be used to eliminate the function of any gene in the genome. B) can be used to introduce entire genomes into bacterial cells. C) allow the expression of many or even all of the genes in the genome to be compared at once. D) allow physical maps of the genome to be assembled in a very short time. E) dramatically enhance the efficiency of restriction enzymes.",
    back: "C",
  },
  {
    front:
      "25) Which of the following describes the transfer of polypeptide sequences to a membrane to analyze gene expression? A) Southern blotting B) Northern blotting C) Western blotting D) Eastern blotting E) RT-PCR",
    back: "C",
  },
  {
    front:
      "26) Which of the following uses reverse transcriptase to make cDNA followed by amplification? A) Southern blotting B) Northern blotting C) Western blotting D) Eastern blotting E) RT-PCR",
    back: "E",
  },
  {
    front:
      "27) RNAi methodology uses double-stranded pieces of RNA to trigger a breakdown or blocking of mRNA. For which of the following might it more possibly be useful? A) to raise the rate of production of a needed digestive enzyme B) to decrease the production from a harmful gain-of-function mutated gene C) to destroy an unwanted allele in a homozygous individual D) to form a knockout organism that will not pass the deleted sequence to its progeny E) to raise the concentration of a desired protein",
    back: "B",
  },
  {
    front:
      "28) A researcher has used in vitro mutagenesis to mutate a cloned gene and then has reinserted this into a cell. In order to have the mutated sequence disable the function of the gene, what must then occur? A) recombination resulting in replacement of the wild type with the mutated gene B) use of a microarray to verify continued expression of the original gene C) replication of the cloned gene using a bacterial plasmid D) transcription of the cloned gene using a BAC E) attachment of the mutated gene to an existing mRNA to be translated",
    back: "A",
  },
  {
    front:
      "29) Which of the following techniques used to analyze gene function depends on the specificity of DNA base complementarity? A) Northern blotting B) use of RNAi C) in vitro mutagenesis D) in situ hybridization E) restriction fragment analysis",
    back: "C",
  },
  {
    front:
      "30) Silencing of selected genes is often done using RNA interference (RNAi). Which of the following questions would not be answered with this process? A) What is the function of gene 432 in this species of annelid? B) What will happen in this insect's digestion if gene 173 is not able to be translated? C) Is gene HA292 responsible for this disorder in humans? D) Will the disabling of this gene in Drosophila and in a mouse cause similar results? E) Is the gene on Drosophila chromosome 2L at this locus responsible for part of its production of nitrogen waste?",
    back: "C",
  },
  {
    front:
      "31) In large scale, genome-wide association studies in humans, correlation is sought between A) lengthy sequences that might be shared by most members of a population. B) single nucleotide polymorphisms found only in persons with a particular disorder. C) single nucleotide polymorphisms found in families with a particular introns sequence. D) single nucleotide polymorphisms in two or more adjacent genes. E) large inversions that displace the centromere.",
    back: "B",
  },
  {
    front:
      "32) For a particular microarray assay (DNA chip), cDNA has been made from the mRNAs of a dozen patients' breast tumor biopsies. The researchers will be looking for A) a particular gene that is amplified in all or most of the patient samples. B) a pattern of fluorescence that indicates which cells are overproliferating. C) a pattern shared among some or all of the samples that indicates gene expression differing from control samples. D) a group of cDNAs that act differently from those on the rest of the grid. E) a group of cDNAs that match those in non-breast cancer control samples from the same population.",
    back: "C",
  },
  {
    front:
      "33) Which of the following is most closely identical to the formation of twins? A) cell cloning B) therapeutic cloning C) use of adult stem cells D) embryo transfer E) organismal cloning",
    back: "E",
  },
  {
    front:
      "34) In 1997, Dolly the sheep was cloned. Which of the following processes was used? A) use of mitochondrial DNA from adult female cells of another ewe B) replication and dedifferentiation of adult stem cells from sheep bone marrow C) separation of an early stage sheep blastula into separate cells, one of which was incubated in a surrogate ewe D) fusion of an adult cell's nucleus with an enucleated sheep egg, followed by incubation in a surrogate E) isolation of stem cells from a lamb embryo and production of a zygote equivalent",
    back: "D",
  },
  {
    front:
      "35) Which of the following problems with animal cloning might result in premature death of the clones? A) use of pluripotent instead of totipotent stem cells B) use of nuclear DNA as well as mtDNA C) abnormal regulation due to variant methylation D) the indefinite replication of totipotent stem cells E) abnormal immune function due to bone marrow dysfunction",
    back: "C",
  },
  {
    front:
      "36) Reproductive cloning of human embryos is generally considered unethical. However, on the subject of therapeutic cloning there is a wider divergence of opinion. Which of the following is a likely explanation? A) Use of adult stem cells is likely to produce more cell types than use of embryonic stem cells. B) Cloning to produce embryonic stem cells may lead to great medical benefits for many. C) Cloning to produce stem cells relies on a different initial procedure than reproductive cloning. D) A clone that lives until the blastocyst stage does not yet have human DNA. E) No embryos would be destroyed in the process of therapeutic cloning.",
    back: "B",
  },
  {
    front:
      "37) Which of the following is true of embryonic stem cells but not of adult stem cells? A) They can differentiate into many cell types. B) They make up the majority of cells of the tissue from which they are derived. C) They can continue to replicate for an indefinite period. D) They can provide enormous amounts of information about the process of gene regulation. E) One aim of using them is to provide cells for repair of diseased tissue.",
    back: "B",
  },
  {
    front:
      "38) A researcher is using adult stem cells and comparing them to other adult cells from the same tissue. Which of the following is a likely finding? A) The cells from the two sources exhibit different patterns of DNA methylation. B) Adult stem cells have more DNA nucleotides than their counterparts. C) The two kinds of cells have virtually identical gene expression patterns in microarrays. D) The nonstem cells have fewer repressed genes. E) The nonstem cells have lost the promoters for more genes.",
    back: "A",
  },
  {
    front:
      "39) In animals, what is the difference between reproductive cloning and therapeutic cloning? A) Reproductive cloning uses totipotent cells, whereas therapeutic cloning does not. B) Reproductive cloning uses embryonic stem cells, whereas therapeutic cloning does not. C) Therapeutic cloning uses nuclei of adult cells transplanted into enucleated nonfertilized eggs. D) Therapeutic cloning supplies cells for repair of diseased or injured organs.",
    back: "D",
  },
  {
    front:
      "40) The first cloned cat, called Carbon Copy, was a calico, but she looked significantly different from her female parent. Why? A) The environment, as well as genetics, affects phenotypic variation. B) Fur color genes in cats are influenced by differential acetylation patterns. C) Cloned animals have been found to have a higher frequency of transposon activation D) X inactivation in the embryo is random and produces different patterns. E) The telomeres of the parent's chromosomes were shorter than those of an embryo.",
    back: "D",
  },
  {
    front:
      "41) In recent times, it has been shown that adult cells can be induced to become pluripotent stem cells (iPS). In order to make this conversion, what has been done to the adult cells? A) A retrovirus is used to introduce four specific regulatory genes. B) The adult stem cells must be fused with embryonic cells. C) Cytoplasm from embryonic cells is injected into the adult cells. D) An adenovirus vector is used to transfer embryonic gene products into adult cells. E) The nucleus of an embryonic cell is used to replace the nucleus of an adult cell.",
    back: "A",
  },
  {
    front:
      "42) Let us suppose that someone is successful at producing induced pluripotent stem cells (iPS) for replacement of pancreatic insulin-producing cells for people with type 1 diabetes. Which of the following could still be problems?   I. the possibility that, once introduced into the patient, the iPS cells produce nonpancreatic cells II. the failure of the iPS cells to take up residence in the pancreas III. the inability of the iPS cells to respond to appropriate regulatory signals   A) I only B) II only C) III only D) I and II E) all of them",
    back: "E",
  },
  {
    front:
      "43) Genetic engineering is being used by the pharmaceutical industry. Which of the following is not currently one of the uses   A) production of human insulin   B) production of human growth hormone   C) production of tissue plasminogen activator   D) genetic modification of plants to produce vaccines   E) creation of products that will remove poisons from the human body",
    back: "E",
  },
  {
    front:
      "44) Genetically engineered plants A) are more difficult to engineer than animals. B) include a transgenic rice plant that can help prevent vitamin A deficiency. C) are being rapidly developed, but traditional plant breeding programs are still the only method used to develop new plants. D) are able to fix nitrogen themselves. E) are banned throughout the world.",
    back: "B",
  },
  {
    front:
      "45) Scientists developed a set of guidelines to address the safety of DNA technology. Which of the following is one of the adopted safety measures? A) Microorganisms used in recombinant DNA experiments are genetically crippled to ensure that they cannot survive outside of the laboratory. B) Genetically modified organisms are not allowed to be part of our food supply. C) Transgenic plants are engineered so that the plant genes cannot hybridize. D) Experiments involving HIV or other potentially dangerous viruses have been banned. E) Recombinant plasmids cannot be replicated.",
    back: "A",
  },
  {
    front:
      "46) One successful form of gene therapy has involved delivery of an allele for the enzyme adenosine deaminase (ADA) to bone marrow cells of a child with SCID, and delivery of these engineered cells back to the bone marrow of the affected child. What is one major reason for the success of this procedure as opposed to many other efforts at gene therapy? A) The engineered bone marrow cells from this patient can be used for any other SCID patient. B) The ADA-introduced allele causes all other ADA-negative cells to die. C) The engineered cells, when reintroduced into the patient, find their way back to the bone marrow. D) No vector is required to introduce the allele into ADA-negative cells. E) The immune system fails to recognize cells with the variant gene.",
    back: "C",
  },
  {
    front:
      "47) Which of the following is one of the technical reasons why gene therapy is problematic? A) Most cells with an engineered gene do not produce gene product. B) Most cells with engineered genes overwhelm other cells in a tissue. C) Cells with transferred genes are unlikely to replicate. D) Transferred genes may not have appropriately controlled activity. E) mRNA from transferred genes cannot be translated.",
    back: "D",
  },
  {
    front:
      "48) As genetic technology makes testing for a wide variety of genotypes possible, which of the following is likely to be an increasingly troublesome issue? A) use of genotype information to provide positive identification of criminals B) using technology to identify genes that cause criminal behaviors C) the need to legislate for the protection of the privacy of genetic information D) discrimination against certain racial groups because of major genetic differences E) alteration of human phenotypes to prevent early disease",
    back: "C",
  },
  {
    front:
      "card image 49) Which enzyme was used to produce the molecule in Figure 20.1? A) ligase B) transcriptase C) a restriction enzyme D) RNA polymerase E) DNA polymerase",
    back: "C",
  },
  {
    front:
      "card image 50) The segment of DNA shown in Figure 20.2 has restriction sites I and II, which create restriction fragments A, B, and C. Which of the gels produced by electrophoresis shown below best represents the separation and identity of these fragments? SEE IMAGE FOR FIGURE   A. SEE IMAGE B. SEE IMAGE C. SEE IMAGE D. SEE IMAGE E. SEE IMAGE",
    back: "B",
  },
  {
    front:
      "card image The DNA profiles that follow represent four different individuals.   51) Which of the following statements is consistent with the results? A) B is the child of A and C. B) C is the child of A and B. C) D is the child of B and C. D) A is the child of B and C. E) A is the child of C and D.",
    back: "B",
  },
  {
    front:
      "card image 52) Which of the following statements is most likely true? A) D is the child of A and C. B) D is the child of A and B. C) D is the child of B and C. D) A is the child of C and D. E) B is the child of A and C.",
    back: "B",
  },
  {
    front:
      "card image 53) Which of the following are probably siblings? A) A and B B) A and C C) A and D D) C and D E) B and D",
    back: "D",
  },
  {
    front:
      'A eukaryotic gene has "sticky ends" produced by the restriction endonuclease EcoRI. The gene is added to a mixture containing EcoRI and a bacterial plasmid that carries two genes conferring resistance to ampicillin and tetracycline. The plasmid has one recognition site for EcoRI located in the tetracycline resistance gene. This mixture is incubated for several hours, exposed to DNA ligase, and then added to bacteria growing in nutrient broth. The bacteria are allowed to grow overnight and are streaked on a plate using a technique that produces isolated colonies that are clones of the original. Samples of these colonies are then grown in four different media: nutrient broth plus ampicillin, nutrient broth plus tetracycline, nutrient broth plus ampicillin and tetracycline, and nutrient broth without antibiotics.   54) Bacteria that contain the plasmid, but not the eukaryotic gene, would grow A) in the nutrient broth plus ampicillin, but not in the broth containing tetracycline. B) only in the broth containing both antibiotics. C) in the broth containing tetracycline, but not in the broth containing ampicillin. D) in all four types of broth. E) in the nutrient broth without antibiotics only.',
    back: "D",
  },
  {
    front:
      'A eukaryotic gene has "sticky ends" produced by the restriction endonuclease EcoRI. The gene is added to a mixture containing EcoRI and a bacterial plasmid that carries two genes conferring resistance to ampicillin and tetracycline. The plasmid has one recognition site for EcoRI located in the tetracycline resistance gene. This mixture is incubated for several hours, exposed to DNA ligase, and then added to bacteria growing in nutrient broth. The bacteria are allowed to grow overnight and are streaked on a plate using a technique that produces isolated colonies that are clones of the original. Samples of these colonies are then grown in four different media: nutrient broth plus ampicillin, nutrient broth plus tetracycline, nutrient broth plus ampicillin and tetracycline, and nutrient broth without antibiotics.   55) Bacteria containing a plasmid into which the eukaryotic gene has integrated would grow in A) the nutrient broth only. B) the nutrient broth and the tetracycline broth only. C) the nutrient broth, the ampicillin broth, and the tetracycline broth. D) all four types of broth. E) the ampicillin broth and the nutrient broth.',
    back: "E",
  },
  {
    front:
      'A eukaryotic gene has "sticky ends" produced by the restriction endonuclease EcoRI. The gene is added to a mixture containing EcoRI and a bacterial plasmid that carries two genes conferring resistance to ampicillin and tetracycline. The plasmid has one recognition site for EcoRI located in the tetracycline resistance gene. This mixture is incubated for several hours, exposed to DNA ligase, and then added to bacteria growing in nutrient broth. The bacteria are allowed to grow overnight and are streaked on a plate using a technique that produces isolated colonies that are clones of the original. Samples of these colonies are then grown in four different media: nutrient broth plus ampicillin, nutrient broth plus tetracycline, nutrient broth plus ampicillin and tetracycline, and nutrient broth without antibiotics.   56) Bacteria that do not take up any plasmids would grow on which media? A) the nutrient broth only B) the nutrient broth and the tetracycline broth C) the nutrient broth and the ampicillin broth D) the tetracycline broth and the ampicillin broth E) all three broths',
    back: "A",
  },
  {
    front:
      "A group of six students has taken samples of their own cheek cells, purified the DNA, and used a restriction enzyme known to cut at zero, one, or two sites in a particular gene of interest.   57) Why might they be conducting such an experiment? A) to find the location of this gene in the human genome B) to prepare to isolate the chromosome on which the gene of interest is found C) to find which of the students has which alleles D) to collect population data that can be used to assess natural selection E) to collect population data that can be used to study genetic drift",
    back: "C",
  },
  {
    front:
      "A group of six students has taken samples of their own cheek cells, purified the DNA, and used a restriction enzyme known to cut at zero, one, or two sites in a particular gene of interest.   58) Their next two steps, in order, should be A) use of a fluorescent probe for the gene sequence, then electrophoresis. B) electrophoresis of the fragments followed by autoradiography. C) electrophoresis of the fragments, followed by the use of a probe. D) use of a ligase that will anneal the pieces, followed by Southern blotting. E) use of reverse transcriptase to make cDNA, followed by electrophoresis.",
    back: "C",
  },
  {
    front:
      'A group of six students has taken samples of their own cheek cells, purified the DNA, and used a restriction enzyme known to cut at zero, one, or two sites in a particular gene of interest.   59) Analysis of the data obtained shows that two students each have two fragments, two students each have three fragments, and two students each have one only. What does this demonstrate? A) Each pair of students has a different gene for this function. B) The two students who have two fragments have one restriction site in this region. C) The two students who have two fragments have two restriction sites within this gene. D) The students with three fragments are said to have "fragile sites." E) Each of these students is heterozygous for this gene.',
    back: "B",
  },
  {
    front:
      "CML (chronic myelogenous leukemia) results from a translocation between human chromosomes 9 and 22. The resulting chromosome 22 is significantly shorter than usual, and it is known as a Philadelphia (Ph') chromosome. The junction at the site of the translocation causes overexpression of a thymine kinase receptor. A new drug (Gleevec or imatinib) has been found to inhibit the disease if the patient is treated early.   60) Which of the following would be a reasonably efficient technique for confirming the diagnosis of CML? A) searching for the number of telomeric sequences on chromosome 22 B) looking for a Ph' chromosome in a peripheral blood smear C) enzyme assay for thymine kinase activity D) FISH study to determine the chromosomal location of all chromosome 22 fragments E) identification of the disease phenotype in review of the patient's records",
    back: "D",
  },
  {
    front:
      "CML (chronic myelogenous leukemia) results from a translocation between human chromosomes 9 and 22. The resulting chromosome 22 is significantly shorter than usual, and it is known as a Philadelphia (Ph') chromosome. The junction at the site of the translocation causes overexpression of a thymine kinase receptor. A new drug (Gleevec or imatinib) has been found to inhibit the disease if the patient is treated early.   61) Why would Gleevec most probably cause remission of the disease? A) It reverses the chromosomal translocation. B) It eliminates the Ph' chromosome. C) It removes Ph'-containing progenitor cells. D) The drug inhibits the replication of the affected chromosome. E) The drug inhibits the specific thymine kinase receptor.",
    back: "E",
  },
  {
    front:
      "CML (chronic myelogenous leukemia) results from a translocation between human chromosomes 9 and 22. The resulting chromosome 22 is significantly shorter than usual, and it is known as a Philadelphia (Ph') chromosome. The junction at the site of the translocation causes overexpression of a thymine kinase receptor. A new drug (Gleevec or imatinib) has been found to inhibit the disease if the patient is treated early.   62) One possible use of transgenic plants is in the production of human proteins, such as vaccines. Which of the following is a possible hindrance that must be overcome? A) prevention of transmission of plant allergens to the vaccine recipients B) prevention of vaccine-containing plants being consumed by insects C) use of plant cells to translate non-plant-derived mRNA D) inability of the human digestive system to accept plant-derived protein E) the need to cook all such plants before consuming them",
    back: "A",
  },
  {
    front:
      "Pharmacogenetics is an increasingly important discipline that uses genetic information to tailor the prescription of drug treatments to individuals. In the case of chemotherapy for breast cancer, for example, different patients need and/or respond to different treatments.   63) Patients whose tumors are HER-2 positive respond to herceptin whereas other patients do not. Patients whose tumors have estrogen receptors will be best served if A) their estrogen receptors are blocked by using RNAi. B) their estrogen release is activated and/or elevated. C) the estrogen receptors are blocked by other molecules that can use the same receptors. D) they are given herceptin as well as estrogen. E) they are given a complete hysterectomy.",
    back: "C",
  },
  {
    front:
      "Pharmacogenetics is an increasingly important discipline that uses genetic information to tailor the prescription of drug treatments to individuals. In the case of chemotherapy for breast cancer, for example, different patients need and/or respond to different treatments.   64) Breast tumor biopsy specimens can be typed for a number of gene expression patterns. Together, these can provide risk analysis for the likely aggressive growth and metastasis of the tumor. How can this most help the physician and patient? A) Some patients want to know as much as possible. B) This can help them to decide whether and what kind of chemotherapy is warranted. C) This can help them decide whether the tumor should be removed. D) Some physicians may use the information to decide what to do, but not tell the patient. E) This can help to aggregate health statistics.",
    back: "B",
  },
  {
    front:
      "65) Which of the following tools of recombinant DNA technology is incorrectly paired with its use? A) restriction enzymeanalysis of RFLPs B) DNA ligasecutting DNA, creating sticky ends of restriction fragments C) DNA polymerasepolymerase chain reaction to amplify sections of DNA D) reverse transcriptaseproduction of cDNA from mRNA E) electrophoresisseparation of DNA fragments",
    back: "B",
  },
  {
    front:
      "66) Plants are more readily manipulated by genetic engineering than are animals because A) plant genes do not contain introns. B) more vectors are available for transferring recombinant DNA into plant cells. C) a somatic plant cell can often give rise to a complete plant. D) genes can be inserted into plant cells by microinjection. E) plant cells have larger nuclei.",
    back: "C",
  },
  {
    front:
      "67) A paleontologist has recovered a bit of tissue from the 400-year-old preserved skin of an extinct dodo (a bird). To compare a specific region of the DNA from the sample with DNA from living birds, which of the following would be most useful for increasing the amount of dodo DNA available for testing? A) RFLP analysis B) polymerase chain reaction (PCR) C) electroporation D) gel electrophoresis E) Southern blotting",
    back: "B",
  },
  {
    front:
      "68) DNA technology has many medical applications. Which of the following is not done routinely at present? A) production of hormones for treating diabetes and dwarfism B) production of microbes that can metabolize toxins C) introduction of genetically engineered genes into human gametes D) prenatal identification of genetic disease alleles E) genetic testing for carriers of harmful alleles",
    back: "C",
  },
  {
    front:
      "69) In recombinant DNA methods, the term vector can refer to A) the enzyme that cuts DNA into restriction fragments. B) the sticky end of a DNA fragment. C) a SNP marker. D) a plasmid used to transfer DNA into a living cell. E) a DNA probe used to identify a particular gene.",
    back: "D",
  },
  {
    front:
      "70) Which of the following would not be true of cDNA produced using human brain tissue as the starting material? A) It could be amplified by the polymerase chain reaction. B) It could be used to create a complete genomic library. C) It was produced from mRNA using reverse transcriptase. D) It could be used as a probe to detect genes expressed in the brain. E) It lacks the introns of the human genes.",
    back: "B",
  },
  {
    front:
      "71) Expression of a cloned eukaryotic gene in a bacterial cell involves many challenges. The use of mRNA and reverse transcriptase is part of a strategy to solve the problem of A) post-transcriptional processing. B) electroporation. C) post-translational processing. D) nucleic acid hybridization. E) restriction fragment ligation.",
    back: "A",
  },
  {
    front:
      "72) Which of the following sequences in double-stranded DNA is most likely to be recognized as a cutting site for a restriction enzyme?   A) AAGG TTCC   B) AGTC TCAG   C) GGCC CCGG   D) ACCA TGGT   E) AAAA TTTT",
    back: "C",
  },
];

export async function upsertFlashcard(front: string, back: string) {
  const embeding = await generateEmbedding(front);
  console.log("Embedding generated for", front);
  await db
    .insert(easyNoteCard)
    .values({
      front,
      back,
      embedding: embeding,
    })
    .onConflictDoUpdate({
      target: easyNoteCard.id,
      set: {
        front,
        back,
        embedding: embeding,
      },
    });
}

async function seedFlashcards() {
  for (const flashcard of flashcards) {
    await upsertFlashcard(flashcard.front, flashcard.back);
  }
}

await seedFlashcards();
