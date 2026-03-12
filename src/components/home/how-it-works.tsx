// "use client";

// import { motion } from "framer-motion";
// import { BriefcaseBusiness, User } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Separator } from "../ui/separator";

// const jobSeekerSteps = [
//   {
//     id: "j1",
//     number: "1",
//     title: "Create Job Seeker Account",
//     description:
//       "Sign up quickly with your professional email address or using OAuth",
//   },
//   {
//     id: "j2",
//     number: "2",
//     title: "Upload Your Resume",
//     description: "Add your resume and let employers discover your skills",
//   },
//   {
//     id: "j3",
//     number: "3",
//     title: "Apply & Track",
//     description: "Submit applications and monitor your progress easily",
//   },
// ];

// const employerSteps = [
//   {
//     id: "e1",
//     number: "1",
//     title: "Create Employer Account",
//     description:
//       "Sign up quickly with your professional email address or using OAuth",
//   },
//   {
//     id: "e2",
//     number: "2",
//     title: "Post Job Openings",
//     description: "Create detailed listings that attract quality candidates",
//   },
//   {
//     id: "e3",
//     number: "3",
//     title: "Manage Candidates",
//     description: "Review applications and connect with potential hires",
//   },
// ];

// interface ReusableCardProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   steps: {
//     id: string;
//     number: string;
//     title: string;
//     description: string;
//   }[];
// }

// function ReusableCard({ icon, title, description, steps }: ReusableCardProps) {
//   return (
//     <Card className="shadow-none!">
//       <CardHeader className="flex items-center gap-4">
//         <div className="relative bg-brand/10 h-12 w-12 rounded-lg">{icon}</div>
//         <div>
//           <CardTitle className="text-lg font-semibold text-brand">
//             {title}
//           </CardTitle>
//           <CardDescription className="mt-1 font-medium text-slate-600 dark:text-muted-foreground">
//             {description}
//           </CardDescription>
//         </div>
//       </CardHeader>

//       <Separator />

//       <CardContent className="space-y-8 ml-2">
//         {steps.map((step) => (
//           <div key={step.id} className="flex gap-4">
//             <div className="shrink-0 h-8 w-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
//               <span className="text-sm font-bold">{step.number}</span>
//             </div>
//             <div>
//               <p className="font-semibold mb-1">{step.title}</p>
//               <p className="text-base text-slate-600 dark:text-muted-foreground">
//                 {step.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//     </Card>
//   );
// }

// export function HowItWorks() {
//   return (
//     <section className="w-full max-w-custom mx-auto overflow-x-hidden pb-0.5 px-4">
//       {/* Header */}
//       <div className="text-center mb-8 sm:mb-16 max-w-3xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
//           How It <span className="text-brand">Works</span>
//         </h2>
//         <p className="text-lg text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto">
//           Whether you&apos;re seeking opportunities or talent, our platform
//           makes the process seamless, efficient, and effective.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Job Seekers Card */}
//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         >
//           <ReusableCard
//             icon={
//               <User className="text-brand absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//             }
//             title="Job Seekers"
//             description="Find your dream role in 3 simple steps"
//             steps={jobSeekerSteps}
//           />
//         </motion.div>

//         {/* Employers Card */}
//         <motion.div
//           initial={{ opacity: 0, x: 60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//         >
//           <ReusableCard
//             icon={
//               <BriefcaseBusiness className="text-brand absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
//             }
//             title="Employers"
//             description="Find perfect candidates effortlessly"
//             steps={employerSteps}
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// ---------------------------------------------------------------------------------------------

"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, User } from "lucide-react";

const jobSeekerSteps = [
  {
    id: "j1",
    number: "1",
    title: "Create Job Seeker Account",
    description:
      "Sign up quickly with your professional email address or using OAuth",
  },
  {
    id: "j2",
    number: "2",
    title: "Upload Your Resume",
    description: "Add your resume and let employers discover your skills",
  },
  {
    id: "j3",
    number: "3",
    title: "Apply & Track",
    description: "Submit applications and monitor your progress easily",
  },
];

const employerSteps = [
  {
    id: "e1",
    number: "1",
    title: "Create Employer Account",
    description:
      "Sign up quickly with your professional email address or using OAuth",
  },
  {
    id: "e2",
    number: "2",
    title: "Post Job Openings",
    description: "Create detailed listings that attract quality candidates",
  },
  {
    id: "e3",
    number: "3",
    title: "Manage Candidates",
    description: "Review applications and connect with potential hires",
  },
];

function StepCard({
  number,
  title,
  description,
  index,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Decorative line - only show between cards */}
      {index < 2 && (
        <div className="hidden sm:block absolute top-12 left-full w-full h-0.5 bg-linear-to-r from-brand/20 to-transparent -translate-y-1/2 z-0" />
      )}

      <div className="relative z-10 border border-brand/10 rounded-2xl bg-linear-to-b from-card to-card/50 p-6 hover:border-brand/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand/5">
        {/* Step number with glow effect */}
        <div className="relative mb-5">
          <div className="absolute inset-0 bg-brand/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-linear-to-br from-brand/10 to-brand/5 text-brand font-bold text-lg border border-brand/20">
            {number}
          </div>
        </div>

        <h4 className="font-bold text-lg mb-3 group-hover:text-brand transition-colors duration-300">
          {title}
        </h4>

        <p className="text-sm text-slate-600 dark:text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

function Section({
  icon,
  title,
  description,
  steps,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  steps: typeof jobSeekerSteps;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Section Header with decorative elements */}
      <div className="flex items-center gap-4 sm:gap-6 mb-10">
        <div className="relative">
          {/* Icon background glow */}
          <div className="absolute inset-0 bg-brand/20 rounded-xl blur-xl scale-150 opacity-30" />

          {/* Icon container */}
          <div className="relative h-14 w-14 rounded-xl bg-linear-to-br from-brand/10 to-brand/5 border border-brand/20 flex items-center justify-center">
            <div className="scale-110">{icon}</div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-brand mb-1">{title}</h3>
          <p className="text-slate-600 dark:text-muted-foreground text-base">
            {description}
          </p>
        </div>
      </div>

      {/* Steps Grid with connecting line */}
      <div className="relative">
        {/* Background connecting line (hidden on mobile) */}
        <div className="hidden sm:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-transparent via-brand/10 to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              number={step.number}
              title={step.title}
              description={step.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="w-full max-w-custom mx-auto overflow-hidden px-4 relative">
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            How It{" "}
            <span className="text-brand relative">
              Works
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-brand to-transparent rounded-full"
              />
            </span>
          </h2>

          <p className="text-lg text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you're seeking opportunities or talent, our platform makes
            the process seamless, efficient, and effective.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-20 sm:space-y-28">
          <Section
            icon={<User className="w-6 h-6 text-brand" />}
            title="Job Seekers"
            description="Find your dream role in 3 simple steps"
            steps={jobSeekerSteps}
            delay={0.2}
          />

          <Section
            icon={<BriefcaseBusiness className="w-6 h-6 text-brand" />}
            title="Employers"
            description="Find perfect candidates effortlessly"
            steps={employerSteps}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
