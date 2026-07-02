---
title: "Just the Facts, Ma'am: How High-Tech \"Dragnets\" Put the Fourth Amendment on Trial"
urlSlug: "geofence-dragnets-fourth-amendment-trial"
date: 2026-07-01
published: true
tags: [tech, security, privacy, politics, philosophy, blogging]
---

<div style="display: flex; gap: 1rem; align-items: flex-start; margin: 1rem 0;">
  <div style="flex: 1;">
    <p style="margin: 0 0 1rem 0;">If Sergeant Joe Friday were walking the beat today, his iconic catchphrase would need a modern, dystopian update. Instead of a deadpan "Just the facts, ma'am," he'd likely be staring at a smartphone screen, muttering, "Just the location data, Google."</p>
    <p style="margin: 0;">There was a simpler time in detective work. If a bank got hit, gumshoes did the heavy lifting. They dusted for fingerprints, interviewed shaken tellers, looked for a getaway car, and relied on shoe-leather forensics. It was targeted. It was specific. Most importantly, it didn't involve spying on the innocent churchgoers down the street.</p>
  </div>
  <img src="Images/dragnet-logo.jpg" alt="Dragnet logo" style="flex: 0 0 50%; width: 50%; max-width: 50%; height: auto; object-fit: contain; flex-shrink: 0;" />
</div>

Fast forward to the 21st century, where high-tech convenience has turned standard police work into a playground for rampant Fourth Amendment violations. The Supreme Court just issued a ruling that serves as a small win for everyday citizens—even if it makes the lives of modern-day detectives a little harder. But as a die-hard fan of the Fourth Amendment, I'm here to tell you: the jury is still out on whether these digital dragnets should exist at all.

## The Anatomy of a High-Tech Heist: The Chatrie Case

To understand how we got here, we have to look at the federal case that started it all: *United States v. Chatrie*.

In 2019, a man named Okello Chatrie walked into a credit union in Midlothian, Virginia, pulled a gun, and walked out with nearly $195,000. He left a trail of evidence, but police had zero leads. Instead of pounding the pavement, investigators decided to cast a net. A massive, digital net.

```
[ 17.5-Acre Geofence ] ──> 19 Anonymous Users ──> Secondary Tracking ──> Chatrie Unmasked
```

Law enforcement secured a "geofence warrant," forcing Google to cough up the anonymized location data of every single smartphone active within a massive 17.5-acre radius around the bank during a two-hour window. That's around a 500ft radius from the bank's property. You could have been doing laundry on the next block, and now the cops are up in your text messages. This digital dragnet didn't just catch the robber; it scooped up data from completely innocent people, including folks at a nearby church.

Once Google handed over 19 anonymous user profiles, the police executed "Step 2": tracking those users' movements outside the initial fence to see where they went. Eventually, they unmasked Chatrie. When they raided his home, they found the 9mm pistol and the cash—still wrapped in bands signed by the bank teller.

Chatrie was convicted and sentenced to 12 years in federal prison. But his legal team fiercely appealed, arguing that the government essentially searched thousands of innocent people without individualized suspicion just to catch one guy.

## The Court's Nuance: Warrants vs. Total Bans

The case climbed all the way to the Supreme Court, and the resulting ruling is packed with legal nuance. The Court did not ban digital dragnets entirely, nor did they draw a specific line in the sand regarding a maximum radius or time limit. Note that we're not just talking about time and radius around the crime... we're also talking about a secondary time and radius around ANYONE caught in the initial net. There are NO rules about this yet. Cops, if they deem it reasonable, can search MONTHS of your location history if they deem it "relevant" and the judge agrees. The Supreme Court refused to tackle specifics on these limits.

Instead, they ruled 6-3 on a fundamental question: Geofencing is a "search" under the Fourth Amendment, meaning police must get a warrant to do it.

Better than nothing, I suppose. While this is a victory for privacy, it leaves a glaring loophole wide open. By requiring a warrant rather than banning the technology outright, the court leaves the door open for police to keep using dragnets, provided a judge signs off. It kicks the grittiest questions back to the lower appeals courts to decide if a 17.5-acre dragnet is "too big," or if secondary tracking outside the fence violates the "particularity" requirement of the Constitution.

## The Irony of the "Good-Faith" Loophole

Here is the kicker: despite the Supreme Court ruling that geofence dragnets are an unconstitutional privacy invasion without strict oversight, Okello Chatrie is not getting out of prison. Despite my dissapointment that the courts have taken 7 years to make miniscule progress on protecting our rights, I do not wish for rights violations to allow criminals to get off scott-free. Luckily, our system accounts for this. If he done it, he does the time, despite the fact that the cops DID violate his (and 18 other innocent people's) rights in my opinion.

Chatrie's conviction stands because of a legal nuance known as the good-faith exception. Under American law, if police officers execute an unconstitutional warrant but reasonably believed it was valid at the time it was signed, the evidence cannot be thrown out. It's sort of the opposite of qualified immunity. If cops made a boo boo on accident but the boo boo led to the actual perp getting caught, the perp doesn't walk on technicality. Because geofencing was a shiny new tech frontier in 2019, the courts ruled the detectives acted in good faith. Chatrie became a legal martyr—securing privacy rights for the rest of us while keeping his own bunk in a federal penitentiary.

## Why the Fewer Dragnets, the Better (Yikes!)

While the Supreme Court put up a speed bump, my personal opinion is clear: the fewer dragnets we grant to the police, the better. Some digital tools are simply too powerful to exist. When you build a system capable of mass surveillance, you inherently build a tool ripe for corruption. Digital location dragnets are essentially the reverse of Edward Snowden's whistle-blowing campaign. The Intelligence bureaus were (and very likely still are) dragnetting EVERYONE for EVERY 1 and 0 we put into our devices, but the key limiting factor so far has been WARRANTS. Can authorities peruse those 1s and 0s without a judge staking their job on it? Little by little, the answer is more and more yes.

Don't believe me? Let's paint a hypothetical picture of a worst-case scenario:

Imagine a corrupt Police Commissioner who cuts a backroom deal to get a powerful Mafioso elected to City Council. Once in office, that politician funnels financial kickbacks to a select group of dirty cops on the force. In exchange, those cops use geofence dragnets on all known mafia operations—not to arrest the mobsters, but to log the location data of every person entering the area.

Within days, the mob uses that data to identify, track, and eliminate the "snooping" good-guy detectives and investigative journalists trying to expose them.

```
[ Corrupt Politician ] ──> Kickbacks ──> [ Dirty Cops ] ──> Geofence Dragnet ──> Journalists Exposed
```

Yikes. That is the terrifying reality of mass data collection. If the tool exists, someone will weaponize it. And I'm not claiming every PD will have full-on crooks like this, but every PD DOES have this high-tech devil whispering in their ear now. "You can just increase the tracking radius to one mile at the click of a button. No one will know, and isn't it morally justified if that's what it takes to find the perp?" These tools are too powerful to be left without EXTREMELY specific legal limits. And don't get me started on AI facial recgonition with public cameras. We've had GPS location services in the wild for 20 years, and THIS is as far as the Supreme Court has covered it. Expect good rulings on 4th-amendment protection for AI facial recog in 2050.

## Final Thoughts

I don't want to completely slam the Supreme Court. They took a step in the right direction by acknowledging that our digital footprints deserve constitutional protection. But simply requiring a warrant isn't enough when the tool itself is an inherently dragnet-style fishing expedition. There have been many cases since 2019 that used gigantic dragnets much bigger than a 500ft radius. At the very least, iron-clad restrictions on size, time, and secondary tracking are a must-have.

Until then, we should remember Joe Friday's era with a bit of nostalgia. You might argue the police had a harder job with all that low tech, but I argue their job is harder now: every case is a new bite at the apple that is our Constitution. "How much should we violate the rights of strangers in the name of justice today?" Do you trust cops to make that choice case-by-case? I wouldn't want the choice if I were a detective. Where do you draw the line? Is it legal if your dragnet is the whole block? The whole neighborhood? The whole city? Why not call up your pals at the NSA and track the whole state or the whole country? It's in the name of justice, right?