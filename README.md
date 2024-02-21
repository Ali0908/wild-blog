# wild-blog

## Problèmes rencontrés:

1) ## Fichier concerné: form-blog.component.ts
 Actuellement j'ai un souci  avec le typage de categoryId: number | null | undefined 
 à cause de FormControl je dois accepter les types null et undefined or moi je voudrais typer categoryId à number uniquement.
 
2) ## Fichier concerné: form-blog.component.ts
J'ai un souci avec la méthode OnCreateArticle(), elle est appelée automatiquement après l'éxécution de OnSaveSubmit() ce que je ne souhaite pas.

3) ## Fichier concerné: form-blog.component.ts et form-article.component.ts
Les méthodes getUser() et fetchUser() sont similaires il faudrait les factoriser dans le service SharedService.

4) ## Fichier concerné: blogs-by-author.component.ts
Vérification des checkboxes.

5) ## Fichier concerné: article.component.ts
Au moment du rechargement de cette page les cards ne s'affichent plus.