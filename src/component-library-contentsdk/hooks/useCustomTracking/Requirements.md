# HCA dataLayer requirements

## ## Desktop navigation opens

### Description

Desktop users can hover over the menu item to reveal more details. However, if they do click on an item (such as Departments) the following dataLayer could should be loaded on the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'navigationOpen'
});
</script>
```

## Desktop main navigation clicks

### Description

When a user clicks on a desktop menu item, such as Cancer Care under Departments, the following dataLayer could should be loaded on the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'navigationLinkClick'
});
</script>
```

## Mobile navigation opens

### Description

When a user clicks on the mobile hamburger icon to open the mobile menu, the following data should be sent to the dataLayer

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'mobileNavigationClick',
'navigationType': 'mobileNavigationOpen'
});
</script>
```

## Mobile navigation menu opens

### Description

When a user clicks to open a menu within the mobile navigation, for example the Services & Treatments menu, the following should be sent into the dataLayer

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'mobileNavigationClick',
'navigationType': 'mobileNavClick'
});
</script>
```

## Mobile navigation sub menu opens

### Description

When a user clicks to open a sub menu within the mobile navigation, for example the Departments option within the Services & Treatments menu, the following should be sent into the dataLayer

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'mobileNavigationClick',
'navigationType': 'mobileSubNavClick'
});
</script>
```

## Mobile main navigation clicks

### Description

When a user clicks on a mobile menu item, such as Cancer Care under Departments, the following dataLayer could should be loaded on the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'mobileNavigationClick',
'navigationType': 'navigationLinkClickMobile'
});
</script>
```

## Header navigation clicks – desktop

### Description

Whenever an item in the desktop header navigation is clicked the following dataLayer could should be loaded on the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'headerNavigation'
});
</script>
```

## Header navigation clicks – mobile

### Description

Whenever an item in the desktop header navigation is clicked the following dataLayer could should be loaded on the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'mobileNavigationClick',
'navigationType': 'headerNavigationMobile'
});
</script>
```

## Desktop navigation CTA button clicks

### Description

When a user clicks on one of the desktop navigation CTAs, such as the View all button under Services & Treatments or the Learn more link under Test & Scans, the following code when be fired on click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'NavigationCTADesktop'
});
</script>
```

## Desktop navigation text CTA clicks

### Description

When a user clicks on one of the desktop View all text links, such as the View all button under Departments in the Services & Treatments menu, the following code when be fired on click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'NavigationTextCTADesktop'
});
</script>
```

## Mobile navigation CTA clicks

### Description

When a user clicks on one of the mobile navigation CTAs, such as the View all services and treatments button under Services & Treatments, the following code when be fired on click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'mobileNavigationClick',
'navigationType': 'navigationCTAMobile'
});
</script>
```

## Mobile navigation text CTA clicks

### Description

When a user clicks on one of the mobile View all text links, such as the View all button under Departments in the Services & Treatments menu, the following code when be fired on click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'NavigationTextCTAMobile'
});
</script>
```

## Footer button navigation clicks

### Description

When a user clicks on one of the buttons in the footer navigation (for both mobile and desktop versions of the site), the following code should be loaded on click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'footerNavigationButton'
});
</script>
```

## Footer navigation text links

### Description

When a user clicks one of the text links in the footer navigation (for both mobile and desktop versions of the site), for example the Our HCA Story link, the following code should be loaded on click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'footerNavigationText'
});
</script>
```

## Phone CTA button

### Description

When a user clicks on the mobile CTA button, the following code needs to be fired in the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'buttonClick',
'navigationType': 'phoneCTAClick'
});
</script>
```

## Button clicks - all other

### Description

When a user clicks on a button within the main content, the following code should be sent on the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'buttonClick',
'navigationType': 'buttonClick'
});
</script>
```

## Breadcrumb links - desktop

### Description

When a user clicks on a link within the desktop breadcrumb navigation, such as Treatments on this page, the following code should be sent on click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'breadcrumbDesktop'
});
</script>
```

## Breadcrumb links - mobile

### Description

When a user clicks on a link within the desktop breadcrumb navigation, such as back to Treatments on this page, the following code should be sent on click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'breadcrumbMobile'
});
</script>
```

## Logo clicks

### Description

When a user clicks on a logo in the top of the navigation (such as the HCA Healthcare UK logo), the following code should be sent on the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'navigationClick',
'navigationType': 'logoNavigation'
});
</script>
```

## Accordion clicks

### Description

When a user clicks on an accordion, such as the one on this page, the following code should be fired on the click

### Code

```
<script>
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'event': 'buttonClick',
'navigationType': 'accordionClick'
});
</script>
```
