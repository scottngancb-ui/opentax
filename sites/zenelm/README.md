# Zenelm forms atlas

Zenelm's branded build of the forms atlas (`opentax node explore`): the same page,
styled with the Zenelm design system and carrying the license notices needed to
publish it.

```bash
deno task zenelm-atlas                                   # -> .state/explore/zenelm-forms-atlas.html
deno task zenelm-atlas --fragment path/to/out.html       # body only, for hosts that supply <head>
```

`atlas.ts` renders the standard atlas and then swaps in the Zenelm tokens, fonts and
overrides, adds the wordmark and ink band, and replaces the footer. Update `MODIFIED`
when you change this build.

## Publishing it

Filed Open Tax software is dual-licensed under the GNU AGPL v3 and the Filed
Commercial License. Publishing this page under the AGPL v3 means:

- **The page is AGPL v3 too.** It is a modified version of the atlas, including the
  Zenelm styling in this folder. Visitors may copy and modify it under the same license.
- **Keep the footer notices.** They state Filed's copyright, the license, that Zenelm
  modified the work and when, and where to get the source. `atlas.test.ts` checks them.
- **Keep the source available.** The footer links to this public repository. Publish
  any change you make to the page here before, or when, you publish the page.
- **Trademarks are not licensed.** The AGPL grants copyright permissions only. The
  Zenelm name and wordmark, and Filed's name and marks, stay with their owners
  (AGPL v3 §7(e)); the footer says Zenelm is not affiliated with or endorsed by Filed.

A Filed Commercial License (otta@filed.com) removes the copyleft obligations if you
would rather not publish under the AGPL. Neither license covers applying to the IRS as
an e-file software developer or transmitter; see `NOTICE`.

The form descriptions were written from this repository's research notes and have not
been checked against IRS publications. Keep the "for learning, not tax advice" line.
