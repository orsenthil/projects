all:
	emacs --batch --eval "(require 'org)" index.org --funcall org-html-export-to-html

