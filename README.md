# wild-blog

## Problèmes rencontrés:

1)
## Fichier concerné: form-blog.component.ts
 Actuellement j'ai un souci  avec le typage de categoryId: number | null | undefined 
 à cause de FormControl je dois accepter les types null et undefined or moi je voudrais typer categoryId à number uniquement.
 
2) ## Fichier concerné: form-blog.component.ts
J'ai un souci avec la méthode OnCreateArticle(), elle est appelée automatiquement après l'éxécution de OnSaveSubmit() ce que je ne souhaite pas.